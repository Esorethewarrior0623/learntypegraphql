import 'reflect-metadata'
import {ObjectType, Field, ID, Int, Float} from "type-graphql";
import { Category } from './Category';
import {Product} from './Product';
import {Chat} from './Chat';

@ObjectType()
export class User {
    @Field((type) => ID)
    id: string

    @Field((type) => String)    
    name: string | null

    @Field((type) => String)
    email: string |null

    @Field((type) => String)
    password: string | null

    @Field((type) => String, {nullable: true})
    token: string | null

    @Field((type) => [Category], {nullable: true})
    categories?: [Category] | null

    @Field((type) => [Product], {nullable: true})
    products?: [Product] | null

    @Field((type) => [Chat], {nullable: true})
    chats?: [Chat] | null


}