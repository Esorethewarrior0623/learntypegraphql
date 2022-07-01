import 'reflect-metadata'
import {ObjectType, Field, ID} from "type-graphql";
import { User } from './User';

@ObjectType()
export class Chat {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string | null

}