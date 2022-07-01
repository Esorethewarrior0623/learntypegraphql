import 'reflect-metadata'
import {Resolver,Query,Mutation,Arg,Ctx,FieldResolver,Root,Int,InputType,Field, } from 'type-graphql'
import {Context} from "../../context";
import {Product} from "../schema/Product"
import { Category } from '../schema/Category';
@InputType()
//this is for mutations
export class CreateProductInput {
    @Field()
    name: string
    @Field()
    description: string
    @Field()
    ingredients: string
    @Field()
    moveActive: boolean
    @Field()
    price: number

    
   
}

@Resolver(Product)
export class ProductResolver {
    


    @FieldResolver((returns) => Product)
    async productByCategories(@Root() parent: Product, @Ctx() ctx:Context): Promise<Category[]> {
        return await ctx.prisma.product.findUnique({
            where: {id: parent.id}
        }).categories()  
    }

    @Query((returns) => [Product])
    async allProducts(@Ctx() ctx: Context) {
        return ctx.prisma.product.findMany()
    }

    @Query((returns) => Product)
    async productById(@Arg('id') id:string, @Ctx() ctx: Context) {
        return ctx.prisma.product.findUnique({
            where: {id}
        })
    }

  
   


    @Mutation((returns) => Product)
    async createProduct(@Arg('data') data: CreateProductInput, @Ctx() ctx: Context) {
        return ctx.prisma.product.create({
            data: {
                name: data.name,
                description: data. description,
                ingredients: data. ingredients,
                moveActive: data.moveActive,
                price: data.price,

            }
        })
    }



   
}