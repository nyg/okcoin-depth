var view = (function () {

    var view = {}

    /* Restore in the UI the API keys stored in localStorage */
    view.restoreApiKeys = function () {
        ['api-key', 'secret-key'].forEach(function (e) {
            id(e).value = jsDao.get(e, '')
        })
    }

    /* Add trade to the table */
    view.addTrade = function (date, price, amount, type) {

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

    /* Set last trade price and premium compared to index */
    view.setLastTrade = function (lastPrice, index) {
        id('caption').innerHTML = lastPrice + '<br>Premium: ' + (lastPrice - index).toFixed(2)
    }

    function id(elementId) {
        return document.getElementById(elementId)
    }

    /* API Key */
    ['api-key', 'secret-key'].forEach(function (e) {
        id(e).onchange = function (event) {
            storeValue(e, event.target.value)
        }
    })

    /* Reset axes min & max values */
    id('reset-axes').onclick = function (e) {
        xAxisRangeSet = false
        yAxisMaximum = 0
    }

    /* Grouping unit */
    id('grouping-unit').value = groupingUnit
    id('grouping-unit').onchange = function (e) {
        groupingUnit = parseFloat(e.target.value)
    }

    /* Volume unit */
    id('volume-contracts').checked = volumeInContracts
    id('volume-contracts').onchange = function (e) {
        volumeInContracts = e.target.checked
    }

    id('volume-btc').checked = !volumeInContracts
    id('volume-btc').onchange = function (e) {
        volumeInContracts = !e.target.checked
    }

    /* Cumulated volume */
    id('cumulated-volume').checked = cumulatedVolume
    id('cumulated-volume').onchange = function (e) {
        cumulatedVolume = e.target.checked
    }

    return view
})()
