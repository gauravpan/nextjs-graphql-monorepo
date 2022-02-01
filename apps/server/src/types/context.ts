import { Request as ExpressRequest } from "express";
import { PassportSubscriptionContext, PassportContext } from "graphql-passport";
export interface Context extends PassportContext<any, ExpressRequest> {
  currentUser: any;
  // pubsub: PubSub;
}

// export interface ProjectSubscriptionContext extends PassportSubscriptionContext<MyUser, ExpressRequest>{}
