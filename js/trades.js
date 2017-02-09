function handleTrade(message) {
    if (message.hasOwnProperty('data')) {
        message.data.forEach(function (trade) {

            var lastPrice = parseFloat(trade[1]).toFixed(2)

            view.addTrade(
                trade[3],
                lastPrice,
                parseInt(trade[2]),
                trade[4])

            view.setLastTrade(lastPrice, index)
        })
    }
}
