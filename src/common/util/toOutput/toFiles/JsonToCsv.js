import { JsonToFiles } from "../JsonToFiles";
import Papa from "papaparse"
import { singleArray, multiArray } from "../../toStructFormat"
import JSZip from "jszip";
import { saveAs } from 'file-saver';

export class JsonToCsv extends JsonToFiles {

    constructor(inputText, settings) {
        super(inputText)
        if(settings.file == "single") {
            let handledData = singleArray(this.jsObject)
            // this.downloadMultiFile(handledData, 'csv', settings);
        } else {
            let handledData = multiArray(this.jsObject)
            
            this.downloadMultiFile(handledData, settings);
        }
    }

    downloadMultiFile(jsonObj, settings) {
        let zip = new JSZip();
        for(let key in jsonObj) {
            let csv = Papa.unparse(jsonObj[key], {delimiter: settings.delimiter})
            zip.file(key+".csv", csv)
        }
        zip.generateAsync({type:"blob"}).then(function(content) {
            // see FileSaver.js
            saveAs(content, "output.zip");
        });
    }
}