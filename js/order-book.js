var index = 0, // future index
    tradeTable = document.getElementById('trades')

function handleIndex(message) {
    if (message.hasOwnProperty('data')) {
        index = parseFloat(message.data.futureIndex)
    }
}

function handleDepth(message) {

    var bids = clean(message.data.bids),
        asks = clean(message.data.asks),
        groupedBids = [],
        groupedAsks = []

    if (groupingUnit > 0) {
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

// parse numbers, remove useless data, reverse order
function clean(array) {

    var cleaned = [],
        volumeIndex = volumeInContracts ? 1 : 2,
        parseVolume = volumeInContracts ? parseInt : parseFloat

    for (var i = array.length - 1, j = 0; i >= 0; --i, ++j) {
        cleaned[j] = [ parseFloat(array[i][0]), parseVolume(array[i][volumeIndex]) ]
    }

    return cleaned
}

function group(from, into) {

    var j = 0, volume
    for (var i = floor(from[0][0], groupingUnit); i <= floor(last(from)[0], groupingUnit); i += groupingUnit) {

        volume = 0
        while (j < from.length && floor(from[j][0], groupingUnit) == parseFloat(i.toFixed(2))) {
            volume += from[j][1]
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

function isVolumeDifferent(a, b) {
    return sum(a) != sum(b)
}

function sum(a) {
    var sum = 0
    for (var i = 0; i < a.length; i++) {
        sum += a[i][1]
    }
}

function floor(number, unit) {
    return parseFloat((Math.floor(number / unit) * unit).toFixed(2))
}

function last(array) {
    return array[array.length - 1]
}
