import layout from "../Layout.js";
import { getError } from "../../helpers.js";

export default ({ product,errors }) => {
  return layout({
    content: `
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="subtitle">Edit a Product</h1>
    
                <form method="POST" enctype="multipart/form-data">
                    <div class="field">
                        <label class="label" for="title">Title</label>
                        <input class="input" type="text" placeholder="title" name="title" id="title" value="${product.title}">
                        <p class="help is-danger">${getError(
                          errors,
                          "title"
                        )}</p>
                    </div>
    
                    <div class="field">
                        <label class="label" for="price">Price</label>
                        <input class="input" type="number" name="price" id="price" value="${product.price}">
                        <p class="help is-danger">${getError(
                          errors,
                          "price"
                        )}</p>
                    </div>
    
                    <div class="field">
                        <label class="label" for="image">Image</label>
                        <input type="file" name="image" id="image">
                    </div>
                    <br />
                    <button class="button is-primary">Submit</button>
                </form>
            </div>
        </div>
        `,
  });
};
