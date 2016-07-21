var index = 0 // future index

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

        updateTimestamp(message.data.timestamp)
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

        if (xAxisRangeNotSet) {
            xAxisRangeNotSet = false
            setXAxisRange(groupedBids[0][0] - 3, last(groupedAsks)[0] + 3)
        }

        setTickInterval(groupingUnit)
        setData(groupedBids, groupedAsks)
    }
}

var api = new OKCoin('com', {
    ok_sub_futureusd_btc_index: handleIndex,
    ok_sub_futureusd_btc_depth_quarter_60: handleDepth
}).start()

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
