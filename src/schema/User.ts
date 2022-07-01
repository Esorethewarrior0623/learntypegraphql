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
    name: string

    @Field((type) => String)
    email: string

    @Field((type) => String)
    password: string

    @Field((type) => [Category], {nullable: true})
    categories?: [Category] | null

    @Field((type) => [Product], {nullable: true})
    products?: [Product] | null

    @Field((type) => [Chat], {nullable: true})
    chats?: [Chat] | null


}