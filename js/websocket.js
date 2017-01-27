var index = 0, // future index
    tradeTable = document.getElementById('trades')

function handleIndex(message) {
    if (message.hasOwnProperty('data')) {
        index = parseFloat(message.data.futureIndex)
    }
}

function handleDepth(message) {

    if (message.hasOwnProperty('data')) {

        var bids = message.data.bids,
            asks = message.data.asks,
            groupedBids = [],
            groupedAsks = []

        //updateTimestamp(message.data.timestamp)
        sortAsc(bids)
        sortAsc(asks)

        if (groupingUnit != 0) {
            group(bids, groupedBids)
            group(asks, groupedAsks)

            if (isVolumeDifferent(bids, groupedBids) || isVolumeDifferent(asks, groupedAsks)) {
                console.log('Houston, we have a problem!')
            }
        }
        else {
            groupedBids = bids
            groupedAsks = asks
        }

        if (cumulatedVolume) {
            accum(groupedBids, true)
            accum(groupedAsks)
        }

        if (!xAxisRangeSet) {
            xAxisRangeSet = true
            setXAxisRange(groupedBids[0][0] - 3, last(groupedAsks)[0] + 3)
        }

        var max = Math.max(maxVolume(groupedBids), maxVolume(groupedAsks))
        if (max > yAxisMaximum) {
            yAxisMaximum = max
            updateYAxisMaximum()
        }

        setTickInterval(groupingUnit)
        setData(groupedBids, groupedAsks)
    }
}

function handleTrade(message) {
    if (message.hasOwnProperty('data')) {
        message.data.forEach(function (trade) {

            var lastPrice = parseFloat(trade[1]).toFixed(2)

            addTrade(
                trade[3],
                lastPrice,
                parseInt(trade[2]),
                trade[4])

            setLastTrade(lastPrice, index)
        })
    }
}

var api = new OKCoin('com', {
    ok_sub_futureusd_btc_index: handleIndex,
    ok_sub_futureusd_btc_depth_quarter_60: handleDepth,
    ok_sub_futureusd_btc_trade_quarter: handleTrade
}).start()

/*
var api = new OKCoin('cn', {
    ok_sub_spotcny_btc_depth_60: handleDepth
}).start()
*/

function group(from, into) {

    var j = 0, volume
    for (var i = floor(from[0][0], groupingUnit); i <= floor(last(from)[0], groupingUnit); i += groupingUnit) {

        volume = 0
        while (j < from.length && floor(from[j][0], groupingUnit) == parseFloat(i.toFixed(2))) {
            volume += toVolume(from[j][1])
            j++
        }

        into.push([parseFloat(i.toFixed(2)), volume])
    }
}

function accum(array, reverse) {

    reverse = typeof reverse !== 'undefined' ? reverse : false;

    var start = reverse ? array.length - 2 : 1,
        end = reverse ? -1 : array.length,
        step = reverse ? -1 : 1

    for (var i = start; reverse ? i > end : i < end; i += step) {
        array[i][1] += array[i - step][1]
    }
}

function maxVolume(array) {

    var max = 0, i = 0
    for (i = 0; i < array.length; ++i) {
        if (array[i][1] > max) {
            max = array[i][1]
        }
    }

    return max
}

function toVolume(contracts) {
    return volumeInContracts ? contracts : (100 * contracts / index)
}

function isVolumeDifferent(a, b) {
    return sum(a) != sum(b)
}

function sum(a) {
    var sum = 0
    for (var i = 0; i < a.length; i++) {
        sum += a[i][1]
    }
}

function sortAsc(array) {
    array.sort(function (a, b) {
        return a[0] - b[0]
    })
}
