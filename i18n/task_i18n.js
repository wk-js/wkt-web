#!/usr/bin/env node
'use strict'

const GoogleSpreadsheet = require('google-spreadsheet')
const FileUtils = require('asset-pipeline/js/utils/fs')
const { relative } = require('path')
const when = require('when')
const lift = require('when/node').lift

const excludedLocale = []
const excludedWorksheet = [/^_/]
const excludedCategory = []
const excludedKey = []

let locales = []
let dstPath = null
let sortedData = {}

function isExcluded (str, patterns) {
  for (let i = 0, l = patterns.length; i < l; i++) {
    const pattern = patterns[i]
    if (str.match(pattern)) {
      return true
    }
  }
  return false
}

function processSheet (data) {
  const worksheets = data.worksheets
  const p = []

  for (let i = 0, l = worksheets.length; i < l; i++) {
    const worksheet = worksheets[i]
    const worksheetTitle = worksheet.title
    if (isExcluded(worksheetTitle, excludedWorksheet)) {
      continue
    }

    for (let j = 0, ll = locales.length; j < ll; j++) {
      const locale = locales[j]
      if (isExcluded(locale, excludedLocale)) {
        continue
      }

      if (!sortedData[locale]) {
        sortedData[locale] = {}
        sortedData[locale].locale = locale
      }

      sortedData[locale][worksheetTitle] = {}

      const getRows = lift(worksheet.getRows)
      const promise = getRows()
        .then(data => processRows(locale, worksheetTitle, data))
      p.push(promise)
    }
  }

  return when.all(p)
}

function processRows (locale, worksheetTitle, rowsData) {
  for (let i = 0, l = rowsData.length; i < l; i++) {
    const rowData = rowsData[i]
    const category = rowData.category
    const key = rowData.key

    if (!key ||
      isExcluded(category, excludedCategory) ||
      isExcluded(key, excludedKey)
    ) {
      continue
    }

    if (!sortedData[locale][worksheetTitle][category]) {
      sortedData[locale][worksheetTitle][category] = {}
    }

    sortedData[locale][worksheetTitle][category][key] = rowData[locale]
  }
}

function writeToFile () {
  Object.keys(sortedData).forEach(locale => {
    const content = JSON.stringify(sortedData[locale], null, 2)
    FileUtils.writeFile(content, dstPath + '/' + locale + '.json')
    console.log(`File ${locale}.json written`)
  })
}

function executeLocales () {
  const Application = require('../index')
  const config = Application.config('i18n')

  locales = config.locales
  dstPath = Application.assets.root_path + '/config/locales'
  dstPath = relative(process.cwd(), dstPath)

  const sheet = new GoogleSpreadsheet(config.spreadSheetKey)
  const getInfo = lift(sheet.getInfo)

  return getInfo()
    .then(processSheet)
    .then(writeToFile)
}

task('default', { async: true }, function () {
  const Application = require('../index')
  Application
    .make()
    .then(executeLocales)
    .then(this.complete)
    .catch(this.fail)
})