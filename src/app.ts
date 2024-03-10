import express, { Request } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
} from "./controllers/authController";
import authenticated from "./middlewares/auth";

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req: Request, res) => {
  res.send(`Hello world!`);
});

app.post("/auth/login", login);
app.post("/auth/register", register);
app.post("/auth/forgot-password", forgotPassword);
app.post("/auth/logout", authenticated, logout);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
