import { getUserCategories, getUserCategory } from "./service.js";
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
