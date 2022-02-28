import { JsonToFiles } from "../JsonToFiles";
import csv from "papaparse"

export class JsonToCsv extends JsonToFiles {

    constructor(inputText) {
        super(inputText)
        this.jsObject = this.changeToStruct()
        console.log(this.jsObject)
        this.changeToOutput()
        this.downloadFile('csv');
    }

    // Process files into structured file form If it is satisfies
    changeToStruct() {
        let title;
        let array;
        title = this.getTitle(this.jsObject)
        array = this.getArray(this.jsObject)
        return array;
    }

    getArray(object) {
        let array;
        if (!(object instanceof Array) && Object.keys(object).length == 1) {
            Object.keys(object).forEach(name => {
                array = this.getArray(JSON.parse(JSON.stringify(object[name])));
            })
        } else {
            array = object;
        }
        return array;
    }

    getTitle(object) {
        let title;
        if (!(object instanceof Array) && Object.keys(object).length == 1) {
            Object.keys(object).forEach(name => {
                let value = this.getTitle(JSON.parse(JSON.stringify(object[name])));

                if (value === '') {
                    title = name;
                } else {
                    title = name + "_" + value;
                }
            })
        } else {
            title = '';
        }
        return title;
    }

    changeToOutput() {
        this.outputText = csv.unparse(this.jsObject);
    }
}