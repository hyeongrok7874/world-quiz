import { Button, useToast } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface PropsType {
  name: string;
  correct: boolean;
  setCorrectCount: Dispatch<SetStateAction<number>>;
  getNewAnswer: () => void;
}

const AnswerButton: React.FC<PropsType> = ({
  name,
  correct,
  setCorrectCount,
  getNewAnswer,
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
        setCorrectCount((prev) => prev + 1),
        getNewAnswer())
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
      m="1vh 0"
      onClick={clinkFunc}
      overflowX="hidden"
      css={{
        "@media (max-width: 600px)": {
          width: "85%",
        },
        "@media (max-width: 450px)": {
          height: "55px",
          fontSize: "23px",
          margin: "12px 0",
        },
      }}
    >
      {name}
    </Button>
  );
};

export default AnswerButton;
