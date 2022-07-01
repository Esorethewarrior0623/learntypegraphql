import 'reflect-metadata';
import {Resolver,Query,Mutation,Arg,Ctx,FieldResolver,Root,Int,InputType,Field,} from 'type-graphql'
import {Context} from "../../context";
import {Category} from "../schema/Category"
import { Product } from '../schema/Product';
@InputType()
//This is for Mutations
//this is in the input for Mutations
export class CategoryCreateInput {
    @Field()
    name: string

   
}

@Resolver(Category)
export class CategoryResolver {

    // @FieldResolver()
    // async categoryByProduct(@Root() category: Category, @Ctx() ctx: Context): Promise<Category | undefined> {
    //   return (await ctx.prisma.product.findUnique({
    //     where: {id: category.id}
    //   }).products())
    // }

    @Query((returns) => [Category])
    async allCategories(@Ctx() ctx: Context) {
        return ctx.prisma.category.findMany()
    }

    @Query((returns) => Category)
    async categoryById(@Arg('id') id:string, @Ctx() ctx: Context) {
        return ctx.prisma.category.findUnique({
            where: {id}
        })
    }

  

 
    @Mutation((returns) => Category)
    async createCategory(@Arg('data') data:CategoryCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.category.create({
            data: {
                name: data.name
            }
        })
    }

}