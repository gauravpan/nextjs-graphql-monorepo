import { AuthChecker } from "type-graphql";
import { Context } from "../types/context";

export const customAuthChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  console.log(context.currentUser, context.req.user)
  return !!context.currentUser; // or false if access is denied
};
