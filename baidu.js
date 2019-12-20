
const request = require('request-promise')

function baiduList(keyword) {
  `https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?srcid=5243&resource_id=5243&appid=4124&dspName=iphone&dsp=iphone&alr=1&new_need_di=1&query=${encodeURIComponent(keyword)}&pn=100&rn=100`

  return request(url)
    .then(responseBody => {
      // 去除冗余jsonp信息
      var data = JSON.parse(responseBody)
      
      logger.info(data["Result"][0]["DisplayData"]["resultData"]["tplData"]["result"]["extend_data"]["content"])
    })
}

module.exports = baiduList