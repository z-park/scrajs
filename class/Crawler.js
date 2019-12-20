class Crawler {
  name = ""
  urls = []
  parser = null
  
  progress = {
    currentUrl: '',
    currentUrlIndex: 0,
    data: []
  }

  constructor({ name, desc }) {
    this.name = name
    this.desc = desc
  }

  setUrls( urls ) {
    this.urls = urls

    return this
  }

  setParser(fn) {
    this.parser = fn

    return this
  }

  storageData(data) {
    this.progress.data.push(data)
  }

  async parse() {
    var urls = this.urls
    var progress = this.progress
    
    for(; progress.currentUrlIndex < urls.length; progress.currentUrlIndex++) {
      var index = progress.currentUrlIndex
      
      var crawlData = await this.parser(urls[index])

      this.storageData(crawlData)
    }
  }
}


module.exports = Crawler