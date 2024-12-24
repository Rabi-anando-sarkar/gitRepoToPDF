import axios from "axios";
import { ApiError } from "./ApiError.js";

const getFilesFromGithub = async(owner,repo,path='') => {
    const baseGitUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    
    const response = await axios.get(baseGitUrl, {
        headers: {
            Authorization: process.env.GITHUB_TOKEN
        }
    });

    if(!response || !response.data) {
        throw new ApiError(
            400,
            "Failed to fetch repo contents"
        )
    }

    const files = response.data;
    const fileContents = []

    for (const file of files) {
        if (file.type === 'file') {
            // If it's a file, download it
            const rawUrl = file.download_url;
            const fileContent = await axios.get(rawUrl);
            fileContents.push({
                filename: file.name,
                content: fileContent.data
            });
        } else if (file.type === 'dir') {
            // If it's a directory, recursively fetch its contents
            const nestedFiles = await getFilesFromGithub(owner, repo, file.path);
            fileContents.push(...nestedFiles); // Flatten the results
        }
    }

    return fileContents;
}

export { getFilesFromGithub }