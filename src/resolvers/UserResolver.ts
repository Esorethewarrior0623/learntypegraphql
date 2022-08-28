import 'reflect-metadata';
import {Query,Arg,Ctx,FieldResolver,Root,Int,InputType,Field, ID, Resolver, Mutation} from 'type-graphql'
import {Context} from "../../context";
import {Category} from "../schema/Category"
import { Product } from '../schema/Product';
import {User} from '../schema/User';
import {Chat} from '../schema/Chat';
import { ApolloError } from 'apollo-server';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


@InputType()
//This is what a full User should have access to
//This requires the full schema of the User
//Also Register User
export class RegisterInput {


    
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

  

}
@InputType()
export class LoginUserInput {
    @Field()
    email: string

    @Field()
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

    @Mutation((returns) => User)
    async registerUser(@Arg('registerInput') registerInput:RegisterInput, @Ctx() ctx: Context) {
        const oldUser = await ctx.prisma.user.findUnique({ where: { email: registerInput.email}})
        if(oldUser) {
                    throw new ApolloError('A user is already registered with the email' + registerInput.email, 'USER_ALREADY_EXISTS')
                }
                console.log(ApolloError)
        var encryptedPassword = await bcrypt.hash(registerInput.password, 10)

        const newUser = await ctx.prisma.user.create({
            data: {
                name: registerInput.name,
                email: registerInput.email,
                password: encryptedPassword        
            }
        });

        const token = jwt.sign({user_id: newUser.id, email: newUser.email}, "UNSAFE_STRING", {expiresIn: "2h"});
        newUser.token = token

        return newUser

        


      
    
    }

    @Mutation((returns) => User)
    async loginUser(@Arg('data') data: LoginUserInput, @Ctx() ctx: Context) {
        const user = await ctx.prisma.user.findFirst({where: { email: data.email}})
        if (user && (await bcrypt.compare(data.password, user.password))) {
            const token = jwt.sign({user_id: user.id, email:user.email}, "UNSAFE_STRING", {expiresIn: "2h"})
            user.token = token
            return user
            
        } else {
            throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD')
        }
    } 

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

    
} 





