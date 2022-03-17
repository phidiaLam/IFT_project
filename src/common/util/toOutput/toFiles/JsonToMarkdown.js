import { JsonToFiles } from "../JsonToFiles";

export class JsonToMarkdown extends JsonToFiles {

    constructor(inputText) {
        super(inputText)
        this.changeToOutput()
        this.downloadFile('md');
    }

    changeToOutput() {
    }
}