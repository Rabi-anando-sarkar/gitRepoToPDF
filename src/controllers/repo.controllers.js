import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { generatePDF } from '../utils/generatePDF.js'
import { generateHTML } from '../utils/generateHTML.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { getFilesFromGithub } from '../utils/getFiles.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"

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

    const htmlContent = generateHTML(fileContents);

    if(!htmlContent) {
        throw new ApiError(
            500,
            "Failed to generate HTML From Files"
        )
    }

    const outputPath = path.join(__dirname,`../../public/temp/`)

    if(!outputPath) {
        throw new ApiError(
            500,
            "Failed to generate output Path"
        )
    }
    
    const generatedPDF = await generatePDF(htmlContent,outputPath,executablePath)

    if(!generatedPDF) {
        throw new ApiError(
            500,
            "Failed to generate PDF"
        )
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            'Github Repository to Pdf has been generated!'
        )
    )
})

const uploadPdf = asyncHandler( async(req,res) => {
    
    const localFolder = path.resolve('public/temp/')

    const response = await uploadOnCloudinary(localFolder)

    if(!response) {
        throw new ApiError(
            500,
            "No response not uploaded"
        )
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            response,
            'File Uploaded to cloudinary succesfully'
        )
    )
})

export {
    getPdf,
    uploadPdf
}