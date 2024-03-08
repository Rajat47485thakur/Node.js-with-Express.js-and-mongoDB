
const Product = require('./products');
const User = require('./user');

async function user(req, res) {
    const { username } = req.body;


    try {
      
        await User.create({
            username
        });

        return res.status(201).json(`User ${username} created`);
    } catch (error) {
        return res.status(500).json(error);
    }
}
async function product(req, res) {
    const { product, price, owner } = req.body;


    try {
     
        await Product.create({
            product,
            price,
            owner
        });

        return res.status(201).json(`User ${username} created`);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function userId(req, res) {

    try {
        const user = await Product.find({ owner: req.params.id }).populate('owner');
        res.status(200).send(`${user}`)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { user, product, userId }