import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import AuthenticationController from "../controllers/authentication/authenticationController";
import UsersController from "../controllers/userController";
import errorMiddleware from "../middleware/errorMiddleware";
import db from "../models";
import { users } from "../seeders/users";

const history = require("connect-history-api-fallback");

const app = express();
app.use(errorMiddleware);
app.use(cookieParser());

app.use("/", new AuthenticationController().router);
app.use("/", new UsersController().router);
//app.use(history());
//app.use(express.static("src"));

const port = process.env.PORT || 9000;

const createUsers = () => {
  users.map((user) => {
    db.User.create(user);
  });
};

//createUsers();

app.get("/", (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  return res.send("hello world");
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});
