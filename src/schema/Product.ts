import 'reflect-metadata'
import {ObjectType, Field, ID, Int, Float} from "type-graphql";
import { Category } from './Category';

@ObjectType()
export class Product {
    @Field((type) => ID)
    id:string

    @Field((type) => String)
    name: string | null

    @Field((type) => String, {nullable: true})
    description:string | null

    @Field((type) => [String], {nullable: true})
    ingredients:[string] | null

    @Field((type) => Boolean)
    moveActive:boolean | null

    @Field((type) => Float, {nullable: true})
    price: number| null

    @Field((type) => [Category], {nullable: true})
    categories?: [Category] | null
}