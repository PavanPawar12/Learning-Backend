import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // Cloudinary or storage URL
            required: true,
        },
        thumbnail: {
            type: String, // Thumbnail image URL
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User", // References the users collection
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        duration: {
            type: Number, // in seconds
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema);
