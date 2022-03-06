import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box py={10} mt={10}>
      <Text
        color="whiteAlpha.800"
        textAlign="center"
        fontWeight="medium"
        fontSize="sm"
      >
        © {new Date().getFullYear()} Poly Music NFT Marketplace. All rights
        reserved
      </Text>
    </Box>
  );
};

export default Footer;
