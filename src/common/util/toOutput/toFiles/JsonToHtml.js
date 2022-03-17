import { JsonToFiles } from "../JsonToFiles";

export class JsonToHtml extends JsonToFiles {

    constructor(inputText) {
        super(inputText)
        this.changeToOutput()
        this.downloadFile('html');
    }

    changeToOutput() {
    }
}