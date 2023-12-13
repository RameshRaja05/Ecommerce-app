import usersRepo from "../../repositories/users.js";
import loginTemplate from "../../views/admin/auth/login.js";
import signupTemplate from "../../views/admin/auth/signup.js";

export const showSignupPage = (req, res) => {
  res.send(signupTemplate({ req }));
};

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.create({ email, password });

  req.session.userID = user._id;
  res.redirect("/admin/products");
};

export const showLoginPage = (req, res) => {
  res.send(loginTemplate({}));
};

export const login = async (req, res) => {
  const { email } = req.body;
  const user = await usersRepo.getOneBy({ email });
  req.session.userID = user._id;
  res.redirect("/admin/products");
};

export const signout = (req, res) => {
  req.session = null;
  res.redirect("/signup");
};
