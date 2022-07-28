import 'reflect-metadata'
import {ID, Resolver,Query,Mutation,Arg,Ctx,FieldResolver,Root,Int,InputType,Field, } from 'type-graphql'
import { Category } from '../schema/Category';
import {Product} from '../schema/Product';
import {Chat} from '../schema/Chat';
import {Context} from "../../context";
import {User} from "../schema/User"


@InputType()
export class CreateChatInput {
    @Field((type) => ID)
    id: string
    @Field((type) => ID)
    receiverId: string
    @Field((type) => ID)
    senderId: string
    @Field((type) => String)
    message: string
}

@InputType()
export class ChatUniqueInput {
    @Field({nullable: true})
    user: string

    @Field({nullable: true})
    id: string
}



@Resolver(Chat)
export class ChatResolver {
    @Query((returns) => [Chat])
    async allChats(@Ctx() ctx: Context) {
        return ctx.prisma.chat.findMany()
    }

    @Query((returns) => Chat)
    async chatById(@Arg('id') id:string, @Ctx() ctx: Context) {
        return ctx.prisma.chat.findUnique({
            where: {id}
        })
    }
    @Query((returns) => [Chat], {nullable: true})
        async chatSentByUser(@Arg('chatUniqueInput') chatUniqueInput:ChatUniqueInput, @Ctx() ctx: Context) {
          return ctx.prisma.chat.findFirst({
            where: {
                id: chatUniqueInput.id || undefined,
                // user: chatUniqueInput.user || undefined
            }
          }).sender() 
        }

        @Query((returns) => [Chat], {nullable: true})
        async chatReceivedByUser(@Arg('chatUniqueInput') chatUniqueInput:ChatUniqueInput, @Ctx() ctx: Context) {
          return ctx.prisma.chat.findFirst({
            where: {
                id: chatUniqueInput.id || undefined,
                //user: chatUniqueInput.user || undefined
            }
          }).receiver() 
        }

        @Mutation((returns) => Chat)
        async createChat(@Arg('data') data:CreateChatInput, @Ctx() ctx: Context) {
            return ctx.prisma.chat.create({
                data: {
                    message: data.message,
                    senderId: data.senderId,
                    receiverId: data.receiverId

                }
            })
        }
}


