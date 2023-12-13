import { Router } from "express";

import loginTemplate from "../../views/admin/auth/login.js";
import signupTemplate from "../../views/admin/auth/signup.js";
import {
  requireEmail,
  requireEmailExists,
  requirePassword,
  requirePasswordConfirmation,
  requirePasswordForUser,
} from "./validators.js";
import { handleError } from "./middlewares.js";
import {
  showSignupPage,
  signup,
  showLoginPage,
  login,
  signout,
} from "../../controllers/admin/auth.js";

const router = Router();

router.route("/signup")
    .get(showSignupPage)
    .post([requireEmail, requirePassword, requirePasswordConfirmation],handleError(signupTemplate),signup)

router.route("/login")
    .get(showLoginPage)
    .post([requireEmailExists, requirePasswordForUser],handleError(loginTemplate),login)

router.get("/signout", signout);

export default router;
