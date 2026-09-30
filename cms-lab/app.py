from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://127.0.0.1:27017")
database = client["cms_lab"]
posts_collection = database["posts"]


# Display all posts
@app.route("/")
@app.route("/posts")
def posts():
    all_posts = list(
        posts_collection.find().sort("createdAt", -1)
    )

    return render_template(
        "posts.html",
        posts=all_posts
    )


# Display create-post form
@app.route("/posts/new")
def new_post():
    return render_template("new-post.html")


# Create a new post
@app.route("/posts", methods=["POST"])
def create_post():
    title = request.form.get("title", "").strip()
    content = request.form.get("content", "").strip()
    author = request.form.get("author", "").strip()

    # Server-side validation
    if not title or not content or not author:
        return "Title, content and author are required.", 400

    post = {
        "title": title,
        "content": content,
        "author": author,
        "createdAt": datetime.now()
    }

    posts_collection.insert_one(post)

    return redirect(url_for("posts"))


# Display individual post
@app.route("/posts/<post_id>")
def view_post(post_id):
    try:
        post = posts_collection.find_one({
            "_id": ObjectId(post_id)
        })
    except:
        return "Invalid post ID", 400

    if post is None:
        return "Post not found", 404

    return render_template(
        "post.html",
        post=post
    )


if __name__ == "__main__":
    app.run(debug=True)