/* Update X-Axis Range */
document.getElementById('update-range').onclick = function (e) {
    xAxisRangeNotSet = true
}

/* Grouping unit */
document.getElementById('grouping-unit').value = groupingUnit
document.getElementById('grouping-unit').onchange = function (e) {
    groupingUnit = parseFloat(e.target.value)
}

/* Volume unit */
document.getElementById('volume-contracts').checked = volumeInContracts
document.getElementById('volume-contracts').onchange = function (e) {
    volumeInContracts = e.target.checked
}

document.getElementById('volume-btc').checked = !volumeInContracts
document.getElementById('volume-btc').onchange = function (e) {
    volumeInContracts = !e.target.checked
}

/* Cumulated volume */
document.getElementById('cumulated-volume').checked = cumulatedVolume
document.getElementById('cumulated-volume').onchange = function (e) {
    cumulatedVolume = e.target.checked
}

/* Update timestamp label */
function updateTimestamp(timestamp) {
    document.getElementById('timestamp').textContent = new Date(parseInt(timestamp))
}
