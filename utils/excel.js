const XLSX = require("xlsx")
const path = require('path')
const fs = require('fs')

function excelToJson(config) {
  const isFileExists = fs.existsSync(config.src)
  if(!isFileExists) {
    console.log('excel文件不存在.')
    return false
  }
  const wb = XLSX.readFile(config.src)
  const ws = config.sheetName ? wb.Sheets[config.sheetName] : wb.Sheets[wb.SheetNames[0]]

  if(!ws) {
    console.log('没有在excel中找到对应的sheet。')
  }
  
  return XLSX.utils.sheet_to_json(ws)
}

// excelToJson({ src: './excel/骨科词条.xlsx' })
//   .then(jsonData => {
//     console.log(jsonData)
//   })

function jsonToExcel({ target, sheetName, data, merge }) {
  console.log(target)
  if(merge) {
    const isFileExists = fs.existsSync(path.resolve(__dirname, target))
    if(!isFileExists) {
      console.log('excel文件不存在,无法进行merge')
      return false
    }

    const wb = XLSX.readFile(path.resolve(__dirname, target))
    const ws = sheetName ? wb.Sheets[sheetName] : wb.Sheets[wb.SheetNames[0]]
    // XLSX.utils.sheet_add_json(ws, data)
    console.log(wb.Sheets[wb.SheetNames[0]])
    return XLSX.writeFile(wb, target)
  }
  else {
    const isFileExists = fs.existsSync(path.resolve(__dirname, target))
    if(!isFileExists) {
      fs.writeFileSync(target, '')
    }

    let wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet1')

    return XLSX.writeFile(wb, target)
  }
  
}

async function excelMapExcel(inputExcelRows, search) {
  let emptyLen = 0
  let outputExcelRows = []
  let rowIndex = 2;
  
  for(const excelRow of inputExcelRows) {
    console.log(rowIndex)
    try {
      const suggests = await search(excelRow['query'])
      if(!suggests.length) {
        emptyLen++
      }
      else {
        const excelRowsBySuggests = suggests.map(suggest => {
          let cloneRow = _.clone(excelRow)
          
          return cloneRow
        })
        // console.log(excelRowsBySuggests)
        outputExcelRows.push(...excelRowsBySuggests)
      }
    }
    catch (err) {
      console.log('发生错误')
      console.log(rowIndex, excelRow['Query'], suggests.length, suggests)
    }
    
    rowIndex++
  }
  const inputLen = inputExcelRows.length,
    outputLen = outputExcelRows.length

  let rate = {
    empty:  emptyLen / inputLen * 100,
    fission: outputLen / inputLen
  }

  return outputExcelRows
}



module.exports = {
  jsonToExcel,
  excelToJson
}
