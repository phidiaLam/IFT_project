import { FilesToJson } from "../FilesToJson";
import xml2js from "xml-js";

export class XmlToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText);
    }

    async changeToJson() {
        this.jsonText = JSON.parse(xml2js.xml2json(this.inputText, { textFn: this.RemoveJsonTextAttribute, nativeType: false, compact: true, spaces: 4, ignoreDeclaration: true, ignoreComment: true }));
    }

    // Remove redundant "_text" attributes
    RemoveJsonTextAttribute(value, parentElement) {
        try {
            let keyNo = Object.keys(parentElement._parent).length;
            let keyName = Object.keys(parentElement._parent)[keyNo - 1];
            let nValue = Number(value);
            if (!isNaN(nValue)) {
                
                parentElement._parent[keyName] = nValue;
            } else {
                let bValue = value.toLowerCase();
                if (bValue === 'true') {
                    parentElement._parent[keyName] = true;
                } else if (bValue === 'false') {
                    parentElement._parent[keyName] = false;
                } else {
                    parentElement._parent[keyName] = value;
                }
            }
        } catch (e) { }
    }

}
