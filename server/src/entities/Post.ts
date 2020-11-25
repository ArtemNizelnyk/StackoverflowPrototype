import { Field, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, BaseEntity PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(()=>String)
  @Column({ type: "text" })
  title!: string;

  @ManyToOne(type=>User, user=>user.posts)
  author:User;

  @Field()
  @Column()
  text!: String;

  @Field()
  @Column({type: "int", default:0})
  points!: number;

  @Field()
  @Column()
  authorId: number;

  @Field(()=> String)
  @CreateDateColumn()
  createdAt : Date;

  @Field(()=> String)
  @UpdateDateColumn()
  updatedAt : Date;
}
