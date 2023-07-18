import { DataApi } from "../../pages/MMovie/MMovie";
import "./MTopic.css";

interface MTopicProps{
  ourData: DataApi[]
}

export const MTopic = (props:MTopicProps) => {
 const {ourData} = props

  return (
    <div className="topicGlobal">
      <div className ="topic">
      {ourData.map((elem, index) => (
        <div className ="oneTopic" key={index}>
          <h3>{elem.Title}</h3>
          <p>{elem.Subject}</p>
          <p>{elem.Type}</p>
        </div>
      ))}
      </div>
      
    </div>
  );
};


