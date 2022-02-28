import { JsonToFiles } from "../JsonToFiles";
import xml2js from "xml-js";

export class JsonToXml extends JsonToFiles {

    constructor(inputText) {
        super(inputText)
        this.changeToOutput()
        this.downloadFile('xml');
    }

    changeToOutput() {
        let options = { compact: true, ignoreComment: true, spaces: 4 };
        this.outputText = "<?xml version='1.0' encoding='UTF-8'?>\n" + xml2js.json2xml(this.jsObject, options);
    }
}