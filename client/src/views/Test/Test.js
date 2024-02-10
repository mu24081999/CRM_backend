import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "../../Context";

import { Box, Heading, Container } from "@chakra-ui/react";
import Notifications from "./Notifications";
import Options from "./Options";
import VideoPlayer from "./VideoPlayer";

const Test = () => {
  return (
    <ContextProvider>
      <ChakraProvider>
        <Box>
          <Container maxW="1200px" mt="8">
            <Heading as="h2" size="2xl">
              {" "}
              Video Chat App{" "}
            </Heading>
            <VideoPlayer />
            <Options />
            <Notifications />
          </Container>
        </Box>
      </ChakraProvider>
    </ContextProvider>
  );
};

export default Test;
