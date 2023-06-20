import { Button } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


export const LikeButton = ({ messageId }: { messageId: string }) => {
    const isLikedByAuthUser = false
    const onClick = () => {
        console.log("ok")
    }
    const likesCount = 0
  return (
    <Button
      leftIcon={
        isLikedByAuthUser ? <AiFillHeart /> : <AiOutlineHeart />
      }
      colorScheme="pink"
      variant="ghost"
      onClick={onClick}
      m={0}
      maxWidth={20}
    >
      {likesCount}
    </Button>
  );
};
