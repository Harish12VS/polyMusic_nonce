import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftmarketaddress, nftaddress } from "../../config";
import Market from "../../contracts/NFTMarket.json";
import NFT from "../../contracts/NFT.json";
import { Footer, MusicCard } from "../../components";
import { SimpleGrid, Box, Heading } from "@chakra-ui/react";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  useEffect(() => {
    loadNFTs();
  }, []);

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

  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

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
          image: meta.data.image
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState(false);
  }


  if (!loadingState && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;
  return (
    <>
      <Box py={24}>
        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight={"bold"}
          letterSpacing="tight"
          mb={28}
          textAlign="center"
        >
          My Assets
        </Heading>
        <SimpleGrid
          gridTemplateColumns="repeat(3,300px)"
          justifyContent="space-between"
          rowGap={28}
          py={12}
        >
          {nfts.map((nft, i) => (
            <MusicCard key={i} nft={nft} buyNft={() => buyNft(nft)} />

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
