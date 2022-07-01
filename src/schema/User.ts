import 'reflect-metadata'
import {ObjectType, Field, ID, Int, Float} from "type-graphql";
import { Category } from './Category';
import {Product} from './Product';

@ObjectType()
export class User {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string

    @Field((type) => ID)
    email: string

    @Field((type) => ID)
    password: string

    @Field((type) => [Category], {nullable: true})
    categories?: [Category] | null

    @Field((type) => [Product], {nullable: true})
    products?: [Product] | null
}