import { JsonToFiles } from "../JsonToFiles";
import { singleArray, multiArray } from "../../toStructFormat"
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import yaml from "js-yaml";

export class JsonToYaml extends JsonToFiles {
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
        let yamlText;
        if (!settings.structured) {
            yamlText = yaml.dump(this.jsObject);
        } else {
            if (settings.file == "single") {
                let flattedJson = singleArray(this.jsObject);
                yamlText = yaml.dump(flattedJson);
            } else {
                yamlText = multiArray(this.jsObject);
            }
        }
        return yamlText
    }


    downloadSingleFile(text, format = "yaml") {
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
            let yamlText = yaml.dump(jsonObj[key]);
            zip.file(key + ".yaml", yamlText);
        }
        zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            saveAs(content, "output.zip");
        });
    }
}