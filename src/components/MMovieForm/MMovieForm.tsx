import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "./MMovieForm.css";
import { MForm } from "../MForm/MForm";

type Inputs = {
  critique: string;
  commentaire: string;
};

const defaultValues: Inputs = {
  critique: "",
  commentaire: "",
};

interface MForm {
  fetchData: () => Promise<void>;
}
export const MMovieForm = (props: MForm) => {
  const { fetchData } = props;

  const { id } = useParams();
  const { register, watch } = useForm();

  const onSubmit: SubmitHandler<Inputs> = async (data1) => {
    const data5 = watch("type");
    const data2 = watch("subject");
    const url = `http://localhost:3000/topic/createTopic/${id}`;
    let res = {};
    const data3 = `{"subject" :"${data2}"}`;
    const data6 = `{"type" :"${data5}"}`;
    console.log(data6, "test");
    console.log(data3);
    const data4 = JSON.parse(data3);
    const data7 = JSON.parse(data6);
    const data = Object.assign({}, data1, data4, data7);
    const body = await JSON.stringify(data);
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

      console.log(res, "test");

      if (res.ok == true) {
        fetchData();
      }
    } catch (error) {}

    console.log(res);
  };
  return (
    <div className="globalCreate">
      <div className="createTopic">
        <MForm<Inputs>
          title="Crée ton Topic"
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

          <label className="sujet">
            Sujet
            <textarea className="textArea" {...register("subject", {})} />
          </label>

          <label className="type">De quel type est ton topic ?</label>

          <select {...register("type", {})} name="type" id="type-select">
            <option value="">-</option>
            <option value="Critique">Critique</option>
            <option value="Commentaire">Commentaire</option>
            {/* <option value="commedit">commedie</option>
          <option value="drame">drame</option>
          <option value="commedie dramatique">commedie dramatique</option>
          <option value="thriller">thriller</option>
          <option value="action/aventure">action/aventure</option>
          <option value="horreur">horreur</option>
          <option value="science-fiction">science-fiction</option>
          <option value="fantastique">fantastique</option>
          <option value="animation">animation</option>
          <option value="musical">musical</option>
          <option value="documentaire">documentaire</option>
          <option value="guerre">guerre</option>
          <option value="western">western</option>
          <option value="biopic">biopic</option>
          <option value="commendie romantique">commedie rommantique</option>
          <option value="historique">historique</option>
          <option value="retransmission">retransmission</option>
          <option value="court metrage">court metrage</option> */}
          </select>

          <MButton className="buttonPost">Créer un post</MButton>
        </MForm>
      </div>
    </div>
  );
};
