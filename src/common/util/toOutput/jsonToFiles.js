class jsonToFiles {
    // input files
    jsObject;
    // to storage the output text
    outputText;
    // users can interactively select the output format they want
    mode;


    constructor(inputText, mode=0) {
        this.outputText = '';
        this.jsObject = JSON.parse(inputText);
        this.mode=mode;
    }

    async changeToOutput() {
        console.log("Not complete yet")
    }
}

export { jsonToFiles };