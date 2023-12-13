import layout from "../Layout.js";

export default ({ products, req }) => {
  const renderedProducts = products
    .map((product) => {
      const isOwner = product.author === req.session.userID;
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
          <a href="/admin/products/${product._id}/edit">
            <button class="button is-link" ${!isOwner&&"disabled"}>
              Edit
            </button>
          </a>
        </td>
        <td>
          <form method="POST" action="/admin/products/${product._id}/delete">
             <button class="button is-danger" id="deleteBtn" data-value="${product._id}" ${!isOwner?"disabled":""}>Delete</button>
          </form>
        </td>
      </tr>
    `;
    })
    .join("");

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Products</h1>  
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `,
  });
};
