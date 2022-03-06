import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import { Footer, MusicCard } from "../../components";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../../config";
import Market from "../../contracts/NFTMarket.json";
import NFT from "../../contracts/NFT.json";

let rpcEndpoint = null;

if (process.env.REACT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.REACT_PUBLIC_WORKSPACE_URL;
}

export default function Collections() {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.matic.today");
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description
        };
        return item;
      })
    );
    setNFTs(items);
    setLoading(true);
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.itemId,
      {
        value: price
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  if (!loading || NFTs.length === 0)
    return <h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>;

  return (
    <>
      {" "}
      <Box py={24}>
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight={"bold"}
          letterSpacing="tight"
          mb={28}
          textAlign="center"
        >
          Collections
        </Heading>
        <SimpleGrid
          gridTemplateColumns="repeat(3,300px)"
          justifyContent="space-between"
          rowGap={28}
          py={12}
        >
          {NFTs.map((nft, ind) => (
            <MusicCard key={ind} nft={nft} buyNft={() => buyNft(nft)} />
          ))}

          {/* <MusicCard title={"Heart & Sol"} username="@arvind" />
          <MusicCard title={"Yaaro athu"} username="@arif" />
          <MusicCard title={"Hey Sinamika"} username="@harish" />
          <MusicCard title={"Uyirin Uyirae"} username="@arvind" />
          <MusicCard title={"Hello beats"} username="@arif" />
          <MusicCard title={"Lofi beats"} username="@harish" /> */}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
