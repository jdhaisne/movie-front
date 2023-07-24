import { TTopic } from "../../type";
import { MComments } from "../MComments/MComments";

export const MTopicCard = ({ topic, key }: { topic: TTopic; key: number }) => {
  return (
    <div
      className={topic.type === "Commentaire" ? "oneTopicCom" : "oneTopicCri"}
      key={key}
    >
      <p className="type">{topic.type}</p>
      <div
        className={
          topic.type === "Commentaire"
            ? "titleMessagePostCom"
            : "titleMessagePostCri"
        }
      >
        <h3 className="titlePost">{topic.title}</h3>
        <p className="messagePost">{topic.subject}</p>
      </div>

      <MComments
        className={topic.type === "Commentaire" ? "commentsCom" : "commentsCri"}
        topicID={topic.id}
      ></MComments>
    </div>
  );
};
