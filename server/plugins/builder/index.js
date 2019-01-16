const path = require('path')
const Model = require('digital-form-builder-engine/model')
const { ordnanceSurveyKey } = require('../../config')
const { getState, mergeState } = require('../../db')
const dataFilePath = path.join(__dirname, '../../iws.json')
const data = require(dataFilePath)
const relativeTo = __dirname
const defaultPageController = './pages'

const model = new Model(data, {
  getState,
  mergeState,
  relativeTo,
  defaultPageController
})

module.exports = [{
  plugin: require('digital-form-builder-engine'),
  options: { model, ordnanceSurveyKey }
}, {
  plugin: require('digital-form-builder-designer'),
  options: { path: dataFilePath }
}]
