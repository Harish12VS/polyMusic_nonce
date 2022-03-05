import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Heading
} from "@chakra-ui/react";
import { FaWallet, FaTh, FaImage } from "react-icons/fa";

const Feature = ({ title, text, icon, gradient }) => {
  return (
    <Stack align="center" textAlign="center" color={"white"}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={gradient}
        mb={3}
      >
        {icon}
      </Flex>
      <Text as="h5" fontWeight="bold" fontSize="2xl" letterSpacing="tight">
        {title}
      </Text>
      <Text>{text}</Text>
    </Stack>
  );
};

export default function FeatureSection() {
  return (
    <Box py={32}>
      <Heading
        as="h1"
        fontSize="5xl"
        fontWeight={"bold"}
        letterSpacing="tight"
        mb={20}
        textAlign="center"
      >
        How it Works?
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FaWallet} w={8} h={8} />}
          title={"Lifetime Support"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
          gradient="linear-gradient(207.67deg, #23D3A4 3.43%, #5B49CF 104.7%)"
        />
        <Feature
          icon={<Icon as={FaTh} w={8} h={8} fontWeight="light" />}
          title={"Unlimited Donations"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
          gradient="linear-gradient(63.88deg, #739EEC 29.38%, #FF8C9F 86.63%)"
        />
        <Feature
          icon={<Icon as={FaImage} w={8} h={8} fontWeight="light" />}
          title={"Instant Delivery"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
          gradient="linear-gradient(66.27deg, #FE6F2D -10.45%, #FDCE38 76.78%)"
        />
      </SimpleGrid>
    </Box>
  );
}
