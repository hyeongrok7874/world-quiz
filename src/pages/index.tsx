import { Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import * as I from "Assets/svg";
import { useEffect, useState } from "react";
import { Helmet } from "components";

const Home: NextPage = () => {
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    setBestScore(parseInt(localStorage.getItem("bestScore") ?? "0"));
  }, []);

  return (
    <>
      <Helmet title="world-quiz" />
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
          <Text fontSize="25px" fontWeight="500" mt="50px" color="#8675A9">
            My Best Score : {bestScore}
          </Text>
          <Link href="/quiz/flag" style={{ marginTop: "100px" }}>
            <I.StartIcon />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
