import { JsonToFiles } from "../JsonToFiles";

export class JsonToJson extends JsonToFiles {

    constructor(inputText) {
        super(inputText)
        this.changeToOutput();
        this.downloadFile();
    }

    changeToOutput() {
        this.outputText =  JSON.stringify(this.jsObject);
    }
}