const router = require("express").Router()
const User = require("../Models/User")
const bcrypt = require("bcrypt")
const Post = require("../Models/Post")

// UPDATE

router.put("/:id" , async (req , res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password =  await bcrypt.hash(req.body.password , salt)
        }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body,
        },
        {new : true});
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
 } else {
    res.status(401).json("You can update only your account")
 }
} );

//DELETE

router.delete("/:id" , async (req , res) => {
    if(req.body.userId === req.params.id){ 
        try {
            const user = await User.findById(req.params.id);         
    try {
        await Post.deleteMany({username : user.username})
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted")
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
} catch (error) {
    res.status(404).json("user not found")
    console.log(error)
}  
 } else {
    res.status(401).json("You can update only your account")
 }
} );

// GET USER

router.get("/:id" , async (req , res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others} = user._doc;
        res.status(200).json(others)
        console.log(others)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

module.exports = router