import { FilesToJson } from "../FilesToJson";

export class JsonToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        this.jsonText = JSON.parse(this.inputText);
    }
}
