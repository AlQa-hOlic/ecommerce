import { login } from "./auth";

export const rootValue = {
  me: () => {
    return {
      name: "Test",
      email: "test@test.com",
    };
  },
  login,
};
