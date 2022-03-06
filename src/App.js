import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config";
import { Routes, Route } from "react-router-dom";
import "@fontsource/poppins";
import { Box } from "@chakra-ui/react";
import { Home } from "./containers";
import { Navbar } from "./components";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box w="100%" bg="black" color="white">
        <Box maxW="1197px" w="100%" minH="100vh" mx="auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
