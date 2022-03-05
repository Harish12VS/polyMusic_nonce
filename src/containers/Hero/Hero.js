import styles from "./hero.module.css";
import { Heading } from "@chakra-ui/react";
import { Grid, GridItem, Box, Image } from "@chakra-ui/react";

const Hero = () => {
  let imgSrc = "../../assets/music.jpg";
  return (
    <Grid columns={2}>
      <GridItem>
        <div>
          <Heading size="3xl" className={styles.catchPhrase}>
            Create, Sell & Collect Your Own Creative NFT{" "}
          </Heading>
        </div>
      </GridItem>
      <GridItem>
        <div>
          <Image
            boxSize="400px"
            src="https://i.pinimg.com/564x/6f/a4/e1/6fa4e12a93059a1dd04fac56ee598cf2.jpg"
            alt="Dan Abramov"
          />
        </div>
      </GridItem>
    </Grid>
  );
};

export default Hero;
