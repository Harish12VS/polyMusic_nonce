import { Text, SimpleGrid, Box } from "@chakra-ui/react";
import styles from "./toolbar.module.css";

const Toolbar = () => {
  return (
    <div>
      <SimpleGrid columns={2}>
        <Text
          className={styles.team}
          //   bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
        >
          Nonce<span className={styles.teamSpan}>Art</span>
        </Text>
        <Box
          className={styles.walletBtn}
          as="button"
          p={4}
          color="white"
          fontWeight="bold"
          borderRadius="md"
          bgGradient="linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)"
        >
          Choose Wallet
        </Box>
      </SimpleGrid>
    </div>
  );
};

export default Toolbar;
