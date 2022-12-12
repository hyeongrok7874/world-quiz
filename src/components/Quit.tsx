import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface PropsType {
  nowScore: number;
}

const Quit: React.FC<PropsType> = ({ nowScore }) => {
  const { replace } = useRouter();

  const quit = () => {
    const bestScore = parseInt(localStorage.getItem("bestScore") ?? "0");
    nowScore > bestScore &&
      localStorage.setItem("bestScore", nowScore.toString());
    replace("/");
  };

  return (
    <Button
      w="100px"
      h="100px"
      colorScheme="red"
      borderRadius="100%"
      fontSize="25px"
      onClick={quit}
      css={{
        "@media (max-width: 400px)": {
          width: "70px",
          height: "70px",
          fontSize: "20px",
        },
      }}
    >
      Quit
    </Button>
  );
};

export default Quit;
