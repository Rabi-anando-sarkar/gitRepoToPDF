import { Schema,model } from "mongoose";

const repoSchema = new Schema (
    {
        repoUrl: {
            type: String,
            required: true,
        },
        pdfUrl: {
            type: String,
            default:"",
        },
        repoMetaData: {
            repoOwner: {
                type: String,
                required: true
            },
            repoName: {
                type: String,
                required: true
            },
        },
        users:{
                type: Schema.Types.ObjectId,
                ref: "User",
            },
    },{
        timestamps: true
    }
)

export const Repo = model("Repo",repoSchema)