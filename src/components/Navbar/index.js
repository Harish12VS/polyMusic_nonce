import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftmarketaddress, nftaddress } from "../../config";
import Market from "../../contracts/NFTMarket.json";
import NFT from "../../contracts/NFT.json";
import { Footer, MusicCard } from "../../components";
import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {

  const navigate = useNavigate();

  let connectedAddress = "";
  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  useEffect(() => {
    // loadNFTs()
  }, []);

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let connectedAddress = connection.selectedAddress;
    if (connectedAddress) {
      setAddress(connectedAddress);
    } else {
      console.log("Wallet Not connected");
    }

    console.log(connection.selectedAddress, provider, signer);

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        };
        return item;
      })
    );
  }

  const showButton = () => {
    if (address) {
      console.log(address);
      return (
        <Button
          variant="solid"
          bg="linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)"
          paddingX={5}
          paddingY={2.5}
          _hover={{
            bg: "linear-gradient(214.02deg, #671AE4 6.04%, #B75CFF 92.95%)",
          }}
        >
          <h1> {address}</h1>
        </Button>
      );
    } else {
      return (
        <Button
          onClick={loadNFTs}
          variant="solid"
          bg="linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)"
          paddingX={5}
          paddingY={2.5}
          _hover={{
            bg: "linear-gradient(214.02deg, #671AE4 6.04%, #B75CFF 92.95%)",
          }}
        >
          Connect Wallet
        </Button>
      );
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingY={6}
      paddingX={{ base: 6, md: 0 }}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
          bg="linear-gradient(214.02deg, #671AE4 6.04%, #B75CFF 92.95%)"
          bgClip="text"
          position="relative"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Poly Music
          <Text
            left="105%"
            top={"50%"}
            transform="translateY(-50%)"
            position="absolute"
            fontWeight="bold"
            letterSpacing="tight"
            p={2}
            color="white"
            fontSize="xx-small"
            bg="linear-gradient(99.74deg,#2082e9 5.23%,#9900ff 92.7%)"
            rounded="lg"
            width={"96px"}
            textAlign="center"
          >
            NFT MARKETPLACE
          </Text>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <FaBars />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
        justify={{ base: "start", md: "end" }}
        mr={{ base: 0, md: 8 }}
        spacing={6}
      >
        <Link to="/create-item">Create Item</Link>
        <Link to="/my-assets">My Assets</Link>
        <Link to="/collections">Collections</Link>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {showButton()}
      </Box>
    </Flex >
  );
};

export default Navbar;
