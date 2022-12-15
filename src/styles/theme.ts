import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: `'twayair', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        background: "#645681",
      },
    },
  },
});

export default theme;
