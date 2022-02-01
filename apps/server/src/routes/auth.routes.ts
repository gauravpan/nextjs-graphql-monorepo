import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google_callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/auth/google_success",
    failureRedirect: "http://localhost:4000/auth/google_failed",
  })
);

router.get("/google_success", function(req, res) {
  res.send(`
     <h2>Authentication Successful </h2>
  `);
});
router.get("/google_failed", function(req, res) {
  res.send(`
     <h2>Authentication Failed </h2>
  `);
});

export { router };
