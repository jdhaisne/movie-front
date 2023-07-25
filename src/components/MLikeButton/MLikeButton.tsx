import { MButton } from "../MButton/MButton";
import "./MLikeButton.css";

export const MLikeButton = ({ movieId }: { movieId: string | number }) => {
  const onClick = async () => {
    try {
      const url = `http://localhost:3000/like`;
      const body = await JSON.stringify({
        movieId: movieId,
        userId: localStorage.getItem("id"),
      });
      let res = {};
      res = await fetch(url, {
        method: "post",
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
    <MButton className="greenButton" onClick={onClick}>
      Follow
    </MButton>
  );
};
