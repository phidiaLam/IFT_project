import { FilesToJson } from "../FilesToJson";
import xml2js from "xml-js";

export class XmlToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        this.jsonText = JSON.parse(xml2js.xml2json(this.inputText, {nativeType: true, compact: true, spaces: 4}));
    }
}
