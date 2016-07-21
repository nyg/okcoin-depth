var groupingUnit = 0.5,
    volumeInContracts = true,
    cumulatedVolume = false,
    xAxisRangeNotSet = true,
    chart = Highcharts.chart('chart', {
        title: null,
        chart: {
            type: 'column'
        },
        tooltip: {
            enabled: false
        },
        yAxis: {
            title: {
                text: 'Contracts'
            },
            labels: {
                format: '{value}'
            }
        },
        plotOptions: {
            column: {
                grouping: false,
                groupPadding: 0
            }
        },
        series: [
            { id: 'bids', name: 'Bids', color: '#27ae60' },
            { id: 'asks', name: 'Asks', color: '#e74c3c' }
        ]
    })

function setXAxisRange(min, max) {
    chart.xAxis[0].setExtremes(min, max)
}

function setTickInterval(interval) {
    chart.xAxis[0].options.tickInterval = parseFloat(interval)
}

function setData(bids, asks) {
    chart.get('bids').setData(bids)
    chart.get('asks').setData(asks)
}
