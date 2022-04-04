import {
  getUserCategories,
  getUserCategory,
  getCategoryByName,
  updateCategoryName,
  createNewCategory,
} from "./service.js";
import ErrorResponse from "../../Utils/errorResponse.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getUserCategories();
    if (!categories) {
      throw new ErrorResponse("No category found", 404);
    }
    res.status(200).json({
      success: true,
      message: "getting categories completed successfully",
      categories,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const categorie = await getUserCategory(req.params.id);
    if (!categorie) {
      throw new ErrorResponse("No category found", 404);
    }
    res.status(200).json({
      success: true,
      message: "getting categorie completed successfully",
      categorie,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewCategory = async (req, res, next) => {
  try {
    let category = await getCategoryByName(req.body.name);
    if (category) {
      throw new ErrorResponse("Category already exists", 409);
    }
    const newCategory = await createNewCategory(req.body.name);
    if (!newCategory) {
      throw new ErrorResponse("Server Error", 500);
    }

    res.status(200).json({
      success: true,
      message: "new category created successfully",
      newCategory,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    let category = await getUserCategory(req.params.id);

    if (!category) {
      throw new ErrorResponse("Category not found", 404);
    }
    a;
    let categoryByName = await getCategoryByName(req.body.name);
    if (categoryByName) {
      throw new ErrorResponse("Category name already exists", 409);
    }
    let updatedCategory = await updateCategoryName(category._id, req.body.name);
    if (!updatedCategory) {
      throw new ErrorResponse("Server Error", 500);
    }

    res.status(200).json({
      success: true,
      message: "new category created successfully",
      updatedCategory,
    });
  } catch (err) {
    next(err);
  }
};
