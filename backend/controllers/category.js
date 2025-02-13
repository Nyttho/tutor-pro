import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll()

        if(categories.length === 0) {
            return res.status(404).json({error: "No category found"})
        }

        return res.status(200).json(categories)

    } catch(err) {
        return res.status(500).json({error: err.message})
    }
}

const getOneCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const category = await Category.getById(categoryId)

        if(!category) {
            return res.status(404).json({error: "Category not found"})
        }

        return res.status(200).json({category})

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}


const categoryController = {getAllCategories, getOneCategory}

export default categoryController;

