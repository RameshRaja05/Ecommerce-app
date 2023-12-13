import cartsRepo from "../repositories/carts.js";
import productsRepo from "../repositories/products.js";
import cartShowTemplate from "../views/cart/show.js";

export const showCartItems = async (req, res) => {
  //if cartId doesn't exist on req.session direct to the products page 
  const { cartId } = req.session;
  if (!cartId) {
    return res.redirect("/");
  }
  const cart = await cartsRepo.getOne(cartId);
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item._id);
    item.product = product;
  }
  res.send(cartShowTemplate({ items: cart.items }));
};

export const addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.session;
  let cart;
  //check cart is already created or not
  if (!cartId) {
    //if not create a new cart and assign a cartId to cookie
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart._id;
  } else {
    //if exists get the current cart
    cart = await cartsRepo.getOne(cartId);
  }
  //check product is exist or not
  //if exists increase the quantity by 1
  //else add the item to the cart
  const existingItem = cart.items.find((item) => item._id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ _id: productId, quantity: 1 });
  }
  await cartsRepo.update(cart._id, { items: cart.items });
  res.redirect("/");
};

export const removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const { cartId } = req.session;
  if (!cartId) {
    return res.redirect("/");
  }
  const cart = await cartsRepo.getOne(cartId);
  const items = cart.items.filter((item) => item._id != productId);
  await cartsRepo.update(cartId, { items });
  res.redirect("/cart");
};
