function isArray(array) {
    return '[object Array]' == Object.prototype.toString.call(array)
}

function floor(number, unit) {
    return parseFloat((Math.floor(number / unit) * unit).toFixed(2))
}

function last(array) {
    return array[array.length - 1]
}
