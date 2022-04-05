import { JsonToFiles } from "../JsonToFiles";
import { singleArray, multiArray } from "../../toStructFormat"
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import xml2js from "xml-js";

export class JsonToXml extends JsonToFiles {
    constructor(inputText, settings) {
        super(inputText)
        let text = this.handleSettings(settings);
        if (typeof (text) != 'object') {
            this.downloadSingleFile(text);
        } else {
            this.downloadMultiFile(text)
        }
    }

    // handle different settings
    handleSettings(settings) {
        let xmlText;
        if (!settings.structured) {
            let options = { compact: true, ignoreComment: true, spaces: 4 };
            xmlText = "<?xml version='1.0' encoding='UTF-8'?>\n" + xml2js.json2xml(this.jsObject, options);
        } else {
            if (settings.file == "single") {
                let flattedJson = singleArray(this.jsObject);
                let options = { compact: true, ignoreComment: true, spaces: 4 };
                xmlText = "<?xml version='1.0' encoding='UTF-8'?>\n" + xml2js.json2xml(flattedJson, options);
            } else {
                xmlText = multiArray(this.jsObject);
            }
        }
        return xmlText
    }


    downloadSingleFile(text, format = "xml") {
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

    downloadMultiFile(jsonObj) {
        let zip = new JSZip();
        for (let key in jsonObj) {
            let options = { compact: true, ignoreComment: true, spaces: 4 };
            let xmlText = "<?xml version='1.0' encoding='UTF-8'?>\n" + xml2js.json2xml(jsonObj[key], options);
            zip.file(key + ".xml", xmlText);
        }
        zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            saveAs(content, "output.zip");
        });
    }
}