import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();

    if (categories.length === 0) {
      return res.status(404).json({ error: "No category found" });
    }

    return res.status(200).json(categories);
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

    console.log(isCategoryExists)

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

const categoryController = { getAllCategories, getOneCategory, createCategory };

export default categoryController;
