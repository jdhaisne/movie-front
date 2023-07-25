import React from "react";
import { useLocation } from "react-router-dom";
import { useParams, Link, Outlet } from "react-router-dom";
// Chemin pour remonter d'un niveau pour accéder au dossier MTopic et importer MTopic.css
import "../MTopic/MTopic.css";
import { MComments } from "../MComments/MComments";

const Avis = () => {
  const location = useLocation();
  const { from } = location.state;
  let tab = [];
  for (const elem of from) {
    if (elem.type == "Commentaire") {
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

export default Avis;
