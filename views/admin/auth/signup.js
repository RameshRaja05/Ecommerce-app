import layout from "../Layout.js";
import {getError} from "../../helpers.js"

export default ({ req,errors }) => {
  return layout({
    content: `
    <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label" for="email">Email</label>
                <input required class="input" placeholder="Email" name="email" type="email" id="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label" for="password">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" id="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label" for="password2">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" name="password2" type="password" id="password2"/>
                <p class="help is-danger">${getError(
                  errors,
                  'password2'
                )}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/login">Have an account? log In</a>
          </div>
        </div>
      </div>`
  });
};
