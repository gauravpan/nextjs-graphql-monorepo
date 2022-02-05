import { getModelForClass, Post, Pre, prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import bcrypt from 'bcrypt'
@Pre<User>('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
        console.log("password hashed");

    }
    console.log("password hashed");
})

@ObjectType()
class User {
    _id: any

    @Field({ nullable: true })
    @prop()
    name?: string

    @Field({ nullable: true })
    @prop()
    username?: string

    @Field({ nullable: true })
    @prop()
    email?: string

    @prop()
    password?: string

    @Field({ nullable: true })
    @prop()
    google_id?: string

    @Field({ nullable: true })
    @prop()
    imageURL?: string

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}

export const UserModel = getModelForClass(User)
export { User };