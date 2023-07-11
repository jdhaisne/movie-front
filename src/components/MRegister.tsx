import { test_val, test_req } from "../validation/register-validation";
import { MButton } from "./MButton";
import { MInput } from "./MInput";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  nameRequired: string;
};

export const MRegister = () => {
  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(`register with: ${data}`);
  };
  console.log(`watch: ${methods.watch("name")}`);
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MInput
            label="name"
            id="name"
            type="text"
            placeholder=""
            hasLabel={true}
            {...test_val}
          ></MInput>
          <MInput
            label="name required"
            id="name"
            type="text"
            placeholder=""
            hasLabel={true}
            {...test_req}
          ></MInput>
          <MButton onClick={() => console.log("butt")}>submit</MButton>
        </form>
      </FormProvider>
    </div>
  );
};
