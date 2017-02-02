var groupingUnit = .5,
    volumeInContracts = true,
    cumulatedVolume = false,
    xAxisRangeSet = false,
    yAxisMaximum = 0,
    chart = Highcharts.chart('chart', {
        title: null,
        chart: {
            animation: false,
            type: 'column',
            spacingTop: 25,
            spacingBottom: 10
        },
        credits: {
            enabled: false
        },
        tooltip: {
            animation: false,
            hideDelay: 200
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
                groupPadding: 0,
                pointPadding: 0
            },
            series: {
                states: {
                    hover: {
                        enabled: false,
                    }
                }
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

function updateYAxisMaximum() {
    chart.yAxis[0].setExtremes(0, yAxisMaximum)
}

function setTickInterval(interval) {
    chart.xAxis[0].options.tickInterval = parseFloat(interval)
}

function setData(bids, asks) {
    chart.get('bids').setData(bids)
    chart.get('asks').setData(asks)
}
