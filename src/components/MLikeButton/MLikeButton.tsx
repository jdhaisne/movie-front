import { MButton } from "../MButton/MButton";

export const MLikeButton = ({ movieId }: { movieId: number }) => {
  const onClick = () => {
    try {
      const url = `http://localhost:3000/comment/createComment/`;
      let res = {};
    } catch (err) {}
  };
  return <MButton>like</MButton>;
};
