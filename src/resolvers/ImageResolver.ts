import 'reflect-metadata'
import {ID, Query,Mutation,Arg,Ctx,FieldResolver,Root,Int,InputType,Field, Resolver, } from 'type-graphql'
import {Context} from "../../context"
import {Image} from "../schema/Image"
const cloudinary = require("../../cloudinary/cloudinary")
@InputType()
export class ImageInput {
    @Field((type) => ID)
    id: string;

    @Field((type) => String)
    name: string;

    @Field((type) => String)
    url: string;

    @Field((type) => String)
    public_id: string;
 
}

@Resolver(Image) 
export class ImageResolver {

//query all Images
@Query((returns) => [Image])
    async allImages(@Ctx() ctx: Context) {
        return ctx.prisma.image.findMany()
    }

//create image
@Mutation((returns) => Image)
    async createImage(@Arg('data') data:ImageInput, @Ctx() ctx: Context) {
        return cloudinary.uploader.ctx.prisma.image.create({
            data: {
                name: data.name,
                url: data.url,
                public_id: data.public_id
            }
        })
    }
}

