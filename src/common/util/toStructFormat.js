// process multi-level object to single array, and it will be used to convert to a single file
function singleArray(object) {

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
            jsonObj[key] = multiArray(jsonObj[key], mulitArrayObj, path, 2) + "(table)"
        } else if (typeof (jsonObj[key]) == 'object' && parentArray < 0) {
            jsonObj[key] = multiArray(jsonObj[key], mulitArrayObj, path) + "(table)"
        } else if (typeof (jsonObj[key]) == 'object' && parentArray >= 0) {
            jsonObj[key] = multiArray(jsonObj[key], mulitArrayObj, path, parentArray)
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
        mulitArrayObj[parentPath] = arr;
    } else {
        parentPath = jsonObj
    }

    return parentPath;
}


export { singleArray, multiArray };