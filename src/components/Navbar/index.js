import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingY={6}
      paddingX={{ base: 6, md: 0 }}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading
          as="h1"
          size="lg"
          letterSpacing={"tighter"}
          bg="linear-gradient(214.02deg, #671AE4 6.04%, #B75CFF 92.95%)"
          bgClip="text"
        >
          Music NFT
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <FaBars />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
        justify={{ base: "start", md: "end" }}
        mr={{ base: 0, md: 6 }}
      >
        <Text>Collections</Text>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant="solid"
          bg="linear-gradient(214.02deg, #B75CFF 6.04%, #671AE4 92.95%)"
          paddingX={5}
          paddingY={2.5}
          _hover={{
            bg: "linear-gradient(214.02deg, #671AE4 6.04%, #B75CFF 92.95%)"
          }}
        >
          Connect Wallet
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
