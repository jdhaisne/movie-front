// import React from "react";
// import { useState } from "react";



// export const MTopic = async (
//     { callApi }: { callApi: string }) => {

//     interface DataApi {
//         title : string;
//         subject : string;
//         type : string
//     }


//     const [ourData, setOurData] = useState<DataApi[]>([])

//     const response = await fetch(`${callApi}`)
//     const data = await response.json()
//     console.log(data)
//     setOurData(data)
//   return (
//     <>
//       {ourData.map((elem, index) => (
//         <div key={index}>
//           <h2>{elem.title}</h2>
//           <p>{elem.subject}</p>
//           <p>{elem.type}</p>
//         </div>
//       ))}
//     </>
//   );
// };

import React, { useState, useEffect } from "react";

interface DataApi {
  Title: string;
  Subject: string;
  Type: string;
}

export const MTopic = ({ callApi }: { callApi: string }) => {
  const [ourData, setOurData] = useState<DataApi[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(callApi);
      const data = await response.json();
      console.log(data);
      setOurData(data);
      console.log(ourData,'test')
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [callApi]);

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


