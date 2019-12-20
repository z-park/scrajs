const request = require('request-promise')
const cheerio = require('cheerio')
const logger = require('./logger')

const Crawler = require('./class/Crawler')
const { excelToJson, jsonToExcel } = require('./utils/excel')

async function getKeywordFisson(keyword) {
  var url = `https://m.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=wise&from=wise_web&net=1&os=&sp=240&wd=${ encodeURIComponent(keyword) }&lid=0845925220&_=1576718051053`

  return request(url)
    .then(res => {
      return JSON.parse(res).g.map(item => { return { '标题': item.q } })
    })
    .catch(res => {
      return []
    })
}

module.exports = async function() {
  // var urls = []

  // var crawler1 = new Crawler({
  //   name: '百度问答'
  // })
  
  var excel = excelToJson({
    src: './quene/健康之路-疾病分类v2.xlsx'
  })
  
  var exportExcel = []

  var fissonKeywords = await getKeywordFisson('测试')
  
  for(let item of excel) {
    console.log(item)
    const keyword = item['标题']
    var fissonKeywords = await getKeywordFisson(keyword)
    console.log(fissonKeywords.length)
    exportExcel.push(...fissonKeywords)
  }

  jsonToExcel({
    data: exportExcel,
    target: './quene/百度分裂标题.xlsx'
  })
  
  crawler1
    .setUrls(urls)
    .setParser(function(url) {
      return request(url)
        .then(responseBody => {
          // 去除冗余jsonp信息
          var data = JSON.parse(responseBody)
          
          var items = data["Result"][0]["DisplayData"]["resultData"]["tplData"]["result"]["extend_data"]["content"]
          console.log(items)
          // logger.info(data)
          logger.info(items)
        })
    })
    .parse()
}

