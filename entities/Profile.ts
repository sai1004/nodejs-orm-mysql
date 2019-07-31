import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("profile")
export class Profile {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  password: string;


}