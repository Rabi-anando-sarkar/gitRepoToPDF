import { Schema,model } from "mongoose";

const repoSchema = new Schema (
    {
        repoOwner: {
            type: String,
            required: true,
        },
        repoName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "No description provided",
        },
        htmlUrl: {
            type: String,
            required: true,
        },
        pdfUrl: {
            type: String, // URL for the generated PDF
            required: true,
        },
    },{
        timestamps: true
    }
)

export const Repo = model("Repo",repoSchema)