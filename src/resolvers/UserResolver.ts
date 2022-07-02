import 'reflect-metadata';
import {Resolver,Query,Mutation,Arg,Ctx,FieldResolver,Root,Int,InputType,Field, ID} from 'type-graphql'
import {Context} from "../../context";
import {Category} from "../schema/Category"
import { Product } from '../schema/Product';
import {User} from '../schema/User';


@InputType()
//This is what a full User should have access to
export class CreateUserInput {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string


}
//Is this means of unique Querying?
//Thus, this means that I can query by the ID or email??
@InputType()
export class UserUniqueInput {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    email: string
}





