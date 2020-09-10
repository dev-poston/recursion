// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;
// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (typeof obj === 'number') {
    return obj.toString();
  }
  if (obj === null) {
    return 'null';
  }
  if (typeof obj === 'boolean') {
    return obj.toString();
  }
  if (typeof obj === undefined) {
    return undefined;
  }
  if (typeof obj === 'function') {
    return undefined;
  }
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    }
    var arrStr = '[';
    for (var i = 0; i < obj.length; i++) {
      if (i === obj.length - 1) {
        arrStr += stringifyJSON(obj[i]) + ']';
      } else {
        arrStr += stringifyJSON(obj[i]) + ',';
      }
    }
    return arrStr;
  }
  if (typeof obj === 'object') {
    if (_.isEmpty(obj)) {
      return '{}';
    }
    var objStr = '{';
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        return '{}';
      }
      objStr += '"' + key + '"';
      if (typeof obj[key] === 'boolean' || obj[key] === null) {
        objStr += ':' + obj[key] + ',';
        continue;
      }
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        objStr += ':' + stringifyJSON(obj[key]) + ',';
        continue;
      }
      objStr += ':' + '"' + obj[key] + '"' + ',';
    }
    objStr = objStr.slice(0, -1);
    return objStr + '}';
  }
};