import { Form, Input, Button } from "antd";
import { useLocation } from "react-router-dom";
import "./contact.css";
import { useRef } from "react";

const ContactForm = () => {
  const location = useLocation();
  console.log("VOICI LA LOCATION", location);
  const { from } = location.state;
  console.log(from);
  const formRef = useRef();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
    // Vous pouvez envoyer les données du formulaire à votre backend ou effectuer d'autres actions ici.
    formRef.current.resetFields();
    alert(" Votre message a bien été envoyé !");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
  };

  return (
    <div className="formulaire">
      <h2>
        send message to {from.lastName} {from.firstName}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Form
          name="contact-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ maxWidth: "30%", width: "100%" }}
          ref={formRef}
        >
          <Form.Item
            label="Nom"
            name="name"
            rules={[{ required: true, message: "Veuillez entrer votre nom !" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sujet"
            name="subject"
            rules={[{ required: true, message: "Veuillez entrer le sujet !" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[
              { required: true, message: "Veuillez entrer votre message !" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
