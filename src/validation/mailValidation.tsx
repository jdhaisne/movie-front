export const mailValidation = {
  name: "mail",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "need a valid mail",
    },
  },
};
