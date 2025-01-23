const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("../routes/userAuth");

//add game to favourite
router.put("/add-favourite", authenticateToken, async (req, res) => {
    try {
        const {gameId, id} = req.body;
        const userData = await User.find({_id: id, "favourites": {$in: [ gameId]}});
        const isGameFavourite = userData.length > 0;
        if(isGameFavourite){
            return res.status(200).json({message: "Game already added to favourite"});
        }
        await User.findByIdAndUpdate(id, {$push: {favourites: gameId}});
        return res.status(200).json({message: "Game added to favourite successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

//remove game from favourite
router.put("/remove-game-favourite", authenticateToken, async (req, res) => {
    try {
        console.log(req.headers);
        const {gameId, id} = req.body;
        console.log(gameId, id);
        await User.findByIdAndUpdate(id, {$pull: {favourites: gameId}});
        return res.status(200).json({message: "Game removed from favourite successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.get("/get-favourite-games/:userId" ,authenticateToken, async (req, res) => {
    try {
       
        const id = req.params.userId;
        console.log(id);

       const games= await User.findById(id).populate("favourites");
       console.log(games);
       return res.status(200).json({data: games.favourites});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

module.exports = router;