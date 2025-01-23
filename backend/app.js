const express = require("express");
const cors = require("cors");
const connectDB = require("./connections/connectDb");
const app = express();

const User = require("./routes/user");
const Game = require("./routes/game");
const Favourite = require("./routes/favourite");

require("dotenv").config();
connectDB();

app.use(cors());
app.use(express.text({ type: "text/plain" }))
app.use(express.json());

app.use("/api/user", User);
app.use("/api/game", Game);
app.use("/api/game", Favourite);

app.use("/api/public",express.static("public"));

//creating port
app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
})