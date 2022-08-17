import 'reflect-metadata'
import {ObjectType, Field, ID} from "type-graphql";


@ObjectType()
export class Image {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string | null

    @Field((type) => String)
    url: string | null

    @Field((type) => String)
    public_id: string | null
    
}


