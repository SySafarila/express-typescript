import express from "express";
import authentication from "./routers/authentication";
import { runningPort } from "./env";

const app = express();
const port = runningPort;

app.use(express.json());

// authentication route
app.use("/auth", authentication);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
