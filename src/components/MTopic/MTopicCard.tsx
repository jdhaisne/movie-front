import { TTopic } from "../../type";
import { MComments } from "../MComments/MComments";
import {Link} from "react-router-dom";

export const MTopicCard = ({ topic, key }: { topic: TTopic; key: number }) => {
  console.log(topic.img);
  return (
    <div
      className={topic.type === "Avis" ? "oneTopicCom" : "oneTopicCri"}
      key={key}
    >
      <div className="imgType">
      <Link to={`/movie/${topic.movieId}`}>
        <img src={topic.img} className="imageTopic"></img>
    </Link>
        <div
          className={
            topic.type === "Avis"
              ? "titleMessagePostCom"
              : "titleMessagePostCri"
          }
        >
          <h3 className="titlePost">{topic.title}</h3>
          <p className="messagePost">{topic.subject}</p>
        </div>
        <div className="typeUserName">
          <p className="type">{topic.type}</p>
          <Link to={`/user/${topic.userId}`}>
            <p className="userName">by {topic.userName}</p>
            </Link>
        </div>
      </div>

      <MComments
        className={topic.type === "Avis" ? "commentsCom" : "commentsCri"}
        topicID={topic.id}
      ></MComments>
    </div>
  );
};
