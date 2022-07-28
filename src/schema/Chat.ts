import 'reflect-metadata'
import {ObjectType, Field, ID} from "type-graphql";
import { User } from './User';

@ObjectType()
export class Chat {
    @Field((type) => ID)
    id: string

    @Field((type) => ID)
    reciverId: string | null

    @Field((type) => ID)
    senderId: string | null

    @Field((type) => User, {nullable: true})
    reciever?: User | null

    @Field((type) => User, {nullable: true})
    sender?: User | null

    @Field((type) => String)
    message: string | null
    
}