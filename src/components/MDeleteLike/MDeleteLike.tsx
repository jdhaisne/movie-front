import { MButton } from "../MButton/MButton";
import "./MDeleteLike.css";

export const MDeleteLikeButton = ({ movieId }: { movieId: string }) => {
  const onClick = async () => {
    try {
      const url = `http://localhost:3000/like/:id`;
      const body = await JSON.stringify({
        movieId: movieId,
        userId: localStorage.getItem("id"),
      });
      let res = {};
      res = await fetch(url, {
        method: "delete",
        body: body,
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          "Access-Control-Allow-Origin": "*", // Update this based on your CORS requirements
        },
      });
    } catch (err) {}
  };

  return (
    <MButton className="redButton" onClick={onClick}>
      Unfollow
    </MButton>
  );

};
