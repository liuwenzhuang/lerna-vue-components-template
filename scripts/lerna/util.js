'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const { mergeWith, isObject, isArray } = require('lodash')

function copyFile(source, dist, transform) {
  fs.readFile(path.resolve(source), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let result = data
    if (typeof transform === 'function') {
      result = transform.call(null, data)
    }
    fs.writeFile(dist, result, (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`copy from ${source} to ${dist} done`)
    })
  })
}

function editPackageJson(source, data) {
  const packageInfo = require(source)
  const modifyInfo = mergeWith(packageInfo, data, (objValue, srcValue) => {
    if (isArray(srcValue)) {
      return srcValue
    }
    if (isObject(srcValue)) {
      return {
        ...objValue,
        ...srcValue,
      }
    }
  })
  console.log(JSON.stringify(modifyInfo, null, 2))
  fs.writeFile(`${source}`, JSON.stringify(modifyInfo, null, 2), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(`rewrite ${source} done`)
  })
}

function clearDir(dir) {
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) {
    console.error(`${dir} is not directory`)
    return
  }
  try {
    rimraf.sync(dir)
    console.log(`delete ${dir} succeed, rebuild ${dir}...`)
    fs.mkdirSync(dir)
  } catch (err) {
    console.error(`clear ${dir} failed, you can clear later`)
  }
}

exports.copyFile = copyFile
exports.editPackageJson = editPackageJson
exports.clearDir = clearDir
