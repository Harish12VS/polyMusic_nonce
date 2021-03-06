import {
  Box,
  SimpleGrid,
  Text,
  Stack,
  Image,
  Button,
  ButtonGroup
} from "@chakra-ui/react";
import { useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import CardOne from "../../assets/card-one.png";

const MusicCard = ({ nft, buyNft }) => {

  const [play, setPlay] = useState(false);
  var audio = new Audio(nft.image);

  const playMusic = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    // setPlay(true);
  }


  const musicButton = (nft) => {
    if (!play) {
      return (<Button
        rightIcon={<FiPlay />}
        variant="outline"
        rounded={"full"}
        fontSize="sm"
        _hover={{
          color: "#9900ff",
          borderColor: "#9900ff"
        }}
        onClick={() => playMusic(nft.image)}
      >
        Play Now
      </Button>
      )
    }
  }

  return (
    <Stack
      align="center"
      justify="space-between"
      color={"white"}
      border="1.5px solid white"
      h="450px"
      w="300px"
      position="relative"
      as="flex"
    >
      <Box
        w="300px"
        h="243px"
        mt={-10}
        mr={-10}
        p={1.5}
        bg="linear-gradient(99.74deg,#2082e9 5.23%,#9900ff 92.7%)"
      >
        <Image src={CardOne} w="100%" maxH="100%" />
      </Box>
      <Stack p={6} w="100%" spacing={8}>
        <SimpleGrid columns={2} justifyContent="space-between" gap={6}>
          <Box spacing={0}>
            <Text
              as="h6"
              fontWeight="bold"
              letterSpacing="tighter"
              color="whiteAlpha.600"
              fontSize="sm"
            >
              {nft.owner}
            </Text>
            <Text
              as="h5"
              fontWeight="bold"
              fontSize="lg"
              letterSpacing="tighter"
              isTruncated
              title={nft.name}
            >
              {nft.name}
            </Text>
          </Box>
          <Box spacing={0} textAlign="right">
            <Text
              as="h6"
              fontWeight="bold"
              letterSpacing="tighter"
              color="whiteAlpha.600"
              fontSize="sm"
            >
              Current Bid
            </Text>
            <Text
              as="h5"
              fontWeight="bold"
              fontSize="lg"
              letterSpacing="tighter"
              isTruncated
              title={nft.price}
            >
              {nft.price} MATIC
            </Text>
          </Box>
        </SimpleGrid>

        <ButtonGroup justifyContent="space-between" as="flex">

          {
            musicButton(nft)
          }

          <Button
            // bg="linear-gradient(99.74deg, #06DBAC 5.23%, #BD00FF 92.7%)"
            bg="linear-gradient(99.74deg,#2082e9 5.23%,#9900ff 92.7%)"
            textTransform="uppercase"
            rounded={"full"}
            fontWeight="bold"
            letterSpacing="tighter"
            onClick={buyNft}
            _hover={{
              bg: "linear-gradient(99.74deg,#9900ff 5.23%,#2082e9 92.7%)"
            }}
            minW="100px"
          >
            Buy NFT
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default MusicCard;
