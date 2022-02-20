import { FilesToJson } from "../FilesToJson";

export class JsonToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        this.jsonText = this.inputText;
    }
}
