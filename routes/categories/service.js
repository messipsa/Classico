import ErrorResponse from "../../Utils/errorResponse.js";
import { Category } from "../../models/category.js";

export const getUserCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const getUserCategory = async (id) => {
  try {
    const categorie = await Category.findOne({ _id: id });
    return categorie;
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const getCategoryByName = async (name) => {
  try {
    return await Category.findOne({ name: name });
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const createNewCategory = async (name) => {
  try {
    return await Category.create({
      name: name,
    });
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};

export const updateCategoryName = async (id, name) => {
  try {
    return await Category.findByIdAndUpdate(
      { _id: id },
      { name: name },
      { new: true }
    );
  } catch (err) {
    throw new ErrorResponse("Server Error", 500);
  }
};
