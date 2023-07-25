import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams, Link, Outlet } from "react-router-dom";
// Chemin pour remonter d'un niveau pour accéder au dossier MTopic et importer MTopic.css
import "../MTopic/MTopic.css";
import { MComments } from "../MComments/MComments";
import { TTopic } from "../../type";

const Avis = () => {
  const [comments, setComments] = useState<TTopic[]>([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/topic/byUser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setComments(data);
        }
      });
  }, [id]);
  console.log(comments);
  return (
    <div className="topicGlobal">
      <div className="topic">
        {comments.map((elem, index) => {
          if (elem.type === "Critique") {
            return (
              <div className="oneTopicCri" key={index}>
                <p className="type">{elem.type}</p>
                <div className="titleMessagePostCri">
                  <h3 className="titlePost">{elem.title}</h3>
                  <p className="messagePost">{elem.subject}</p>
                </div>
                <MComments
                  className="commentsCri"
                  topicID={elem.id}
                ></MComments>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Avis;
