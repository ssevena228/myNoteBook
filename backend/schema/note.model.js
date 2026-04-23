const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title required!"],
        minlength: [5, "Title must be atleast 5 characters!"]
    },
    description: {
        type: String,
        required: [true, "Description required!"],
        minlength: [10, "Description must be atleast 10 characters!"]
    },
    tag: [String],
    image: {
        type: String,
        default: ""
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema)

module.exports = Note;