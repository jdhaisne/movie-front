import { useEffect, useState } from "react";

interface dataCommentaire {
  Id: string;
  UserId: string;
  Message: string;
  TopicId: string;
}

export const MComments = ({ topicID }: { topicID: string }) => {
  const [data, setData] = useState<any[]>([]);
  const callApi = async () => {
    try {
      let res = await fetch(`http://localhost:3000/comment/${topicID}`);
      setData(await res.json());
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <div>
      <>
        {data.map((elem: dataCommentaire) => {
          return (
            <div className="commentaires">
              <span>{elem.Message}</span>
              <span>{elem.UserId}</span>
            </div>
          );
        })}
      </>
    </div>
  );
};