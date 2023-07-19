import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler } from "react-hook-form";
import { MForm } from "../MForm/MForm";

type Inputs = {
  critique: string;
  commentaire: string;
};

const defaultValues: Inputs = {
  critique: "",
  commentaire: "",
};

export const MMovieForm = () => {
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("register with:", data);
    const url = `http://localhost:3000/comment/createComment/`;
    let res = {};
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
        label="moviePost"
        id="moviePost"
        type="text"
        placeholder="Post"
        hasLabel={true}
        name="moviePost"
      ></MInput>

      {/* <MInput
        className="moviePost__text"
        label="first name"
        id="moviePost"
        type="text"
        placeholder=""
        hasLabel={true}
        name="moviePost"
      ></MInput> */}

      <MButton>Créer un post</MButton>
    </MForm>
  );
};
