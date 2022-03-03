import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Hero from "./containers/Hero/Hero";

function App() {
  return (
    <ChakraProvider>
      <Box
        w="100%"
        h="100vh"
        bgGradient="linear-gradient(113.49deg, #984D38 -30.3%, #181E41 58.12%)"
      >
        {/* <div className="App">Web3</div> */}
        <Hero></Hero>
      </Box>
    </ChakraProvider>
  );
}

export default App;
