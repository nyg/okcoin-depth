view.restoreApiKeys() // from localStorage

new OKCoin()
.setChannels({
    ok_sub_futureusd_btc_index: handleIndex,
    ok_sub_future_btc_depth_quarter_60: handleDepth,
    ok_sub_futureusd_btc_trade_quarter: handleTrade
})
.setPrivateKeys(jsDao.get('api-key'), jsDao.get('secret-key'))
.isFutures()
.start()
