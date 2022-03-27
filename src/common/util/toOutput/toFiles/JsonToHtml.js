import { JsonToFiles } from "../JsonToFiles";
import {
    generateHTMLTable,
} from 'json5-to-table'

export class JsonToHtml extends JsonToFiles {

    constructor(inputText) {
        super(inputText)
        let tableHTML = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>`
        tableHTML = tableHTML + generateHTMLTable(this.jsObject)
        tableHTML = tableHTML + `</body>
        </html>
        
        <style>
        td, th {
            border: 1px solid black;
        }
        </style>`

        console.log(tableHTML)
        this.downloadWithSingleTable(tableHTML);
    }

    downloadWithSingleTable(tableHTML) {
        const aTag = document.createElement("a");
        const blob = new Blob([tableHTML]);

        aTag.download = "output.html";
        aTag.style = "display: none";
        aTag.href = URL.createObjectURL(blob);
        document.body.appendChild(aTag);
        aTag.click();

        setTimeout(function () {
            document.body.removeChild(aTag);
            window.URL.revokeObjectURL(blob);
        }, 100);
    }

    changeToOutput() {
    }
}