export function processOperations(jsonObj, operations) {
    operations.forEach(operation => {
        debugger
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
    if(isArray) {
        let newArr = [];
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
            let newJson = {}
            newJson = JSON.parse(JSON.stringify(singleOperation(jsonObj[key], operation, path, isOperation)));
            newArr.push(newJson)
        }
        newJsonObj = newArr;
        return newJsonObj;
    }
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
        } else if (jsonObj[key] == null) {
            newJsonObj[key] = null;
        } else if (typeof (jsonObj[key]) == 'object' && !isArray) {
            newJsonObj[key] = JSON.parse(JSON.stringify(singleOperation(jsonObj[key], operation, path, isOperation)));
        } else {
            newJsonObj[key] = jsonObj[key]
        }
    }
    return newJsonObj;
}

function singleLineString(line, operation) {
    switch (operation.name) {
        case "upper(string)":
            return uppercaseAll(line)
        case "lower(string)":
            return lowercaseAll(line)
        case "replace(string)":
            return regexText(line, operation.oldStr, operation.newStr)
        case "delete(string)":
            return regexText(line, operation.str, '')
        default:
            return line
    }
}

function singleLineBoolean(line, operation) {
    switch (operation.name) {
        case "convert(boolean)":
            return covertBoolean(line)
        case "false(boolean)":
            return changeFalse()
        case "true(boolean)":
            return changeTrue()
        default:
            return line
    }
}

function singleLineNumber(line, operation) {
    switch (operation.name) {
        case "round(number)":
            return round(line, operation);
        case "add(number)":
            return add(line, operation);
        case "minus(number)":
            return minus(line, operation);
        default:
            return line
    }
}


// function of string
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



// function of boolean
function covertBoolean(value) {
    if (value == true) {
        value = false;
    } else if (value == false) {
        value = true;
    }
    return value;
}

function changeFalse() {
    return false;
}

function changeTrue() {
    return true;
}

// function of boolean
function round(value, operation) {
    switch (operation.roundMethod) {
        case "round":
            return Math.round(value);
        case "floor":
            return Math.floor(value);
        case "ceil":
            return Math.ceil(value);
        default:
            return line;
    }
}

function add(value, operation) {
    return value + operation.num;
}

function minus(value, operation) {
    return value + operation.num;
}