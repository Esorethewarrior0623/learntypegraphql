import 'reflect-metadata'
import {ID, Resolver,Query,Mutation,Arg,Ctx,FieldResolver,Root,Int,InputType,Field, } from 'type-graphql'
import {Context} from "../../context";
import {Product} from "../schema/Product"
import { Category } from '../schema/Category';
@InputType()
//this is for mutations
export class CreateProductInput {

    @Field((type) => ID)
    id: string;
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
//means of query
@InputType()
export class ProductUniqueInput {
    @Field({nullable: true})
    id: string

    @Field({nullable: true})
    name: string
}

@Resolver(Product)
export class ProductResolver {
    


    @FieldResolver((returns) => Product)
    async categories(@Root() parent: Product, @Ctx() ctx:Context): Promise<Category[]> {
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


    //Fix this: https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql-typegraphql/src/UserResolver.ts At the bottom
   //I think this is right, I just have to connect the categories to it.
    @Query((returns) => [Category], {nullable: true})
    async categoriesById(@Arg('productUniqueInput') productUniqueInput:ProductUniqueInput, @Ctx() ctx: Context) {
        return ctx.prisma.product.findUnique({
            where: {
                id: productUniqueInput.id || undefined,
                // name: productUniqueInput.name || undefined,
            }
        }).categories()
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