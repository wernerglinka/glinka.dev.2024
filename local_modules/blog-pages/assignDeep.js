/**
 * iterate
 * Transform Sanity portable text blocks to markdown and resolve image references
 * 
 * @param {*} obj 
 * @param {*} client 
 * @param {*} options 
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