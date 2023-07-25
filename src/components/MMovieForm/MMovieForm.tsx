import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "./MMovieForm.css";
import { MForm } from "../MForm/MForm";
import { TTopic } from "../../type";

type Inputs = {
  critique: string;
  Avis: string;
};

const defaultValues: Inputs = {
  critique: "",
  Avis: "",
};

interface MForm {
  fetchData: () => Promise<void>;
  imgAndName: string[];
}

export const MMovieForm = (props: MForm) => {
  const { fetchData } = props;
  const { imgAndName } = props;
  console.log(imgAndName);
  const { id } = useParams();
  const { register, watch } = useForm();

  const onSubmit: SubmitHandler<Inputs> = async (data1) => {
    let data3 = watch("type");
    let data2 = watch("subject");
    const url = `http://localhost:3000/topic/createTopic/${id}`;
    let res = {};
    data2 = `{"subject" :"${data2}"}`;
    data3 = `{"type" :"${data3}"}`;
    console.log(data3, "test");
    console.log(data2);
    let img = `{"image":"${imgAndName[1]}"}`;
    let userName = `{"userName":"${imgAndName[0]}"}`;

    let userId = `{"userId":"${imgAndName[2]}"}`;
    userId = JSON.parse(userId);
    userName = JSON.parse(userName);
    console.log(userId);
    img = JSON.parse(img);
    console.log(img);
    data2 = JSON.parse(data2);
    data3 = JSON.parse(data3);
    const data = Object.assign({}, data1, data2, data3, img, userName, userId);
    console.log(data.userId);

    const body = JSON.stringify(data);
    console.log(body);
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
    } catch (error) {
      console.log(error);
    }

    console.log(res);
  };
  return (
    <div className="globalCreate">
      <div className="createTopic">
        <MForm<Inputs>
          title="Create post"
          className="moviePost"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <MInput
            className="moviePost__text"
            label="Title"
            id="moviePostTitle"
            type="text"
            placeholder="Post"
            hasLabel={true}
            name="title"
          ></MInput>

          <label className="sujet">
            Subject
            <textarea className="textArea" {...register("subject", {})} />
          </label>

          <label className="type">Type of post:</label>

          <select {...register("type", {})} name="type" id="type-select">
            <option value="">-</option>
            <option value="Critique">Review</option>
            <option value="Avis">opinion</option>
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

          <MButton className="buttonPost">Create post</MButton>
        </MForm>
      </div>
    </div>
  );
};
