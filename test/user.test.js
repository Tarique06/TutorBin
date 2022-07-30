const axios = require("axios");
const axios_config = { headers: { "Content-Type": "application/json" } };

describe("User table", () => {
  test("signup related API", async () => {
    const result = await axios.post(
      "http://localhost:4000/api/user/register",
      {
        firstName: "Md",
        lastName: "Tarique",
        email: "Tarique11@gmail.com",
        password: "Tarique@123",
      },
      axios_config
    );
    expect(result.status).toBe(200);
  });

  test("login related API", async () => {
    const result = await axios.post(
      "http://localhost:4000/api/user/signin",
      {
        email: "Tarique@gmail.com",
        password: "Tarique@123",
      },
      axios_config
    );
    expect(result.status).toBe(200);
  });
});
