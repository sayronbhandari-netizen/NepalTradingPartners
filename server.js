const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const User = mongoose.model("User", {
    name: String,
    country: String,
    whatsapp: String,
    interest: String
});

app.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({message:"Registration successful"});
    } catch {
        res.status(500).json({message:"Error"});
    }
});

app.get("/", (req,res)=>{
    res.send("Nepal Trading Investment Partners Server Running");
});

app.listen(3000, ()=>{
    console.log("Server running");
});