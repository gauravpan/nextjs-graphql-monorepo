import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel as User } from "./entities/user.entity";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK = process.env.GOOGLE_CALLBACK;

passport.serializeUser(function (user: any, done) {
  console.log("user serialized", user.name);
  return done(null, user._id);
});

passport.deserializeUser(async function (id: string, done) {
  const user = await User.findById(id);
  console.log("[Deserialized] Request from", user.name, "---", user._id);
  done(null, user);
});

//local
passport.use(
  new GraphQLLocalStrategy(async function (
    email: string,
    password: string,
    done
  ) {
    let matchingUser = await User.findOne({ email });
    if (!matchingUser) {
      done(new Error("User not registered"), null);
      return;
    }
    let isValidPassword = await matchingUser.checkPassword(password);
    if (isValidPassword) {
      done(null, matchingUser);
    } else {
      done(new Error("Incorrect password"), null);
    }
  })
);
//google
const handleProfileData = async (profile, done) => {
  let matchingUser = await User.findOne({ google_id: profile.google_id });
  if (matchingUser) {
    done(null, matchingUser);
    return;
  } else {
    console.log("not matched");

    try {
      let newUser = await User.create(profile);
      done(null, newUser);
    } catch (error) {
      console.log(error);
    }
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      handleProfileData(
        {
          google_id: profile.id,
          firstName: profile.name.familyName,
          lastName: profile.name.givenName,
          name: profile.name.givenName + " " + profile.name.familyName,
          email: profile.emails[0].value,
          email_verified: true,
          image_url: profile.photos[0].value,
        },
        done
      );
    }
  )
);
