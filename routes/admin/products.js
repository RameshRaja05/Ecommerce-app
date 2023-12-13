import multer from "multer";
import { Router } from "express";

import productsRepo from "../../repositories/products.js";
import productsNewTemplate from "../../views/admin/products/new.js";
import productEditTemplate from "../../views/admin/products/edit.js";
import { requireTitle, requirePrice } from "./validators.js";
import { handleError, requireAuth, isAuthor } from "./middlewares.js";
import {
  showProducts,
  showProductCreationForm,
  createProduct,
  showProductEditForm,
  editProduct,
  deleteProduct,
} from "../../controllers/admin/products.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

//displaying a products to the admin
router.get("/admin/products", requireAuth, showProducts);

//product creation routes
router
  .route("/admin/products/new")
  //for render a product creation form
  .get(requireAuth, showProductCreationForm)
  //create product route POST request
  .post(
    requireAuth,
    upload.single("image"),
    [requireTitle, requirePrice],
    handleError(productsNewTemplate),
    createProduct
  );

//product modification routes
router
  .route("/admin/products/:Id/edit")
  .get(requireAuth, isAuthor, showProductEditForm)
  .post(
    requireAuth,
    isAuthor,
    upload.single("image"),
    [requireTitle, requirePrice],
    handleError(productEditTemplate, async (req) => {
      const product = await productsRepo.getOne(req.params.Id);
      return { product };
    }),
    editProduct
  );

router.post("/admin/products/:Id/delete", requireAuth, isAuthor, deleteProduct);

export default router;
