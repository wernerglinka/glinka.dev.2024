/**
 * @function assignDeep
 * @param {*} obj 
 * @param {*} targetKey 
 * @param {*} targetValue 
 */
const assignDeep = (obj, targetKey, targetValue) => {
  Object.keys(obj).forEach(key => {
    if(key === targetKey) {
      obj[key] = targetValue;
    }

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      assignDeep(obj[key], targetKey, targetValue)
    }
  })
};


module.exports = assignDeep;