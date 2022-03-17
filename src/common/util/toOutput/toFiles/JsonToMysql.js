import { JsonToFiles } from "../JsonToFiles";

export class JsonToMysql extends JsonToFiles {

    constructor(inputText) {
        super(inputText)
        this.changeToOutput()
        this.downloadFile('sql');
    }

    changeToOutput() {
    }
}