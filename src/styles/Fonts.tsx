import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`@font-face {
  font-family: 'twayair';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
  font-weight: normal;
  font-style: normal;`}
  />
);

export default Fonts;
