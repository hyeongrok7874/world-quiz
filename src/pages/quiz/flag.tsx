import { gql } from "@apollo/client";
import { Text, Flex, Image, Heading } from "@chakra-ui/react";
import { AnswerButton } from "components";
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
  const indexArray: number[] = [];
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setAnswer(countries[randomIndex]);
    setExample([countries[randomIndex]]);
  }, []);

  useEffect(() => {
    getRandomIndex();
  }, [answer]);

  const getRandomIndex = () => {
    if (answer) {
      while (indexArray.length < 3) {
        const exampleIndex = Math.floor(Math.random() * countries.length);
        const exampleCode = countries[exampleIndex].code;
        if (
          answer?.code !== exampleCode &&
          !example.map((exam) => exam.code).includes(exampleCode)
        ) {
          indexArray.push(exampleIndex);
        }
      }
      return setExample([
        ...example,
        ...indexArray.map((index) => countries[index]),
      ]);
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
          {correctCount} 점
        </Text>
        <Heading color="#8675A9" mb="30px">
          무엇이 정답일까요?
        </Heading>
        {answer ? (
          <Image
            width="400px"
            height="300px"
            alt="flag"
            src={`https://flagcdn.com/${answer?.code.toLowerCase()}.svg`}
          />
        ) : (
          <Text fontSize="40px" fontWeight="700" color="#C3AED6">
            잠시만요...
          </Text>
        )}
        {example
          .sort(() => Math.random() - 0.5)
          .map((country, index) => (
            <AnswerButton
              key={index}
              correct={country.code === answer?.code}
              name={country.name}
              setCorrectCount={setCorrectCount}
            />
          ))}
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
