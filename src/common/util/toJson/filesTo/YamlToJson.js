import { FilesToJson } from "../FilesToJson";
import yaml from "js-yaml"

export class YamlToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        let json;
        json = yaml.load(this.inputText);
        this.jsonText = JSON.stringify(json);
    }
}
