const mongoose = require("mongoose")
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema = mongoose.Schema(
  {
    videoFile: {
      type: String, //cloudinary url
      required: true,
    },

    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
     title: {
      type: String,
      required: true,
    },
     description: {
      type: String, 
      required: true,
    },
     duration: {
      type: String, 
      required: true,
    },
      views: {
      type: Number,
     default:0,
    },
       isPublished: {
      type:Boolean,
      default: true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
)


videoSchema.plugin(aggregatePaginate)
module.exports = mongoose.model("Video", videoSchema)
