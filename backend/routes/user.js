const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../routes/userAuth");
const { default: mongoose } = require("mongoose");
const TimeTracking = require("../models/TimeEntry");

//signup
router.post("/sign-Up", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be at least 4 characters" });
        }

        //check if user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        //check existing email
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //password validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        //create user
        req.body.password = hashPass;
        console.log(req.body)
        const newUser = await User.create(req.body);


        if (newUser) {
            return res.status(200).json({ message: "Signup successfully" });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        };


        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existingUser.username },
                    { role: existingUser.roles }
                ]
                const token = jwt.sign({ authClaims }, process.env.SECRET_KEY, { expiresIn: "30d" });
                return res.status(200).json({ id: existingUser._id, role: existingUser.roles, token: token });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get user info
router.get("/user-info", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const { address } = req.body
        const data = await User.findByIdAndUpdate(id, { address: address })
        return res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/all-users", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const data = await User.find()
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post('/saveTime', async (req, res) => {
   
    const { duration ,userId} =JSON.parse( req.body);

    try {
        console.log("duration", duration,userId);  
      await User.findByIdAndUpdate(userId, { $inc: { "duration": duration } });
        res.status(201).json({ message: "Time saved successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
