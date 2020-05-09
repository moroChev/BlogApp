const faker = require('faker');
const methodOverride = require('method-override');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/blogs_app', { useFindAndModify: false });
app.use(body_parser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var blogSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        body: String,
        created: { type: Date, default: Date.now }
    }
);

var Blog = mongoose.model("Blog", blogSchema);


app.get("/blogs", function (req, res) {
    // cherchant les blogs de la base
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("error dans find all");
        } else {
            res.render("blogs", { blogs: blogs });
        }
    }
    )
});

app.get("/", function (req, res) {
    // cherchant les blogs de la base
    res.redirect("/blogs");
});

app.get("/blogs/:id",function(req,res){
Blog.findById(req.params.id,function(err,blog){
    if(err)
    {
        console.log("error dans find by id");
        console.error;
    }else{
        res.render("showBlog",{blog : blog});
    }
})
});

app.get("/blogs/new", function (req, res) {
    res.render("newBlog");
}
);

app.post("/blogs", function (req, res) {
    var blog = req.body.blog;
    Blog.create(blog, function (err) {
        if (err) {
            console.log("error dans la creation du blog appartir du post request");
        } else {
            res.redirect("/blogs");
        }
    }
    )
}
);

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err)
        {
            console.log("error dans find by id");
            console.error;
        }else{
            res.render("editBlog",{blog : blog});
        }
    })
});

app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,blog){
        if(err)
        {
            console.log("error dans find by id");
            console.error;
        }else{
            res.redirect("/Blogs/" + blog.id);
        }
    });
});


app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err,blog){
        if(err)
        {
            console.log("error dans find by id");
            console.error;
        }else{
            res.redirect("/Blogs");
        }
    });
});

/* app.get("/blogs/:id/edit",); */

app.get("*", function (req, res) {
    res.send("bienvenue a la maison");
});


app.listen(3000, function () {
    console.log("server is runinng");
});