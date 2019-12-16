const request = require('request-promise')
const cheerio = require('cheerio')

module.exports = async function() {
  const urls = ['https://m.baidu.com/from=1020854c/s?word=%E6%84%9F%E5%86%92%E6%80%8E%E5%8A%9E&sa=tb&ts=3263217&t_kt=0&ie=utf-8&rsv_t=3fe8Rqhx58Q%252Fy6HEziO6OWDaKfQLcShEQxCPzHJ4Ws%252FfjjljUwC1j7KK2MLkFh8&rsv_pq=10806536131722648538&ss=111000000001&sugid=2652564302662803585&tj=1&rqlang=zh&rsv_sug4=4225&inputT=3011&oq=%E4%BB%8A%E6%97%A5%E6%96%B0%E9%B2%9C%E4%BA%8B']

  for(let url of urls) {
    
  }

  var crawler = new Crawler()

  crawler
    .setUrls()
    .parse()
}

