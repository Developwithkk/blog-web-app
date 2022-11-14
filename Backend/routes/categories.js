const router = require("express").Router()
const Category = require("../Models/Category")

router.post("/" , async (req , res ) => {
    const newcat = new Category(req.body);
    try {
        const savedCat = await newcat.save()
        res.status(200).json(savedCat)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.get("/" , async (req , res ) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})
module.exports = router ;