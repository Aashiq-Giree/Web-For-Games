const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../routes/userAuth");
const Games = require("../models/games");

//add games --admin
router.post("/add-game", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const user =await User.findById(id);
        if(user.roles !== "admin"){
            return res.status(401).json({message: "Unauthorized"});
        }

        const game = new Games({
            url: req.body.url,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            categories: req.body.categories
        })
        await game.save();
        res.status(200).json({message: "Game added successfully"});
    } catch (error) {
        
    }
});

router.put("/update-game", authenticateToken, async (req, res) => {
    try{
        const {gameid} = req.headers;
        await Games.findByIdAndUpdate(gameid,
            {
                url: req.body.url,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                categories: req.body.categories
            });
        return res.status(200).json({message: "Game updated successfully"});
    }catch(error){
        return res.status(500).json({message: "Internal Server Error"});
        
    }
})

router.delete("/delete-game/:gameId", authenticateToken, async (req, res) => {
    try{
        console.log(req.params);
        const {gameId} = req.params;
        console.log(gameId);
        await Games.findByIdAndDelete(gameId);
        
        return res.status(200).json({message: "Game Deleted successfully"});
    }catch(error){
        return res.status(500).json({message: "Internal Server Error"});
        
    }
});

router.get("/all-games", async (req, res) => {
    try{
        const games = await Games.find().sort({createdAt: -1});
        return res.json({
            status: "success",
            data: games,
        })
    }catch(error){
        return res.status(500).json({message: "Internal Server Error"});
        
    }
});

router.get("/get-recent-games", async (req, res) => {
    try{
        const games = await Games.find().sort({createdAt: -1}).limit(4);
        return res.json({
            status: "success",
            data: games,
        })
    }catch(error){
        return res.status(500).json({message: "Internal Server Error"});
        
    }
});

//get game by id
router.get("/game-by-id/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const game = await Games.findById(id);
        return res.json({
            status: "success",
            data: game,
        })
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
})

module.exports = router;
