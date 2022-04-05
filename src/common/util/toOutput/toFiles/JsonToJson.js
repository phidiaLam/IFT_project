import { JsonToFiles } from "../JsonToFiles";
import { singleArray, multiArray } from "../../toStructFormat"
import JSZip from "jszip";
import { saveAs } from 'file-saver';

export class JsonToJson extends JsonToFiles {

    constructor(inputText, settings) {
        super(inputText)
        let text = this.handleSettings(settings);
        if(typeof (text) != 'object') {
            this.downloadSingleFile(text);
        } else {
            this.downloadMultiFile(text)
        }
    }

    // handle different settings
    handleSettings(settings) {
        let jsonText;
        if (!settings.structured) {
            jsonText = JSON.stringify(this.jsObject);
        } else {
            if (settings.file == "single") {
                let flattedJson = singleArray(this.jsObject);
                jsonText = JSON.stringify(flattedJson);
            } else {
                jsonText = multiArray(this.jsObject);
            }
        }
        return jsonText
    }

    
    downloadSingleFile(jsonText, format = "json") {
        const aTag = document.createElement("a");
        const blob = new Blob([jsonText]);
        
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
        for(let key in jsonObj) {
            let jsonText = JSON.stringify(jsonObj[key]);
            zip.file(key+".json", jsonText);
        }
        zip.generateAsync({type:"blob"}).then(function(content) {
            // see FileSaver.js
            saveAs(content, "output.zip");
        });
    }
}