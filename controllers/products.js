import productsRepo from "../repositories/products.js";
import productsIndexTemplate from "../views/products/index.js";

export const showProducts=async(req,res)=>{
    const products=await productsRepo.getAll();
    res.send(productsIndexTemplate({products}));
}