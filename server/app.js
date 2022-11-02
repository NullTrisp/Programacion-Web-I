import express from "express";
import { resolve } from "path";

const app = express();
app.use(express.static(resolve() + '/client'));

app.get("/", (req, res) =>
  res.sendFile("index.html", { root: resolve() + "/client/" })
);

export default app;
