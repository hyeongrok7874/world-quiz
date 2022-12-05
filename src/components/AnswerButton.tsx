import { Box, Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";

interface PropsType {
  name: string;
}

const AnswerButton: NextPage<PropsType> = ({ name }) => {
  return (
    <Button
      w="400px"
      height="70px"
      borderRadius="50px"
      colorScheme="purple"
      fontSize="30px"
      m="20px 0"
    >
      {name}
    </Button>
  );
};

export default AnswerButton;
