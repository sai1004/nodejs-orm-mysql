import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Profile } from "./entities/Profile";
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: false }));

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Admin!234",
  database: "mydb",
  entities: [__dirname + "/entities/*.ts"],
  synchronize: true,
  logging: false
})
  .then(async Connection => {
    app.get("/", (req: any, res: any) => {
      res.send(`
        <form action='/answer' method='POST'>
        <p> what color is the sky on a clear and sunny day ? </p>
        <input name="skyColor" autocomplete="off">
        <button> Submit Answer <button>
        </form>
        `);
    });

    app.get("/answer", (req: any, res: any) => {
      res.send("Thank you for submiting the form.");
    });

    app.post("/answer", (req: any, res: any) => {
      if (req.body.skyColor === "BLUE") {
        res.send(`
            <p>Congrats, Your is the correct answer </p>
            <a href='/'> Back To Home Page </a>
            `);
      } else {
        res.send(`<p> Sorry Your Answer is Not Correct </p>
          `);
      }
    });

    app.listen(3000, () => console.log("Server listening on port 3000!"));
    let profile = new Profile();

    profile.id = "XYUB6100";
    profile.name = "Raj Kumar";
    profile.mobile = "9888999123";
    profile.email = "rajkumar123@gmail.com";
    profile.password = "!@#123rajk*";

    let savedProfile = await Connection.manager.find(Profile); //get data from db
    console.log("This Recoreds All Are From DB", savedProfile);

    return Connection.manager.save(profile).then(profile => {
      console.log(
        "profile has been saved Successfully. Profile ID:" + profile.id
      );
    });
  })
  .catch((error: any) => console.log(error));
