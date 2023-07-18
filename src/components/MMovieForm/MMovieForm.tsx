import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { MForm } from "../../MForm/MForm";
import { NavLink, Outlet, useParams } from "react-router-dom";

type Inputs = {
  critique: string;
  commentaire: string;
};

const defaultValues: Inputs = {
  critique: "",
  commentaire: "",
};

export const MMovieForm = () => {

  const { id } = useParams();
  const {register, watch} = useForm();
  const onSubmit: SubmitHandler<Inputs> = async (data1) => {

    const data2 = watch("subject")
    const url = `http://localhost:3000/topic/createTopic/${id}`;
    let res = {};
    const data3 = `{"subject" :"${data2}"}`
    const data4 = JSON.parse(data3)
    const data = Object.assign({}, data1, data4);
    const body = await JSON.stringify(data);
    console.log("body", body);

    
    try {
      res = await fetch(url, {
        method: "POST",
        body: body,
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          "Access-Control-Allow-Origin": "*", // Update this based on your CORS requirements
        },
      });
    } catch (error) {}

    console.log(res);
  };
  return (
    <MForm<Inputs>
      title="moviePost"
      className="moviePost"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    >
      <MInput
        className="moviePost__text"
        label="Titre"
        id="moviePostTitle"
        type="text"
        placeholder="Post"
        hasLabel={true}
        name="title"
      ></MInput>

      <label>
        Sujet
        <textarea
        {...register('subject', {})}
        />
      </label>

      <MButton>Créer un post</MButton>
    </MForm>
  );
};
