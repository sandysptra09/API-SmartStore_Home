const db = require('../database/models');
const Brands = db.Brands;

// Add or Create Brands
const store = async (req, res) => {
    try {
        const save = await Brands.create(req.body);
        res.status(200).json({ message: 'Brand creation successful', data: save });
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get All Brands
const index = async (req, res) => {
    try {
        const result = await Brands.findAndCountAll();
        res.status(200).json({ message: 'All brand data retrieved successfully', data: result });
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get Brand By Id
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Brands.findByPk(id);
        const result = data ? data : `${id} not found in the database`;
        res.status(200).json(result);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get Brand By Slug
const showBrandBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const data = await Brands.findOne({ where: { slug: slug } });
        const result = data ? data : `${slug} not found in the database`;
        res.status(200).json(result);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Update Brand By Id
const update = async (req, res) => {
    try {
        const brand = await Brands.findByPk(req.params.id);
        if (brand) {
            await brand.update(req.body);
            res.json({ message: 'Update successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Brand By Id
const destroy = async (req, res) => {
    try {
        const brand = await Brands.findByPk(req.params.id);
        if (Brands) {
            await brand.destroy();
            res.json({ message: 'Deletion successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    index, show, showBrandBySlug, store, update, destroy
};
