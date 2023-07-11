export const passwordValidation = {
  name: "password",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 6,
      message: "Must be at least 6 characters long.",
    },
    maxLength: {
      value: 20,
      message: "Must be at max 20 characters long.",
    },
  },
};
