import { useState } from "react";
import { DataApi } from "../../pages/MMovie/MMovie";
import "./MTopic.css";
import { MComments } from "../MComments/MComments";

interface MTopicProps{
  ourData: DataApi[]
}

export const MTopic = (props:MTopicProps) => {
 const {ourData} = props
console.log(ourData)
  return (
    <div className="topicGlobal">
      <div className ="topic">
      {ourData.map((elem, index) => (
        <div className={elem.type === "Commentaire" ? "oneTopicCom" : "oneTopicCri"} key={index}>
          <p className='type'>{elem.type}</p>
          <div className={elem.type === "Commentaire" ? "titleMessagePostCom" : "titleMessagePostCri"}>
             <h3 className="titlePost">{elem.title}</h3>
          <p className="messagePost">{elem.subject}</p>
          </div>
         
          
          <MComments className={elem.type === "Commentaire" ? "commentsCom" : "commentsCri"} topicID = {elem.id}></MComments>
        </div>
        
      ))}
      </div>
      
    </div>
  );
};


