const Category = require("../models/CategoryModel");

// Add Category
exports.addCategory = async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name field is required' });
    }

    try {
        const category = new Category({ name, description });
        await category.save();
        res.status(200).json({ message: 'Category Added' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category name must be unique' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get Category
exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.editCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update category fields
        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();
        res.status(200).json({ message: 'Category Updated' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category name must be unique' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
