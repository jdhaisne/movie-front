import { useEffect, useState } from "react";
import { TTopic } from "../../type";

export const MFeed = () => {
  const [topics, setTopics] = useState<TTopic[]>([
    {
      id: "",
      title: "",
      subject: "",
      movieId: "",
      type: "",
    },
  ]);

  useEffect(() => {});
  return <></>;
};
