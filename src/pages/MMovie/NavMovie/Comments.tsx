import { useLocation } from "react-router-dom";

const Comments = () => {
  const location = useLocation();
  const { from } = location.state;

  console.log(from);

  return <div>{from}</div>;
};

export default Comments;
