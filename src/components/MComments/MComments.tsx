import { useEffect, useState } from "react";
import { MInput } from "../Minput/MInput";
import { MForm } from "../MForm/MForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { MButton } from "../MButton/MButton";
import "./MComments.scss";

interface dataCommentaire {
  id: string;
  userId: string;
  message: string;
  topicId: string;
}

interface Inputs {
  commentaire: string;
}

const defaultValues: Inputs = {
  commentaire: "",
};

export const MComments = ({
  topicID,
  className,
}: {
  topicID: string;
  className: string;
}) => {
  const [data, setData] = useState<any[]>([]);
  const callApi = async () => {
    try {
      let res = await fetch(`http://localhost:3000/comment/${topicID}`);
      setData(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data1) => {
    const url = `http://localhost:3000/comment/createComment`;
    let res = {};

    const userID = localStorage.getItem("firstName");
    let idTopic = `{"topicId" : "${topicID}"}`;
    let userId = `{"userId" : "${userID}"}`;

    idTopic = JSON.parse(idTopic);
    userId = JSON.parse(userId);

    const data = Object.assign({}, idTopic, userId, data1);
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

      callApi();
    } catch (error) {}

    console.log(res);
  };
  return (
    <div className="test2">
      <>
        <MForm<Inputs>
          title=""
          className="moviePost"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <MInput
            className="commentPost__text"
            label="lache ton com"
            id="commentPost"
            type="text"
            placeholder="Commentaire"
            hasLabel={true}
            name="message"
          ></MInput>

          <MButton className="buttonPost">Envoi ton com</MButton>
        </MForm>
        <div className={className}>
          {data.length > 0 ? (
          data.map((elem: dataCommentaire) => {
            return (
              <div className="oneComment">
                <span className="userName">{elem.userId}:</span>
                <span> {elem.message}</span>
              </div>
            );
          })):(
            <p>Aucun commentaire disponible</p>
          )}
        </div>
      </>
    </div>
  );
};
