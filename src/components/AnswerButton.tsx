import { Button, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";

interface PropsType {
  name: string;
  correct: boolean;
  setCorrectCount: Dispatch<SetStateAction<number>>;
}

const AnswerButton: NextPage<PropsType> = ({
  name,
  correct,
  setCorrectCount,
}) => {
  const toast = useToast();
  const clinkFunc = () => {
    correct
      ? (toast({
          position: "top-right",
          title: "정답",
          status: "success",
          duration: 3000,
          isClosable: true,
        }),
        setCorrectCount((prev) => prev + 1))
      : (toast({
          position: "top-right",
          title: "오답",
          status: "error",
          duration: 3000,
          isClosable: true,
        }),
        setCorrectCount((prev) => (prev < 1 ? prev : prev - 1)));
  };
  return (
    <Button
      w="400px"
      height="70px"
      borderRadius="50px"
      colorScheme="purple"
      fontSize="30px"
      m="20px 0"
      onClick={clinkFunc}
    >
      {name}
    </Button>
  );
};

export default AnswerButton;
