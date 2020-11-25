import { UserNamePasswordInput } from "../resolvers/UserNamePasswordInput";
export const validateRegister = (options: UserNamePasswordInput) => {
  if (options.username.length <= 2) {
    return
    [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }
  if (!options.email.includes("@")) {
    return[
        {
          field: "email",
          message: "invalid email",
        },
      ];
  }
};
