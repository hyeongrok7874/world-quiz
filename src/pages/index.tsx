import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import * as I from "Assets/svg";

const Home: NextPage = () => {
  return (
    <Flex justifyContent="center">
      <Flex
        w="600px"
        h="100vh"
        bg="#FDDCD6"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <I.Logo />
        <Link href="/quiz/flag" style={{ marginTop: "100px" }}>
          <I.StartIcon />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
