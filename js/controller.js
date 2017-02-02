restoreKeys()

var api = new OKCoin('com', getStoredValue('api-key'), getStoredValue('secret-key'), {
    ok_sub_futureusd_btc_index: handleIndex,
    ok_sub_futureusd_btc_depth_quarter_60: handleDepth,
    ok_sub_futureusd_btc_trade_quarter: handleTrade,
});

api.start()
