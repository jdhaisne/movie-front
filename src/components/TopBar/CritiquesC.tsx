import React from "react";
import { useLocation } from "react-router-dom";
import { useParams, Link, Outlet } from "react-router-dom";
import { MComments } from "../MComments/MComments";
import { useEffect, useState } from "react";
import { TTopic } from "../../type";
const Critiques = () => {
  const [topics, setTopics] = useState<TTopic[]>([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/topic/byUser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setTopics(data);
        }
      });
  }, [id]);
  return (
    <div className="topicGlobal">
      <div className="topic">
        {topics.map((elem, index) => {
          if (elem.type === "Critique")
            return (
              <div className="oneTopicCom" key={index}>
                <p className="type">{elem.type}</p>
                <div className="titleMessagePostCom">
                  <h3 className="titlePost">{elem.title}</h3>
                  <p className="messagePost">{elem.subject}</p>
                </div>
                <MComments
                  className="commentsCom"
                  topicID={elem.id}
                ></MComments>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Critiques;
