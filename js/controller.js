view.restoreApiKeys() // from localStorage

var api = new OKCoin('com', {
    ok_sub_futureusd_btc_index: handleIndex,
    ok_sub_future_btc_depth_quarter_60: handleDepth,
    ok_sub_futureusd_btc_trade_quarter: handleTrade
}, jsDao.get('api-key'), jsDao.get('secret-key'));

api.start()
