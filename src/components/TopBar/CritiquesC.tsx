import React from "react";
import { useLocation } from "react-router-dom";
import { useParams, Link, Outlet } from "react-router-dom";
import { MComments } from "../MComments/MComments";

const Critiques = () => {
  const location = useLocation();
  console.log("LOCATION", location);
  const { from } = location.state;
  let tab = [];
  for (const elem of from) {
    if (elem.type == "Critique") {
      tab.push(elem);
      console.log("Voici l'élément demandé", elem);
    }
  }
  console.log(tab);
  return (
    <div className="topicGlobal">
      <div className="topic">
        {tab.map((elem, index) => (
          <div
            className={
              elem.type === "Commentaire" ? "oneTopicCom" : "oneTopicCri"
            }
            key={index}
          >
            <p className="type">{elem.type}</p>
            <div
              className={
                elem.type === "Commentaire"
                  ? "titleMessagePostCom"
                  : "titleMessagePostCri"
              }
            >
              <h3 className="titlePost">{elem.title}</h3>
              <p className="messagePost">{elem.subject}</p>
            </div>
            <MComments
              className={
                elem.type === "Commentaire" ? "commentsCom" : "commentsCri"
              }
              topicID={elem.id}
            ></MComments>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Critiques;
