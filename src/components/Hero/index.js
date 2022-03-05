import { Heading, Text } from "@chakra-ui/react";
import { Grid, GridItem, Image, Stack } from "@chakra-ui/react";
import heroImg from "../../assets/hero-img.svg";

const Hero = () => {
  return (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      justifyContent="space-between"
      paddingTop={10}
    >
      <GridItem>
        <Stack paddingTop={20} spacing={3}>
          <Heading
            as="h1"
            size="4xl"
            fontWeight="black"
            lineHeight="1.2"
            letterSpacing="tight"
            bg="linear-gradient(99.74deg, #06DBAC 5.23%, #BD00FF 92.7%)"
            bgClip="text"
          >
            Create, Sell &<br />
            Collect Your Own
            <br />
            Creative NFT{" "}
          </Heading>
          <Text fontWeight="medium">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aspernatur, facilis? Recusandae
          </Text>
        </Stack>
      </GridItem>
      <GridItem display="flex" justifyContent="end">
        <Image boxSize="90%" src={heroImg} alt="Dan Abramov" />
      </GridItem>
    </Grid>
  );
};

export default Hero;
