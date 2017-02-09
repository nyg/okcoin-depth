var jsDao = (function () {

    var jsDao = {}

    jsDao.set = function (key, value) {
        if (typeof Storage !== "undefined") {
            localStorage.setItem(key, value)
        }
    }

    jsDao.get = function (key, defaultValue) {
        if (typeof Storage !== "undefined") {
            return localStorage.getItem(key) || defaultValue
        }
    }

    return jsDao
})()
