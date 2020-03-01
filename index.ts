import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Profile } from "./entities/Profile";
var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: false }));
import { Country } from "./entities/Country";
import { getManager } from "typeorm";

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
    let country = new Country();

    country.id = 9999;
    country.c_name = "Something";
    country.c_code = 98765;

    // let savedProfile = await Connection.manager.find(Profile);
    // console.log("This Recoreds All Are From DB", savedProfile);

    // return Connection.manager.save(profile).then(profile => {
    //   console.log(
    //     "profile has been saved Successfully. Profile ID:" + profile.id
    //   );
    // });

    let profileRepository = Connection.getRepository(Profile); // initializing the repo to var by calling connect.getrepo

    await profileRepository.save(profile);
    console.log(`Profile has been Successfully Saved`);

    let savedProfiles = await profileRepository.find(); // getting all records from db using find()
    console.log(`all profiile records from db`, savedProfiles);

    // let firstProfile = await profileRepository.findOne(1); //searching by name only one recored
    // console.log(`first profile from db`, firstProfile);

    // let secondProfile = await profileRepository.findOne({ name: "narendra"}); //searching by name only one recored
    // console.log(`second profile from db`, secondProfile);

    //=============== updating in dataBase ================\\

    // let profileToUpdate = await profileRepository.findOne({ name: 'raj kumar'});
    // profileToUpdate.name = 'sai prakash';
    // await profileRepository.save(profileToUpdate);
    // console.log(profileToUpdate.name)

    //============== removing from DB ======================\\

    // let profileRemove = await profileRepository.findOne({name: 'six user'});
    // await profileRepository.remove(profileRemove);
    // console.log(`profile has been removed Successfully`, profileRemove.name )

    let countryRepository = Connection.getRepository(Country);

    await countryRepository.save(country);
    console.log(`Country has been Saved Successfully `);

    let db = getManager();
    const query = `select * from country`;
    let data: any = db.query(query);
    console.log(data);

    // let savedCountry = await countryRepository.find();
    // console.log("all the recored from country ", savedCountry);
  })
  .catch((error: any) => console.log(error));
