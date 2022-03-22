class JsonToFiles {
    // input files
    jsObject;
    // using in single files
    outputText;

    constructor(inputText) {
        this.outputText = '';
        this.jsObject = JSON.parse(inputText);
    }

    // change json text to output text
    changeToOutput() {
        console.log("Not complete yet")
    }

    // Download the corresponding file according to the user's interactive selection on the interface
    downloadFile(format = "json") {
        const aTag = document.createElement("a");
        const blob = new Blob([this.outputText]);
        
        aTag.download = "output." + format;
        aTag.style = "display: none";
        aTag.href = URL.createObjectURL(blob);
        document.body.appendChild(aTag);
        aTag.click();

        setTimeout(function () {
            document.body.removeChild(aTag);
            window.URL.revokeObjectURL(blob);
        }, 100);
    }

    downloadMultiFile(jsonObj, format, settings) {
        console.log("Not complete yet")
    }
}

export { JsonToFiles };