const db = require('../database/models');
const Categories = db.Categories;

// Add or Create Category
const store = async (req, res) => {
    try {
        const save = await Categories.create(req.body);
        res.status(200).json(save);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get All Categories
const index = async (req, res) => {
    try {
        const result = await Categories.findAndCountAll();
        res.status(200).json({ message: 'All category data retrieved successfully', data: result });
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get  Category By Id
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Categories.findByPk(id);
        const result = data ? data : `${id} not found in the database`;
        res.status(200).json(result);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get Category By Slug
const showCategoryBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const data = await Categories.findOne({ where: { slug: slug } });
        const result = data ? data : `${slug} not found in the database`;
        res.status(200).json(result);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Update Category By Id
const update = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (category) {
            await category.update(req.body);
            res.json({ message: 'Update successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Category By Id
const destroy = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (Categories) {
            await category.destroy();
            res.json({ message: 'Deletion successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    index, show, showCategoryBySlug, store, update, destroy
};
