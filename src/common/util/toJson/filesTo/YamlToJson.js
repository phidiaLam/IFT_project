import { FilesToJson } from "../FilesToJson";
import yaml from "js-yaml"

export class YamlToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        this.jsonText = yaml.load(this.inputText);
    }
}
