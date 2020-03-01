import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('country')
export class Country {

  @PrimaryColumn()
  id: number;

  @Column({name: 'c_name' })
  c_name: string;

  @Column({name: 'c_code'})
  c_code: number;

 
}