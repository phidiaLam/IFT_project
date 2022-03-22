import { JsonToFiles } from "../JsonToFiles";
import csv from "papaparse"
import { singleArray, multiArray } from "../../toStructFormat"

export class JsonToCsv extends JsonToFiles {

    constructor(inputText, settings) {
        super(inputText)
        if(settings.file == "single") {
            let handledData = singleArray(this.jsObject)
            this.downloadMultiFile(handledData, 'csv', settings);
        } else {
            let handledData = multiArray(this.jsObject)
            this.downloadMultiFile(handledData, 'csv', settings);
        }
    }

    downloadMultiFile(jsonObj, format, settings) {
        for(let key in jsonObj) {
            
        }
    }
}