import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();

    if (categories.length === 0) {
      return res.status(404).json({ error: "No category found" });
    }

    return res.status(200).json({categories});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.getById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json({ category });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const isCategoryExists = await Category.getByName(name);

    if (isCategoryExists) {
      return res.status(409).json({ error: "Category already exists" });
    }

    const category = await Category.create({ name });

    return res
      .status(201)
      .json({ message: "Category created Successfully", category });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    const isFound = Category.getById(categoryId);

    if (!isFound) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const isCategoryAlreadyExists = await Category.getByName(name);

    if (isCategoryAlreadyExists) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await Category.update(categoryId, { name });

    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const isFound = Category.getById(categoryId);

    if (!isFound) {
      return res.status(404).json({ error: "Category not found" });
    }

    await Category.delete(categoryId)

    return res.status(200).json({message:"Category deleted successfully"})

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const categoryController = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

export default categoryController;
