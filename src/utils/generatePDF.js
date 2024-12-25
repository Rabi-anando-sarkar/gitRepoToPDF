import puppeteer from 'puppeteer-core'
import fs from 'fs'
import path from 'path'
import { ApiError } from "./ApiError.js";

const generatePDF = async (htmlContent,outputFolder,executablePath) => {
    try {

        if (!executablePath || typeof executablePath !== 'string') {
            throw new ApiError(400, ':: Invalid executable path provided! ::');
        }

        const browser = await puppeteer.launch({
            executablePath,
            headless: true
        });

        const page = await browser.newPage();

        if(!htmlContent || typeof htmlContent !== "string") {
            throw new ApiError(
                400,
                ":: Invalid HTML provided! ::"
            )
        }

        // Load HTML Content
        await page.setContent(htmlContent)

        await page.waitForSelector('#content', {
            timeout: 20000
        })

        if(!outputFolder || typeof outputFolder !== "string") {
            throw new ApiError(
                400,
                ":: Invalid output folder provided! ::"
            )
        }

        if(!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, {
                recursive: true
            })
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const randomSixDigit = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
        const filename = `${currentDate}-${randomSixDigit}.pdf`
        const pdfPath = path.join(outputFolder, filename)

        // Generate PDF
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
        })

        await browser.close()

        return pdfPath

    } catch (error) {
        throw new ApiError(
            400,
            `:: Error Generating PDF error => ${error} ::`
        )
    }
}

export { generatePDF }