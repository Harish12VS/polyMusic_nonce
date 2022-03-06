import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useNavigate } from "react-router-dom";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../../config";
import NFT from "../../contracts/NFT.json";
import Market from "../../contracts/NFTMarket.json";
import {
  Box,
  Stack,
  Container,
  Input,
  Button,
  useBreakpointValue,
  Icon,
  Image,
  FormControl,
  FormLabel,
  Textarea,
  Heading
} from "@chakra-ui/react";
import { Footer } from "../../components";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: ""
  });
  const [resize, setResize] = useState("none");
  const router = useNavigate();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`)
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    console.log(fileUrl);
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice
    });
    await transaction.wait();
    router.push("/");
  }

  return (
    <>
      <Box position={"relative"}>
        <Container maxW={"7xl"} pt={{ base: 10, sm: 14 }} mx="auto" pb={20}>
          <Heading
            as="h1"
            fontSize="5xl"
            fontWeight={"bold"}
            letterSpacing="tight"
            mb={12}
            textAlign="center"
          >
            Create Item
          </Heading>
          <Stack
            background={"rgba(255, 255, 255, 0.1)"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 10 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "xl" }}
            mx="auto"
          >
            <Box as={"form"}>
              <Stack spacing={8}>
                <FormControl>
                  <FormLabel fontWeight="bold" letterSpacing="tight">
                    Asset Name
                  </FormLabel>
                  <Input
                    type="text"
                    bg="black"
                    border={0}
                    _focus={{
                      border: "2px solid #9900ff"
                    }}
                    _placeholder={{
                      color: "gray.500",
                      fontSize: "sm"
                    }}
                    placeholder="Asset Name"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold" letterSpacing="tight">
                    Description
                  </FormLabel>
                  <Textarea
                    type="textarea"
                    bg="black"
                    border={0}
                    _focus={{
                      border: "2px solid #9900ff"
                    }}
                    _placeholder={{
                      color: "gray.500"
                    }}
                    placeholder="Asset Description"
                    className="mt-2 border rounded p-4"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        description: e.target.value
                      })
                    }
                    resize={resize}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold" letterSpacing="tight">
                    Asset Price in Eth
                  </FormLabel>
                  <Input
                    bg="black"
                    border={0}
                    _focus={{
                      border: "2px solid #9900ff"
                    }}
                    _placeholder={{
                      color: "gray.500"
                    }}
                    placeholder="Asset Price in Eth"
                    className="mt-2 border rounded p-4"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, price: e.target.value })
                    }
                  />
                </FormControl>

                <input
                  type="file"
                  name="Asset"
                  onChange={onChange}
                  accept=".mp3,audio/*"
                />
                {fileUrl && (
                  <Image className="rounded mt-4" width="350" src={fileUrl} />
                )}

                <Button
                  mt={8}
                  onClick={createMarket}
                  fontFamily={"heading"}
                  bg={"linear-gradient(99.74deg,#2082e9 5.23%,#9900ff 92.7%)"}
                  fontWeight="bold"
                  size="lg"
                  _hover={{
                    bg: "linear-gradient(99.74deg,#9900ff 5.23%,#2082e9 92.7%)"
                  }}
                >
                  Create Digital Asset
                </Button>
              </Stack>
            </Box>
            form
          </Stack>
        </Container>
        <Blur
          position={"absolute"}
          top={0}
          left={0}
          style={{ filter: "blur(70px)" }}
        />
      </Box>
      <Footer />
    </>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
