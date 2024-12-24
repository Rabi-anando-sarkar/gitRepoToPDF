import puppeteer from "puppeteer";
import fs from 'fs'
import path from 'path'
import { ApiError } from "./ApiError.js";

const generatePDF = async (html,outputFolder) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Load HTML Content
        await page.setContent(html, {
            waitUntil: 'load'
        })

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

        return true

    } catch (error) {
        throw new ApiError(
            400,
            `error in puppeteer`
        )
    }
}

export { generatePDF }