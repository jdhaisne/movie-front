import { useLocation } from "react-router-dom";

const Plot = () => {
  const location = useLocation();
  const { from } = location.state;

  console.log(from);

  return <div>{from}</div>;
};

export default Plot;
