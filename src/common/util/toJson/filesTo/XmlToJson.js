import { FilesToJson } from "../FilesToJson";
import xml2js from "xml-js";

export class XmlToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        this.jsonText = xml2js.xml2json(this.inputText, {compact: true, spaces: 4});
    }
}
