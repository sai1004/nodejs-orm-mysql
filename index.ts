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

    // let savedProfiles = await profileRepository.find();  // getting all records from db using find()
    // console.log(`all profiile records from db`, savedProfiles);
  
    let firstProfile = await profileRepository.findOne(1); //searching by name only one recored
    console.log(`first profile from db`, firstProfile);

    let secondProfile = await profileRepository.findOne({ name: "narendra"}); //searching by name only one recored
    console.log(`second profile from db`, secondProfile);

    //=============== updating in dataBase ================\\

      let profileToUpdate = await profileRepository.findOne({ name: 'raj kumar'});
      profileToUpdate.name = 'sai prakash';
      await profileRepository.save(profileToUpdate);
      console.log(profileToUpdate.name)

   //============== removing from DB ======================\\

      // let profileRemove = await profileRepository.findOne({name: 'six user'});
      // await profileRepository.remove(profileRemove);
      // console.log(`profile has been removed Successfully`, profileRemove.name )

  })
  .catch((error: any) => console.log(error));
