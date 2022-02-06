import express from "express";
import passport from "passport";
const router = express.Router();

router.use((req, res, next) => {
  req.session.callBackURL = req.query.callBackURL;
  next()
})

router.get('/protected', (req, res) => {
  let user = req.user;
  console.log('protected', user)
  return res.json({ user });
})


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google_callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.EXTERNAL_URL}/auth/google_success`,
    failureRedirect: `${process.env.EXTERNAL_URL}/auth/google_failed`,
  })
);

router.get("/google_success", function (req, res) {
  let callBackURL = req.session.callBackURL;
  if (callBackURL) return res.redirect(callBackURL)
  res.send(`
     <h2>Authentication Successful </h2>
  `);
});
router.get("/google_failed", function (req, res) {
  res.send(`
     <h2>Authentication Failed </h2>
  `);
});

export { router };
