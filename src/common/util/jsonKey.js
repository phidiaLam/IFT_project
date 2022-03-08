// get all keys and paths in the json object
function getKeyAndPath(jsonObj, parentPath=null) {
    let isArray = false;
    if (jsonObj instanceof Array) {
        isArray = true;
    }
    let keyJsonArr = [];
    for (let key in jsonObj) {
        let path;
        if (parentPath == null) {
            path = key;
        } else if(isArray) {
            path = parentPath;
        } else {
            path = parentPath + "." + key;
        }
        if (!isArray) {
            let keyObj = {};
            keyObj.key = key;
            keyObj.path = path;
            keyJsonArr.push(keyObj);
        }
        if (typeof (jsonObj[key]) == 'object') {
            keyJsonArr = keyJsonArr.concat(getKeyAndPath(jsonObj[key], path));
        }
    }
    return keyJsonArr;
}

export function getUniqKey(jsonObj) {
    let array = getKeyAndPath(jsonObj)
    // set a temp array
    let temp = [];
    for (let i = 0; i < array.length; i++) {
        if (temp.findIndex(x => x.path === array[i].path) == -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}
