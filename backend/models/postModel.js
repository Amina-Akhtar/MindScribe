const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ,
    text: {
        type: String,
        required: true
    },
    image: {
        type: String, //cloudinary url
        required: true
    },
    likes: [{
        type: String // usernames
    }],
    dislikes: [{
        type: String // usernames
    }],
    isPublic: {
        type: Boolean
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
module.exports=Post;