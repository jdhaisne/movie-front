import { useState, useEffect } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  CommentOutlined,
  HeartOutlined,
  MailOutlined,
  VideoCameraAddOutlined,
  SmileOutlined,
  KeyOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Header } = Layout;

const TopBar = () => {
  const apiKey = "e8d2b17f";
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const [tableOfLike, setTableOfLike] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user/" + id)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la valeur par défaut :",
          error
        );
      });
  }, [id]); // Ajout de [id] en tant que dépendance pour que le useEffect soit exécuté seulement lorsque id change.

  console.log(userData);
  console.log('test2')
  // const handleClickSuivi = () => {
    // console.log('test')
    // fetch("http://localhost:3000/like/user/" + id)
    //   .then((response) => response.json())
    //   .then((dataLikes) => {
    //     console.log(dataLikes);
    //     if (dataLikes.length !== 0) {
    //       for (const elem of dataLikes) {
    //         fetch(`https://www.omdbapi.com/?i=${elem.movieId}&apikey=${apiKey}`)
    //           .then((response) => response.json())
    //           .then((data) => {
    //             console.log(data);
    //             setTableOfLike(data);
    //             console.log(tableOfLike);
    //           })
    //           .catch((error) => {
    //             console.error("omdbapi", error);
    //           });

      //       fetch("http://localhost:3000/movie/" + elem.movieId)
      //         .then((response) => response.json())
      //         .then((data) => {
      //           console.log(data);
      //           let copy = [...tableOfLike];
      //           if (data.length > 0) {
      //             copy.push(data);
      //           }
      //           console.log(copy);
      //           setTableOfLike(copy);
      //         })
      //         .catch((error) => {
      //           console.error("Error occurred while fetching movie:", error);
      //         });
      //     }
      //   }
      // });
    const handleClickSuivi = async () => {
      try {
        const response = await fetch("http://localhost:3000/like/user/" + id);
        const dataLikes = await response.json();

        if (dataLikes.length !== 0) {
          const apiKey = "e8d2b17f";
          const moviePromises = dataLikes.map(async (elem) => {
            const response1 = await fetch(
              `https://www.omdbapi.com/?i=${elem.movieId}&apikey=${apiKey}`
            );
            const data1 = await response1.json();

            const response2 = await fetch(
              "http://localhost:3000/movie/" + elem.movieId
            );
            const data2 = await response2.json();

            return { ...data1, ...data2 };
          });

          const movies = await Promise.all(moviePromises);
          setTableOfLike(movies);
        }
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

  // };
  
  console.log(tableOfLike);
  useEffect(() => {
    handleClickSuivi();

  },[])

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {userData.role === "utilisateur" ? (
          <SmileOutlined></SmileOutlined>
        ) : userData.role === "administrateur" ? (
          <KeyOutlined></KeyOutlined>
        ) : userData.role === "réalisateur" ? (
          <VideoCameraAddOutlined></VideoCameraAddOutlined>
        ) : null}
        <Typography.Text style={{ color: "white", marginRight: "8px" }}>
          {userData.lastName}
        </Typography.Text>
        <Typography.Text style={{ color: "white" }}>
          {userData.firstName}
        </Typography.Text>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HeartOutlined />}>
          Suivi
          {/* onClick={handleClickSuivi} */}
        </Menu.Item>
        <Menu.Item key="2" icon={<CommentOutlined />}>
          Avis
          {/* onClick={handleClickAvis} */}
        </Menu.Item>
        <Menu.Item key="3" icon={<EditOutlined />}>
          Critiques
          {/* onClick={handleClickCritiques} */}
        </Menu.Item>
        <Menu.Item key="4" icon={<MailOutlined />}>
          Contacter
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default TopBar;

//construire une route id
