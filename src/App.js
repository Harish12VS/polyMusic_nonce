import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Hero from "./containers/Hero/Hero";
import Toolbar from "./containers/Toolbar/Toolbar";
import Content from "./containers/Content/Content";

function App() {
  return (
    <ChakraProvider>
      <Box
        w="100%"
        h="100vh"
        bgGradient="linear-gradient(113.49deg, #984D38 -30.3%, #181E41 58.12%)"
      >
        <Toolbar></Toolbar>
        {/* <div className="App">Web3</div> */}
        <Hero></Hero>
        <Content></Content>
      </Box>
    </ChakraProvider>
  );
}

export default App;
