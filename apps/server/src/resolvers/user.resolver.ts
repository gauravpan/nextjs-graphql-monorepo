import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Args,
  Authorized,
  Arg,
  Field,
  ObjectType,
} from "type-graphql";


@ObjectType()
class Hello {
  @Field(() => String)
  name: string
}

@Resolver()
export class userResolver {

  // @Authorized()
  @Query((returns) => Hello, { nullable: true })
  async me() {
    return { name: 'Gaurav' };
  }

}
