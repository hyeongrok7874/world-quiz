import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "styles/theme";
import { ApolloProvider } from "@apollo/client";
import client from "utils/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
