import { gql, useQuery } from "@apollo/client";
import { Text, Flex, Image, Heading } from "@chakra-ui/react";
import { AnswerButton } from "components";
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import client from "utils/client";

interface dataType {
  data: {
    countries: {
      code: string;
    }[];
  };
}

interface FlagType {
  codes: string[];
}

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      code
    }
  }
`;

const Flag: NextPage<FlagType> = ({ codes }) => {
  const [randomIndex, setRandomIndex] = useState<number>(
    Math.floor(Math.random() * codes.length)
  );
  const [code, setCode] = useState<String>(codes[randomIndex]);
  const { data, loading } = useQuery(GET_COUNTRY, {
    variables: { code: code },
  });
  return (
    <Flex justifyContent="center">
      <Flex
        w="600px"
        h="100vh"
        bg="#FDDCD6"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        {loading ? (
          <Text fontWeight="700" fontSize="40px">
            잠시만요...
          </Text>
        ) : (
          <>
            <Heading color="#8675A9" mb="30px">
              무엇이 정답일까요?
            </Heading>
            <Image
              width="400px"
              height="300px"
              alt="flag"
              src={`https://flagcdn.com/${data?.country.code.toLowerCase()}.svg`}
            />
            <AnswerButton name={data?.country.name}></AnswerButton>
          </>
        )}
      </Flex>
    </Flex>
  );
};

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
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
        codes: countries.map((country) => country.code),
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default Flag;
