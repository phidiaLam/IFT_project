import { JsonToFiles } from "../JsonToFiles";
import yaml from "js-yaml";

export class JsonToYaml extends JsonToFiles {

    constructor(inputText) {
        super(inputText);
        this.changeToOutput();
        this.downloadFile('yaml');
    }

    changeToOutput() {
        this.outputText = yaml.dump(this.jsObject);
    }
}