const db = require('../database/models');
const Carts = db.Carts;
const Products = db.Products
const Categories = db.Categories;

// Add Carts
const store = async (req, res) => {
    try {
        const save = await Carts.create(req.body);
        console.log(save)
        res.status(200).json(save);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get All Carts User
const index = async (req, res) => {
    try {
        const result = await Carts.findAndCountAll({});
        res.status(200).json(result);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get All Carts User By Id Carts
const show = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Carts.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: Products,
                    attributes: ['id', 'product_name', 'price'],
                    include: [
                        {
                            model: Categories,
                            attributes: ['category_name']
                        }
                    ]
                },
            ],
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Update Carts User By Id Carts
const update = async (req, res) => {
    try {
        const Carts = await Carts.findByPk(req.params.id);
        if (Carts) {
            await Carts.update(req.body);
            res.json({ message: 'Update successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Carts User By Id
const destroy = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        const Carts = await Carts.findOne({
            where: {
                user_id,
                product_id
            }
        });

        if (Carts) {
            await Carts.destroy();
            res.json({ message: 'Deletion successful' });
        } else {
            res.status(404).json({ message: 'Carts not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    index, show, store, update, destroy
};
