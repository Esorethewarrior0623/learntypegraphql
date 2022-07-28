import 'reflect-metadata';
import {Query,Mutation,Arg,Ctx,FieldResolver,Root,Int,InputType,Field, ID, Resolver} from 'type-graphql'
import {Context} from "../../context";
import {Category} from "../schema/Category"
import { Product } from '../schema/Product';
import {User} from '../schema/User';
import {Chat} from '../schema/Chat';


@InputType()
//This is what a full User should have access to
//This requires the full schema of the User
export class CreateUserInput {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string

    @Field((type) => String)
    email: string

    @Field((type) => String)
    password: string
    


}
//Is this means of unique Querying?
//Thus, this means that I can query by the ID or email??
@InputType()
export class UserUniqueInput {
    @Field((type) => ID)
    id: string

    @Field({nullable: true})
    email: string
}

@Resolver(User)
export class UserResolver {

    //create relation between User and their unique Products
    @FieldResolver((returns) => User)
    async products(@Root() parent: User, @Ctx() ctx: Context): Promise<Product[]> {
        return await ctx.prisma.user.findUnique({
            where: {id: parent.id}
        }).products()
    }
    //Issue on this relation
    @FieldResolver((returns) => User)
    async chats(@Root() parent: User, @Ctx() ctx: Context): Promise<Chat[]> {
        return await ctx.prisma.user.findUnique({
            where: {id: parent.id}
        }).chats()
    }

    //return all Users
    @Query((returns) => [User]) 
    async allUsers(@Ctx() ctx: Context) {
        return ctx.prisma.user.findMany()
    }

    //return User based by Id
    @Query((returns) => User)
    async userById(@Arg('id') id:string, @Ctx() ctx: Context) {
        return ctx.prisma.user.findUnique({
            where: {id}
        })
    }

    //create a new User
    @Mutation((returns) => User)
    async createUser(@Arg('data') data:CreateUserInput, @Ctx() ctx: Context) {
       return ctx.prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            
        }
       })
    }
} 





