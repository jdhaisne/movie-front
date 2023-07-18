import React, { useState, useEffect } from "react";
import { DataApi } from "../../pages/MMovie/MMovie";

interface MTopicProps{
  ourData: DataApi[]
}

export const MTopic = (props:MTopicProps) => {
 const {ourData} = props

  return (
    <>
      {ourData.map((elem, index) => (
        <div key={index}>
          <h2>{elem.Title}</h2>
          <p>{elem.Subject}</p>
          <p>{elem.Type}</p>
        </div>
      ))}
    </>
  );
};


