// process multi-level object to single array, and it will be used to convert to a single file
function singleArray(jsonObj) {
    let handledJson = handleToSingle(jsonObj);
    return handledJson;
}

// process mult-level object to single arrays, and it will be used to convert to a single file
function handleToSingle(jsonObj, parentNode = null, parentArray = -1) {
    // Check if it's an array
    let isArray = false;
    if (jsonObj instanceof Array) {
        isArray = true;
    }

    // Determine which parent element is an array
    if (parentArray >= 0) {
        parentArray -= 1
    }
    let newObject;
    // Iterate over each child element
    for (let key in jsonObj) {
        // Recursively handle different cases
        if (jsonObj[key] instanceof Array) {
            newObject = handleToSingle(jsonObj[key], mulitArrayObj, key, 2)
        } else if (typeof (jsonObj[key]) == 'object' && parentArray == 1) {
            newObject = handleToSingle(jsonObj[key], mulitArrayObj, parentNode, parentArray)
        } else if (typeof (jsonObj[key]) == 'object' && parentArray <= 0) {
            newObject = handleToSingle(jsonObj[key], mulitArrayObj, key, parentArray)
            for (let keyNew in newObject) {
                jsonObj[keyNew] = JSON.parse(JSON.stringify(newObject[keyNew]))
            }
            delete jsonObj[key]
        }  else {
            jsonObj[parentNode+key]=JSON.parse(JSON.stringify(jsonObj[key]));
            delete jsonObj[key];
        } 
    }

    let changedObject;
    

    return changedObject;
}

// Passing in a JSON format object and return json with multiple array.
function multiArray(jsonObj) {
    let mulitArrayObj = {}
    handleToMulti(JSON.parse(JSON.stringify(jsonObj)), mulitArrayObj);
    return mulitArrayObj
}

// process mult-level object to multiple arrays, and it will be used to convert to a multiple file
function handleToMulti(jsonObj, mulitArrayObj, parentPath = null, parentArray = -1) {
    // Check if it's an array
    let isArray = false;
    if (jsonObj instanceof Array) {
        isArray = true;
    }

    // Determine which parent element is an array
    if (parentArray >= 0) {
        parentArray -= 1
    }

    // Iterate over each child element
    for (let key in jsonObj) {
        let path;
        if (parentPath == null) {
            path = key;
        } else if (isArray) {
            path = parentPath;
        } else {
            path = parentPath + "." + key;
        }

        // Recursively handle different cases
        if (jsonObj[key] instanceof Array) {
            jsonObj[key] = handleToMulti(jsonObj[key], mulitArrayObj, path, 2) + "(table)"
        } else if (typeof (jsonObj[key]) == 'object' && parentArray <= 0) {
            jsonObj[key] = handleToMulti(jsonObj[key], mulitArrayObj, path) + "(table)"
        } else if (typeof (jsonObj[key]) == 'object' && parentArray > 0) {
            jsonObj[key] = handleToMulti(jsonObj[key], mulitArrayObj, path, parentArray)
        }
    }

    // Add the root node
    if (parentPath == null) {
        parentPath = "root"
    }

    // Split the data into new objects
    if (isArray) {
        mulitArrayObj[parentPath] = JSON.parse(JSON.stringify(jsonObj));
    } else if (parentArray < 0) {
        let arr = [];
        arr.push(jsonObj)
        
        if(mulitArrayObj[parentPath]) {
            mulitArrayObj[parentPath] = mulitArrayObj[parentPath].concat(arr)
        } else {
            mulitArrayObj[parentPath] = arr;
        }
    } else {
        parentPath = jsonObj
    }

    return parentPath;
}


export { singleArray, multiArray };