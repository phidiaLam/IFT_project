export function processOperations(jsonObj, operations) {

    operations.forEach(operation => {
        jsonObj = singleOperation(JSON.parse(JSON.stringify(jsonObj)), operation)
    })
    return jsonObj;
}

function singleOperation(jsonObj, operation, parentPath = null, isOperationArea = false) {
    let isArray = false;
    if (jsonObj instanceof Array) {
        isArray = true;
    }
    let newJsonObj = {};
    for (let key in jsonObj) {
        let isOperation = isOperationArea;
        newJsonObj[key] = {};
        let path;
        if (parentPath == null) {
            path = key;
        } else if (isArray) {
            path = parentPath;
        } else {
            path = parentPath + "." + key;
        }
        if (isOperation || path == operation.path || operation.path == "All") {
            isOperation = true
        }
        if (typeof (jsonObj[key]) == 'string' && isOperation) {
            newJsonObj[key] = singleLineString(jsonObj[key], operation)
        } else if (typeof (jsonObj[key]) == 'boolean' && isOperation) {
            newJsonObj[key] = singleLineBoolean(jsonObj[key], operation)
        } else if (typeof (jsonObj[key]) == 'number' && isOperation) {
            newJsonObj[key] = singleLineNumber(jsonObj[key], operation)
        } else if (typeof (jsonObj[key]) == 'object') {
            newJsonObj[key] = JSON.parse(JSON.stringify(singleOperation(jsonObj[key], operation, path, isOperation)));
        } else {
            newJsonObj[key] = jsonObj[key]
        }
    }
    return newJsonObj;
}

function singleLineString(line, operation) {
    switch (operation.name) {
        case "upper-all":
            return uppercaseAll(line)
        case "lower-all":
            return lowercaseAll(line)
        case "replace":
            return regexText(line, operation.oldStr, operation.newStr)
        default:
            return line
    }
}

function singleLineBoolean(line, operation) {
    switch (operation.name) {
        default:
            return line
    }
}

function singleLineNumber(line, operation) {
    switch (operation.name) {
        default:
            return line
    }
}



function uppercaseAll(str) {
    return str.toUpperCase();
}

function lowercaseAll(str) {
    return str.toLowerCase();
}

function regexText(str, oldStr, newStr) {
    let isreg;
    try {
        isreg = eval(oldStr) instanceof RegExp;
        oldStr = eval(oldStr);
    } catch (e) {
        isreg = false;
    }
    return str.replace(oldStr, newStr);
}