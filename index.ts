import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Profile } from "./entities/Profile";
import { connect } from "http2";

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
    let profile = new Profile();

    profile.id = "XYUB6100";
    profile.name = "Raj Kumar";
    profile.mobile = "9888999123";
    profile.email = "rajkumar123@gmail.com";
    profile.password = "!@#123rajk*";

    let savedProfile = await Connection.manager.find(Profile);  //get data from db
    console.log("This Recoreds All Are From DB", savedProfile);

    return Connection.manager.save(profile).then(profile => {
      console.log(
        "profile has been saved Successfully. Profile ID:" + profile.id
      );
    });
  })
  .catch((error: any) => console.log(error));
