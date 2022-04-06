import { JsonToFiles } from "../JsonToFiles";
import { singleArray, multiArray } from "../../toStructFormat"

export class JsonToMysql extends JsonToFiles {

    constructor(inputText, settings) {
        super(inputText)
        this.handleSettings(settings);
    }

    handleSettings(settings) {
        if (settings.table == "single") {
            let flattedJson = singleArray(this.jsObject);
            let sqlText = this.createSqlTable(flattedJson, "root");
            this.downloadSingleFile(sqlText);
        } else {
            let flattedJson = multiArray(this.jsObject);
            let sqlText = "";
            for(let key in flattedJson) {
                sqlText += this.createSqlTable(flattedJson[key], key);
            }
            this.downloadSingleFile(sqlText);
        }
    }

    createSqlTable(jsonObj, tableName) {
        let sqlText = `CREATE TABLE IF NOT EXISTS ${tableName.replaceAll(".", "_")} (\n`
        sqlText += `    \`id\` INT PRIMARY KEY AUTO_INCREMENT,\n`
        for (let key in jsonObj[0]) {
            if (typeof (jsonObj[0][key]) == 'number') {
                sqlText += `    \`${key}\` DOUBLE,\n`;
            } else {
                sqlText += `    \`${key}\` TEXT,\n`;
            }
        }
        sqlText = sqlText.slice(0, sqlText.length - 2)
        sqlText += `\n)ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\n`;

        for (let array in jsonObj) {
            sqlText += `INSERT INTO ${tableName.replaceAll(".", "_")} VALUES(`;
            sqlText += ` Null,`;
            for (let key in jsonObj[0]) {
                if (jsonObj[array][key] != undefined) {
                    if (typeof (jsonObj[0][key]) == 'number') {
                        sqlText += ` ${jsonObj[array][key]},`;
                    } else {
                        sqlText += ` '${jsonObj[array][key]}',`;
                    }
                } else {
                    sqlText += " Null,";
                }
            }
            sqlText = sqlText.slice(0, sqlText.length - 1)
            sqlText += ");\n";
        }
        sqlText += "\n\n"
        return sqlText;
    }

    downloadSingleFile(text, format = "sql") {
        const aTag = document.createElement("a");
        const blob = new Blob([text]);

        aTag.download = "output." + format;
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