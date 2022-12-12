import { gql } from "@apollo/client";
import { Text, Flex, Image, Heading } from "@chakra-ui/react";
import { AnswerButton } from "components";
import Quit from "components/Quit";
import { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import client from "utils/client";

interface dataType {
  data: {
    countries: {
      code: string;
      name: string;
    }[];
  };
}

interface FlagType {
  countries: CountryType[];
}

interface CountryType {
  code: string;
  name: string;
}

const Flag: NextPage<FlagType> = ({ countries }) => {
  const [answer, setAnswer] = useState<CountryType>();
  const [example, setExample] = useState<CountryType[]>([]);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    setBestScore(parseInt(localStorage.getItem("bestScore") ?? "0"));
    getNewAnswer();
  }, []);

  useEffect(() => {
    getRandomIndex();
  }, [answer]);

  const getNewAnswer = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setAnswer(countries[randomIndex]);
    setExample([countries[randomIndex]]);
  };

  const getRandomIndex = () => {
    if (answer) {
      const indexArray: number[] = [];
      while (indexArray.length < 3) {
        const exampleIndex = Math.floor(Math.random() * countries.length);
        const exampleCode = countries[exampleIndex].code;
        if (
          answer?.code !== exampleCode &&
          !indexArray.includes(exampleIndex)
        ) {
          indexArray.push(exampleIndex);
        }
      }
      return setExample(
        [...example, ...indexArray.map((index) => countries[index])].sort(
          () => Math.random() - 0.5
        )
      );
    } else {
      return;
    }
  };

  return (
    <Flex justifyContent="center">
      <Flex
        w="600px"
        h="100vh"
        bg="#FDDCD6"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        position="relative"
      >
        <Text
          position="absolute"
          left="10px"
          top="10px"
          color="#8675A9"
          fontSize="30px"
          fontWeight="700"
        >
          Score : {correctCount}
        </Text>
        <Text
          position="absolute"
          right="10px"
          top="10px"
          color="#8675A9"
          fontSize="30px"
          fontWeight="700"
        >
          Best Score : {bestScore}
        </Text>
        <Heading color="#8675A9" mb="30px">
          {"What's the correct answer?"}
        </Heading>
        {answer ? (
          <Image
            width="400px"
            height="300px"
            alt="flag"
            src={`https://flagcdn.com/${answer?.code.toLowerCase()}.svg`}
          />
        ) : (
          <Flex
            width="400px"
            height="300px"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="40px" fontWeight="700" color="#C3AED6">
              Wait...
            </Text>
          </Flex>
        )}
        {example.map((country, index) => (
          <AnswerButton
            key={index}
            correct={country.code === answer?.code}
            name={country.name}
            setCorrectCount={setCorrectCount}
            getNewAnswer={getNewAnswer}
          />
        ))}
        <Quit nowScore={correctCount} />
      </Flex>
    </Flex>
  );
};

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
    }
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const {
      data: { countries },
    }: dataType = await client.query({
      query: GET_COUNTRIES,
    });

    return {
      props: {
        countries: countries.map((country) => ({
          code: country.code,
          name: country.name,
        })),
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Flag;
