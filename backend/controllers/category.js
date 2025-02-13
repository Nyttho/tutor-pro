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


const categoryController = {getAllCategories}

export default categoryController;

