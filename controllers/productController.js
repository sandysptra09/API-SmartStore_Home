const db = require('../database/models');
const Products = db.Products;
const Brands = db.Brands;
const Categories = db.Categories;
const { Op } = require('sequelize');

// Add or Create Products
const store = async (req, res) => {
    try {
        const save = await Products.create(req.body);
        res.status(200).json({ message: "Product successfully created.", data: save });
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get All Products
const index = async (req, res) => {
    try {
        const result = await Products.findAndCountAll(
            {
                include: [
                    {
                        model: Brands,
                        attributes: ['id', 'brand_name', "slug"]
                    },
                    {
                        model: Categories,
                        attributes: ['id', 'category_name', 'slug']
                    }
                ],
                attributes: { exclude: ['brand_id', 'category_id'] }
            }
        );
        res.status(200).json({ message: "All Products successfully retrieved.", data: result });
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get Product By Id
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Products.findByPk(id,
            {
                include: [
                    {
                        model: Brands,
                        attributes: ['id', 'brand_name', "slug"]
                    },
                    {
                        model: Categories,
                        attributes: ['id', 'category_name', 'slug']
                    }
                ],
                attributes: { exclude: ['brand_id', 'category_id'] }
            });
        const result = data ? data : `${id} not found in the database`;
        res.status(200).json({ message: "Product successfully retrieved.", data: result });
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get Product By Slug
const showBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const data = await Products.findOne({
            where: { slug: slug },
            include: [
                {
                    model: Brands,
                    attributes: ['id', 'brand_name', "slug"]
                },
                {
                    model: Categories,
                    attributes: ['id', 'category_name', 'slug']
                }
            ],
            attributes: { exclude: ['brand_id', 'category_id'] }
        });
        const result = data ? data : `${slug} not found in the database`;
        res.status(200).json({ message: "Product successfully retrieved.", data: result });
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get Product By Brand
const getByBrand = async (req, res) => {
    try {
        const brandName = req.params.brandName;
        const products = await Products.findAll({
            include: [{
                model: Brands,
                where: {
                    brand_name: brandName
                }
            }],
            attributes: { exclude: ['brand_id', 'category_id'] }

        });

        if (products.length === 0) {
            res.status(404).json({ message: "No products found for the given brand" });
        } else {
            res.status(200).json({ message: 'Products successfully retrieved by brand', data: products });
        }
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get Product By Category
const getByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const products = await Products.findAll({
            include: [{
                model: Categories,
                where: {
                    category_name: categoryName
                }
            }],
            attributes: { exclude: ['brand_id', 'category_id'] }

        });

        if (products.length === 0) {
            res.status(404).json({ message: "No products found for the given category" });
        } else {
            res.status(200).json({ message: 'Products successfully retrieved by category', data: products });
        }
    } catch (error) {
        res.status(422).json(error);
    }
};

// Search Product
const search = async (req, res) => {
    try {
        const { keyword } = req.query;
        const result = await Products.findAll({
            where: {
                [Op.or]: [
                    { product_name: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } },
                ],
            },
            include: [
                {
                    model: Brands,
                    required: false // Menggunakan left join agar pencarian tidak bergantung pada merek
                },
                {
                    model: Categories,
                    required: false // Menggunakan left join agar pencarian tidak bergantung pada kategori
                }
            ],
            attributes: { exclude: ['brand_id', 'category_id'] }

        });

        if (result.length === 0) {
            res.status(404).json({ message: "No products found for the given keyword" });
        } else {
            res.status(200).json({ message: "Products successfully retrieved.", data: result });
        }
    } catch (error) {
        res.status(422).json(error);
    }
};


// Update Product By Id
const update = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (product) {
            await product.update(req.body);
            res.json({ message: 'Update successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Product By Slug
const updateBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await Products.findOne({ where: { slug: slug } });
        if (product) {
            await product.update(req.body);
            res.json({ message: 'Update successful' });
        } else {
            res.status(404).json({ message: `${slug} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Product By Id
const destroy = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.json({ message: 'Deletion successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    index, show, showBySlug, search, getByBrand, getByCategory, store, update, updateBySlug, destroy
};
