import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { generatePDF } from '../utils/generatePDF.js'
import { generateHTML } from '../utils/generateHTML.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { getFilesFromGithub } from '../utils/getFiles.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPdf = asyncHandler(async (req,res) => {
    
    const { githubUrl } = req.body

    if(!githubUrl) {
        throw new ApiError(
            400,
            "Github Url is required"
        )
    }

    const checkGitRegex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
    const matchUrl = githubUrl.match(checkGitRegex)
    
    if(!matchUrl) {
        throw new ApiError(
            400,
            'Not a Valid GIthub URl'
        )
    }
    
    const owner = matchUrl[1];
    const repo = matchUrl[2];

    const fileContents = await getFilesFromGithub(owner,repo)

    if(!fileContents) {
        throw new ApiError(
            404,
            "Repository not found or access denied"
        )
    }

    const html = generateHTML(fileContents);

    if(!html) {
        throw new ApiError(
            500,
            "Failed to generate HTML From Files"
        )
    }

    const outputPath = path.join(__dirname,`../../public/temp/${repo}`)

    if(!outputPath) {
        throw new ApiError(
            500,
            "Failed to generate output Path"
        )
    }
    
    const generatedPDF = await generatePDF(html,outputPath)

    if(!generatedPDF) {
        throw new ApiError(
            500,
            "Failed to generate PDF"
        )
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            'Working'
        )
    )
})

export {
    getPdf
}