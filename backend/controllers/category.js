import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
    try {

    } catch(err) {
        return res.status(500).json({error: err.message})
    }
}


const categoryController = {getAllCategories}

export default categoryController;

