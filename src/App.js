import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config";
import { Routes, Route } from "react-router-dom";
import "@fontsource/poppins";
import { Box } from "@chakra-ui/react";
import { Home, CreateItem, MyAssets, Collections } from "./containers";
import { Navbar } from "./components";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box w="100%" bg="black" color="white">
        <Box maxW="1197px" w="100%" minH="100vh" mx="auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/my-assets" element={<MyAssets />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
