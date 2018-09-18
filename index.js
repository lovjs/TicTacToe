/* eslint no-unused-vars: 0 */
'use strict'

require('./setup.js') // pull in setup code, jquery etc.

var MainView = require('./views/mainView.js')
var theApp = new MainView()

theApp.render()

console.log("We're started!")
