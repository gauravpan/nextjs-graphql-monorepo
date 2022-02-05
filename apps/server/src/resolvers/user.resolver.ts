import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Args,
  Authorized,
  Field,
  ObjectType,
  Arg,
  ArgsType,
} from "type-graphql";
import { User, UserModel } from "../entities/user.entity";

@ArgsType()
class IcreateUserInput {
  @Field((type) => String)
  email: string

  @Field((type) => String)
  name: string

  @Field((type) => String)
  password: string
}

@ArgsType()
class IloginInput {
  @Field((type) => String)
  email: string
  @Field((type) => String)
  password: string
}

@ArgsType()
class IupdatePasswordInput {
  @Field((type) => String)
  currentPassword: string

  @Field((type) => String)
  newPassword: string
}

@ObjectType()
class Hello {
  @Field(() => String)
  name: string
}

@Resolver()
export class userResolver {

  @Authorized()
  @Query((returns) => User)
  async me(@Ctx() context: any) {
    let user = await UserModel.findById(context.currentUser)
    return user;
  }

  @Mutation(returns => User)
  async createUser(@Args() createUserInput: IcreateUserInput) {
    let newUser = await UserModel.create(createUserInput)
    return newUser;
  }

  @Mutation(returns => User)
  async login(@Ctx() context: any, @Args() { email, password }: IloginInput) {
    let { user } = await context.authenticate("graphql-local", {
      email,
      password,
    });
    context.login(user);
    return user;
  }

  @Mutation(returns => Boolean)
  async logout(@Ctx() context: any) {
    context.req.logout()
    return true;
  }

  @Authorized()
  @Mutation(returns => User)
  async updateProfile(@Ctx() context: any, @Args() { newPassword, currentPassword }: IupdatePasswordInput) {
    let user = await UserModel.findById(context.currentUser)
    if (!user.checkPassword(currentPassword)) throw new Error('Incorrect current password.')
    await UserModel.findByIdAndUpdate(user._id, { password: newPassword });
  }
}
