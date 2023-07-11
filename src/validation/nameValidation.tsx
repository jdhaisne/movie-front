export const nameValidation = {
  // name: 'firstName',
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 2,
      message: "Must be at least 2 characters long.",
    },
    maxLength: {
      value: 50,
      message: "Must be at max 50 characters long.",
    },
  },
};
