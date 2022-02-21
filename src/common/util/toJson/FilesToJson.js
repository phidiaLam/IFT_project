// remove Spaces at the beginning and end
function trimStr(str) {
    if (str) {

        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    return str
}

class FilesToJson {
    // input files
    inputText;
    // to storage the json text
    jsonText;


    constructor(inputText) {


        this.jsonText = '';
        this.inputText = trimStr(inputText);
    }

    async changeToJson() {
        console.log("Not complete yet")
    }
}

export { FilesToJson };