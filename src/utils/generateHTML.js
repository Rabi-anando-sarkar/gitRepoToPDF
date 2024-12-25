const generateHTML = (fileContents) => {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Repository Content</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Georgia', serif;
                line-height: 1.6;
                margin: 40px;
                padding: 30px;
                background-color: #f9f9f9;
                color: #333;
            }
            h1 {
                text-align: center;
                font-size: 2em;
                margin-bottom: 20px;
                color: #0056b3;
            }
            .file {
                background-color: #ffffff;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            h2 {
                font-size: 1.5em;
                margin-bottom: 10px;
                color: #333;
            }
            pre {
                background: #f4f4f4;
                padding: 15px;
                border-radius: 8px;
                font-size: 0.9em;
                white-space: pre-wrap;
                word-wrap: break-word;
                max-height: unset;
                overflow-y: visible;
            }
            /* Print settings to prevent cutting off content */
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                }
                .file {
                    page-break-inside: avoid;
                    page-break-before: always;
                }
            }
        </style>
    </head>
    <body>
        <div id="content"> <!-- Added content wrapper -->
            <h1>Repository Content</h1>
    `;

    fileContents.forEach(file => {
        html += `
            <div class="file" style="page-break-after: always;">
                <h2>${file.filename}</h2>
                <pre>${file.content}</pre>
            </div>
        `;
    });

    html += `
        </div> <!-- End content wrapper -->
    </body>
    </html>
    `;

    return html;
}

export {
    generateHTML
}
