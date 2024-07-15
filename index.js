const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");

app.set("view enginee", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/images", express.static('images'));

//mongoose connection
const MONGO_URL="mongodb://127.0.0.1:27017/formData";
async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("mongoose connected");
}).catch(()=>{
    console.log("mongoose not connected");
});


//port connection check
app.listen(port,()=>{
    console.log("port connected");
});


app.get("/home", (req, res) => {
    res.render("index.ejs");
});

app.get("/home/about-us", (req, res) => {
    res.render("about.ejs");
});

app.get("/home/services", (req, res) => {
    res.render("services.ejs");
});

app.get("/home/contact-us", (req, res) => {
    res.render("contact.ejs");
});


const Form = require("./models/form");

app.post("/" , async (req, res) => {
    const data = new Form(req.body);
    await data.save();
    res.redirect("/home");
});



