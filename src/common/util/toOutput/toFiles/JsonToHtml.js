import { JsonToFiles } from "../JsonToFiles";
import { generateHTMLTable } from 'json5-to-table'
import { singleArray, multiArray } from "../../toStructFormat"

export class JsonToHtml extends JsonToFiles {

    constructor(inputText, settings) {
        super(inputText)
        let tableHTML = this.handleSettings(settings);

        let htmlData = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        ${tableHTML}
        </body>
        </html>
        
        <style>
        td, th {
            border: 1px solid black;
        }
        </style>`
        console.log(htmlData)
        this.downloadWithSingleTable(htmlData);
    }

    // handle different settings
    handleSettings(settings) {
        let tableHTML="";
        if (!settings.structured) {
            tableHTML = tableHTML + generateHTMLTable(this.jsObject)
        } else {
            if (settings.table == "single") {
                let flattedJson = singleArray(this.jsObject);
                tableHTML = this.createTable(flattedJson)
            } else {
                let flattedJson = multiArray(this.jsObject);
                for (let key in flattedJson) {
                    tableHTML += `<div id="${key}">${key}</div>`
                    let singleTable = this.createTable(flattedJson[key]);
                    tableHTML += singleTable;
                    tableHTML += "<br><br>";
                }
            }
        }
        return tableHTML
    }

    createTable(jsonObj) {
        let table = "<table>";
        table += "<thead><tr>";
        for(let key in jsonObj[0]) {
            table += "<th>" + key + "</th>";
        }
        table += "</thead></tr><tbody>";
        for(let array in jsonObj) {
            table += "<tr>";
            for(let key in jsonObj[0]) {
                if(jsonObj[array][key] != undefined) {
                    if(JSON.stringify(jsonObj[array][key]).indexOf("(table)") != -1) {
                        
                        table += `<td> <a href="#${jsonObj[array][key].replace("(table)", "")}">${jsonObj[array][key]} </td>`;
                    } else {
                        table += "<td>" + jsonObj[array][key] + "</td>";
                    }
                } else {
                    table += "<td></td>";
                }
            }
            table += "</tr>";
        }
        table += "</tbody></table>";
        return table;
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