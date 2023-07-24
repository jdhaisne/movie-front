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
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import ContactForm from "./ContactForm";
import { Form, Input, Button } from "antd";
import { TUser } from "../../type";
const { Header } = Layout;

const TopBar = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const apiKey = "e8d2b17f";
  const [userData, setUserData] = useState<TUser>({
    id: "",
    firstName: "",
    lastName: "",
    mail: "",
    birthday: "",
    isAdmin: false,
  });
  const { id } = useParams();
  const localId = localStorage.getItem("id");
  const [opinionsTable, setOpinionsTable] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
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
    else if (localId) {
      const localUser = localStorage.getItem("user");
      if (localUser) setUserData(JSON.parse(localUser));
    }
  }, [id]); // Ajout de [id] en tant que dépendance pour que le useEffect soit exécuté seulement lorsque id change.

  console.log("userdata", userData);
  console.log("test2");

  const getOpinions = async () => {
    try {
      console.log(id);
      const response = await fetch("http://localhost:3000/topic/byUser/" + id);
      const opinionsData = await response.json();
      console.log("OPINIONS DATA", opinionsData);
      setOpinionsTable(opinionsData);
      return "ok";
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };
  console.log(opinionsTable);
  useEffect(() => {
    getOpinions();
  }, []);

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* {userData.role === "utilisateur" ? (
            <SmileOutlined></SmileOutlined>
          ) : userData.role === "administrateur" ? (
            <KeyOutlined></KeyOutlined>
          ) : userData.role === "réalisateur" ? (
            <VideoCameraAddOutlined></VideoCameraAddOutlined>
          ) : null} */}
          <Typography.Text style={{ color: "white", marginRight: "8px" }}>
            <Link to="/">MOVIE TALK</Link>
          </Typography.Text>
          <Typography.Text style={{ color: "white" }}>
            {userData.firstName}
          </Typography.Text>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HeartOutlined />}>
            {/* <Link to={`/user/${id}/suivi`} state={{ from: tableOfLike }}>
              Suivi
            </Link> */}
            <Link to={`/user/${userData.id}/suivi`}>Suivi</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CommentOutlined />}>
            <Link
              to={`/user/${userData.id}/avis`}
              state={{ from: opinionsTable }}
            >
              Avis
            </Link>
            {/* <Link to={`/user/${id}/avis`}> Avis</Link> */}
          </Menu.Item>
          <Menu.Item key="3" icon={<EditOutlined />}>
            {/* <Link to={`/user/${id}/critiquesC`}> Critiques</Link> */}
            <Link
              to={`/user/${userData.id}/critiquesC`}
              state={{ from: opinionsTable }}
            >
              Critiques
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MailOutlined />}>
            <Link
              to={`/user/${userData.id}/contact`}
              state={{ from: userData }}
            >
              Contacter
            </Link>
          </Menu.Item>
          <Menu.Item>
            {localId && <Link to={`/user/account/${localId}`}>compte</Link>}
            {!localId && <Link to="/register">register</Link>}
          </Menu.Item>
          {localId && (
            <Menu.Item>
              <span
                onClick={() => {
                  localStorage.clear();
                  navigate(0);
                }}
              >
                logout
              </span>
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default TopBar;
