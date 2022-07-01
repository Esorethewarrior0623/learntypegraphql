import 'reflect-metadata'
import {ObjectType, Field, ID} from "type-graphql";
import { Product } from './Product';

@ObjectType()
export class Category {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string | null

    @Field((type) => [Product], {nullable: true})
    products?: [Product] | null
}