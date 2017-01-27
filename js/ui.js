/* Reset axes min & max values */
document.getElementById('reset-axes').onclick = function (e) {
    xAxisRangeNotSet = true
    yAxisMaximum = 0
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

/* Added trade to the table */
function addTrade(date, price, amount, type) {

    var tr = document.createElement('tr'),
        tdDate = document.createElement('td'),
        tdPrice = document.createElement('td'),
        tdAmount = document.createElement('td')

    tr.className += ' ' + type

    tr.appendChild(tdDate)
    tr.appendChild(tdPrice)
    tr.appendChild(tdAmount)
    tradeTable.prepend(tr)

    tdDate.textContent = date
    tdPrice.textContent = price
    tdAmount.textContent = amount
}

function setLastTrade(lastPrice, index) {
    document.getElementById('caption').innerHTML = lastPrice + '<br>Premium: ' + (lastPrice - index).toFixed(2)
}
