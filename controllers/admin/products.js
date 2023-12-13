import productsRepo from "../../repositories/products.js";
import productsIndexTemplate from "../../views/admin/products/index.js";
import productsNewTemplate from "../../views/admin/products/new.js";
import productEditTemplate from "../../views/admin/products/edit.js";

export const showProducts = async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products,req }));
};

export const showProductCreationForm = (req, res) => {
  res.send(productsNewTemplate({}));
};

export const createProduct = async (req, res) => {
  let image;
  if (req.file) {
    image = req.file.buffer.toString("base64");
  }
  const { title, price } = req.body;
  const { userID } = req.session;

  await productsRepo.create({ title, price, image, author: userID });

  res.redirect("/admin/products");
};

export const showProductEditForm = async (req, res) => {
  const { Id } = req.params;

  const product = await productsRepo.getOne(Id);

  if (!product) {
    return res.send("Product doesn't exist");
  }
  return res.send(productEditTemplate({ product }));
};

export const editProduct = async (req, res) => {
  const { Id } = req.params;
  const changes = req.body;
  if (req.file) {
    changes.image = req.file.buffer.toString("base64");
  }
  try {
    await productsRepo.update(Id, changes);
  } catch (error) {
    return res.send("Could not find the item");
  }
  res.redirect("/admin/products");
};

export const deleteProduct = async (req, res) => {
  const { Id } = req.params;
  await productsRepo.delete(Id);
  res.redirect("/admin/products");
};
