import {
  Box,
  SimpleGrid,
  Text,
  Stack,
  Heading,
  Image,
  Button,
  ButtonGroup,
  Grid
} from "@chakra-ui/react";
import { FiPlay } from "react-icons/fi";
import CardOne from "../../assets/card-one.png";

const MusicCard = ({ title, username }) => {
  return (
    <Stack
      align="center"
      justify="space-between"
      color={"white"}
      border="1.5px solid white"
      h="400px"
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
        bg="linear-gradient(99.74deg, #06DBAC 5.23%, #BD00FF 92.7%)"
      >
        <Image src={CardOne} w="100%" maxH="100%" />
      </Box>
      <Stack p={6} w="100%" spacing={4}>
        <SimpleGrid columns={2} justifyContent="space-between" gap={6}>
          <Box spacing={0}>
            <Text
              as="h6"
              fontWeight="bold"
              letterSpacing="tighter"
              color="whiteAlpha.600"
              fontSize="sm"
            >
              {username}
            </Text>
            <Text
              as="h5"
              fontWeight="bold"
              fontSize="lg"
              letterSpacing="tighter"
              isTruncated
              title={title}
            >
              {title}
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
              title={title}
            >
              {title}
            </Text>
          </Box>
        </SimpleGrid>

        <ButtonGroup justifyContent="space-between" as="flex">
          <Button
            rightIcon={<FiPlay />}
            variant="outline"
            rounded={"full"}
            fontSize="sm"
            _hover={{
              color: "#06DBAC",
              borderColor: "#06DBAC"
            }}
          >
            Play Now
          </Button>
          <Button
            bg="linear-gradient(99.74deg, #06DBAC 5.23%, #BD00FF 92.7%)"
            textTransform="uppercase"
            rounded={"full"}
            fontWeight="bold"
            letterSpacing="tighter"
            _hover={{
              bg: "linear-gradient(99.74deg, #BD00FF 5.23%, #06DBAC 92.7%)"
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

export default function DiscoverSection() {
  return (
    <Box py={32}>
      <Heading
        as="h1"
        fontSize="5xl"
        fontWeight={"bold"}
        letterSpacing="tight"
        mb={28}
        textAlign="center"
      >
        Discover Music NFT
      </Heading>
      <SimpleGrid
        gridTemplateColumns="repeat(3,300px)"
        justifyContent="space-between"
        rowGap={28}
      >
        <MusicCard title={"Heart & Sol"} username="@arvind" />
        <MusicCard title={"Yaaro athu"} username="@arif" />
        <MusicCard title={"Hey Sinamika"} username="@harish" />
        <MusicCard title={"Uyirin Uyirae"} username="@arvind" />
        <MusicCard title={"Hello beats"} username="@arif" />
        <MusicCard title={"Lofi beats"} username="@harish" />
      </SimpleGrid>
    </Box>
  );
}
