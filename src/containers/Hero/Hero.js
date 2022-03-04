import styles from "./hero.module.css";
import { Heading } from "@chakra-ui/react";
import { Grid, GridItem, SimpleGrid, Box, Image } from "@chakra-ui/react";

const Hero = () => {
  let imgSrc = "../../assets/music.jpg";
  return (
    <div className={styles.hero}>
      <SimpleGrid columns={2}>
        <Box>
          <div className={styles.left}>
            <Heading size="3xl" className={styles.catchPhrase}>
              Create, Sell & Collect Your Own Creative NFT{" "}
            </Heading>
          </div>
        </Box>
        <Box>
          <div className={styles.right}>
            {/* <Heading>Create, Sell & Collect Your Own Creative NFT </Heading> */}
            <Image
              boxSize="400px"
              src="https://i.pinimg.com/564x/6f/a4/e1/6fa4e12a93059a1dd04fac56ee598cf2.jpg"
              alt="Dan Abramov"
            />
          </div>
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default Hero;
