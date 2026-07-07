const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", getAllCategories);
router.post(
  "/",
  protect,
  authorize("products", "write"),
  upload.fields([
    { name: "desktopBanner", maxCount: 1 },
    { name: "mobileBanner", maxCount: 1 },
  ]),
  createCategory
);
router.put(
  "/:id",
  protect,
  authorize("products", "write"),
  upload.fields([
    { name: "desktopBanner", maxCount: 1 },
    { name: "mobileBanner", maxCount: 1 },
  ]),
  updateCategory
);
router.delete("/:id", protect, authorize("products", "delete"), deleteCategory);

module.exports = router;
