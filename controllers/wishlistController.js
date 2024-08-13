const db = require('../database/models');
const Wishlist = db.Wishlist;
const Products = db.Products
const Categories = db.Categories;

// Add Wishlist
const store = async (req, res) => {
    try {
        const save = await Wishlist.create(req.body);
        console.log(save)
        res.status(200).json(save);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get All Wishlist User
const index = async (req, res) => {
    try {
        const result = await Wishlist.findAndCountAll({});
        res.status(200).json(result);
    } catch (error) {
        res.status(422).json(error);
    }
};

// Get All Wishlist User By Id wishlist
const show = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Wishlist.findAll({
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

// Update Wishlist User By Id wishlist
const update = async (req, res) => {
    try {
        const wishlist = await Wishlist.findByPk(req.params.id);
        if (wishlist) {
            await wishlist.update(req.body);
            res.json({ message: 'Update successful' });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Wishlist User By Id
const destroy = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        const wishlist = await Wishlist.findOne({
            where: {
                user_id,
                product_id
            }
        });

        if (wishlist) {
            await wishlist.destroy();
            res.json({ message: 'Deletion successful' });
        } else {
            res.status(404).json({ message: 'Wishlist not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    index, show, store, update, destroy
};
