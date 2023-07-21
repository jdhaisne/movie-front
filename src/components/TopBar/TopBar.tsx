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

  const handleClickSuivi = () => {
    fetch("http://localhost:3000/like/user/" + id)
      .then((response) => response.json())
      .then((dataLikes) => {
        console.log(dataLikes);
        if (dataLikes.length !== 0) {
          for (const elem of dataLikes) {
            if (typeof elem.id === "string") {
              fetch(`https://www.omdbapi.com/?i=${elem.id}&apikey=${apiKey}`)
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.error("omdbapi", error);
                });
            } else {
              console.log(elem.id);
              fetch("http://localhost:3000/movie/" + elem.id)
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.error("Error occurred while fetching movie:", error);
                });
            }
          }
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la valeur par défaut :",
          error
        );
      });
  };

  handleClickSuivi();

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
