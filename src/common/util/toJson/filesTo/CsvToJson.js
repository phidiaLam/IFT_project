import { FilesToJson } from "../FilesToJson";
import csv from "csvtojson"

export class CsvToJson extends FilesToJson {

    constructor(inputText) {
        super(inputText)
    }

    async changeToJson() {
        let json;
        json = await csv().fromString(this.inputText);
        this.jsonText = JSON.stringify(json);
    }
}
