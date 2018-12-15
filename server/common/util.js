exports.isEmptyObject = function(obj) {
    if (!obj) {
        return true;
    } else {
        return Object.keys(obj).length === 0;
    }
};