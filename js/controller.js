view.restoreApiKeys() // from localStorage

new OKCoin('wss://real.okex.com:10441/websocket')
.addChannelHandler('ok_sub_futureusd_btc_index', handleIndex)
.addChannelHandler('ok_sub_future_btc_depth_quarter_60', handleDepth)
.addChannelHandler('ok_sub_futureusd_btc_trade_quarter', handleTrade)
.setPrivateKeys(jsDao.get('api-key'), jsDao.get('secret-key'))
.start()
