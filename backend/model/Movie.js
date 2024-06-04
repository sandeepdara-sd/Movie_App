import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    movieName: {
        type: String,
        required: true
    },
    movieYear: {
        type: String,
        required: true
    },
    movieImage: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model("Blog", blogSchema);
