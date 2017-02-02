function storeValue(key, value) {
    if (typeof Storage !== "undefined") {
        localStorage.setItem(key, value)
    }
}

function getStoredValue(key, defaultValue) {
    if (typeof Storage !== "undefined") {
        return localStorage.getItem(key) || defaultValue
    }
}
