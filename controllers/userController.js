const db = require("../database/models")
const Users = db.Users;

const store = async (req, res) => {
    try {
        const save = await Users.create(req.body)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const index = async (req, res) => {
    try {
        const result = await Users.findAndCountAll()
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Users.findByPk(id)
        const result = data ? data : `${id} not found in db`
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const update = (req, res) => {
    Users.findByPk(req.params.id).then((emp) => {
        if (emp) {
            emp.update(req.body)

            res.json({ message: 'User updated successfully', updatedUser: emp });
        } else {
            res.status(404).json({ message: `${req.params.id} not found in db` });
        }
    }).catch((err) => {
        res.status(500).json({ message: err.message });
    });
}

const destroy = (req, res) => {
    let msg
    Users.findByPk(req.params.id).then((row) => {
        if (row) {
            row.destroy()
            msg = "success deleted"
        } else {
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ message: err.message })
    })
}

module.exports = {
    index, show, store,
    update, destroy
}