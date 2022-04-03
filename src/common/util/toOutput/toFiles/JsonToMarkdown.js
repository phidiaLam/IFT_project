import { JsonToFiles } from "../JsonToFiles";
import { singleArray, multiArray } from "../../toStructFormat"

export class JsonToMarkdown extends JsonToFiles {

    constructor(inputText, settings) {
        super(inputText)
        let tableMarkdown = this.handleSettings(settings)
        this.downloadWithMarkdownTable(tableMarkdown);
    }

    // handle different settings
    handleSettings(settings) {
        let tableHTML = "";
        if (settings.table == "single") {
            let flattedJson = singleArray(this.jsObject);
            tableHTML = this.createMarkdownTable(flattedJson)
        } else {
            let flattedJson = multiArray(this.jsObject);
            for (let key in flattedJson) {
                tableHTML += `## ${key}\n`
                let singleTable = this.createMarkdownTable(flattedJson[key]);
                tableHTML += singleTable;
                tableHTML += "\n\n";
            }
        }
        return tableHTML
    }

    createMarkdownTable(jsonObj) {
        // create header
        let mdStr = "";
        mdStr = "| ";
        let division = "\n| "
        for (let key in jsonObj[0]) {
            mdStr += key;
            mdStr += " | ";
            division += ":---: | "
        }
        mdStr += division;
        console.log(mdStr)
        // create body
        let body = "";
        for (let array in jsonObj) {
            body += "\n| ";
            for (let key in jsonObj[0]) {
                if (jsonObj[array][key] != undefined) {
                    body += jsonObj[array][key] + " |";
                } else {
                    body += " |";
                }
            }
        }
        mdStr += body;
        console.log(mdStr)
        return mdStr;
    }

    downloadWithMarkdownTable(tableHTML) {
        const aTag = document.createElement("a");
        const blob = new Blob([tableHTML]);

        aTag.download = "output.md";
        aTag.style = "display: none";
        aTag.href = URL.createObjectURL(blob);
        document.body.appendChild(aTag);
        aTag.click();

        setTimeout(function () {
            document.body.removeChild(aTag);
            window.URL.revokeObjectURL(blob);
        }, 100);
    }
}