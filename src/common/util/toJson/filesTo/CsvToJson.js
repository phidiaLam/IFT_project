import { FilesToJson } from "../FilesToJson";
import csv from "papaparse"

export class CsvToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        let json;
        json = csv.parse(this.inputText, {
            header: true,
            dynamicTyping: true
        });
        this.jsonText = JSON.parse(JSON.stringify(json.data));
    }
}
