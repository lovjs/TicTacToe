'use strict'

var Backbone = require('backbone')
var counter = 0
var win = false
var SmallThing = Backbone.Model.extend({
  defaults: {
    value: ''
  }
})

var ThingCollection = Backbone.Collection.extend({
  model: SmallThing
})

var things = new ThingCollection([
  {id: 0, value: '&nbsp;'},
  {id: 1, value: '&nbsp;'},
  {id: 2, value: '&nbsp;'},
  {id: 3, value: '&nbsp;'},
  {id: 4, value: '&nbsp;'},
  {id: 5, value: '&nbsp;'},
  {id: 6, value: '&nbsp;'},
  {id: 7, value: '&nbsp;'},
  {id: 8, value: '&nbsp;'}
])

 var BigView = Backbone.View.extend({
  doAlert: function (aSmallView) {
    $('#log').append('<p>I got a value: ' + aSmallView.model.get('value') + '</p>')
    if(this.collection.get(0).get('value') == 'X' && this.collection.get(1).get('value') == 'X' && this.collection.get(2).get('value') == 'X') win = true
    if(this.collection.get(3).get('value') == 'X' && this.collection.get(4).get('value') == 'X' && this.collection.get(5).get('value') == 'X') win = true
    if(this.collection.get(6).get('value') == 'X' && this.collection.get(7).get('value') == 'X' && this.collection.get(8).get('value') == 'X') win = true
    if(this.collection.get(0).get('value') == 'X' && this.collection.get(3).get('value') == 'X' && this.collection.get(6).get('value') == 'X') win = true
    if(this.collection.get(1).get('value') == 'X' && this.collection.get(4).get('value') == 'X' && this.collection.get(7).get('value') == 'X') win = true
    if(this.collection.get(2).get('value') == 'X' && this.collection.get(5).get('value') == 'X' && this.collection.get(8).get('value') == 'X') win = true
    if(this.collection.get(0).get('value') == 'X' && this.collection.get(4).get('value') == 'X' && this.collection.get(8).get('value') == 'X') win = true
    if(this.collection.get(2).get('value') == 'X' && this.collection.get(4).get('value') == 'X' && this.collection.get(6).get('value') == 'X') win = true
    if(this.collection.get(0).get('value') == 'O' && this.collection.get(1).get('value') == 'O' && this.collection.get(2).get('value') == 'O') win = true
    if(this.collection.get(3).get('value') == 'O' && this.collection.get(4).get('value') == 'O' && this.collection.get(5).get('value') == 'O') win = true
    if(this.collection.get(6).get('value') == 'O' && this.collection.get(7).get('value') == 'O' && this.collection.get(8).get('value') == 'O') win = true
    if(this.collection.get(0).get('value') == 'O' && this.collection.get(3).get('value') == 'O' && this.collection.get(6).get('value') == 'O') win = true
    if(this.collection.get(1).get('value') == 'O' && this.collection.get(4).get('value') == 'O' && this.collection.get(7).get('value') == 'O') win = true
    if(this.collection.get(2).get('value') == 'O' && this.collection.get(5).get('value') == 'O' && this.collection.get(8).get('value') == 'O') win = true
    if(this.collection.get(0).get('value') == 'O' && this.collection.get(4).get('value') == 'O' && this.collection.get(8).get('value') == 'O') win = true
    if(this.collection.get(2).get('value') == 'O' && this.collection.get(4).get('value') == 'O' && this.collection.get(6).get('value') == 'O') win = true
    if (win) {
      var val=''
      if (counter==0) {
        val = 'X'
      } else (
        val = 'O'
      )
      $("#WinMes").html(val + " WINS")
    }
  },
  el:$('#tictacapp'),
  initialize: function() {
    this.collection = things
  },
  template: require('../templates/main.html'),
  render: function () {
    this.$el.html(this.template()) // get the table structure in place
    var that = this                  // save "this" in a closure var called 'that'
    this.collection.each(function (anItem) {
      var viewEl = that.$('#cell' + anItem.get('id'))
      var aSmallView = new SmallView({model: anItem, bigView: that, el: viewEl})
      aSmallView.render()
      //if(this.collection.[0] == 'X') win = true
    })
    return this
  }
})

//var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

var SmallView = Backbone.View.extend({
  template: _.template('<%= value %>'),
  initialize: function (options) {
    this.bigView = options.bigView
  },
  events: {
    'click': 'handleClick'
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()))
    return this
  },
  handleClick: function (target) {
    if(counter > 1) counter = 0
    console.log('I been clicked, wow')
    this.$el.toggleClass('hit') // turn the class off and on
    if(this.model.get('value') == 'X' || this.model.get('value') == 'O') return
    if(counter == 0) this.model.set('value', 'X')
    else this.model.set('value', 'O')
    this.render()
    this.bigView.doAlert(this)  // notify the "bigView"
    counter ++
  }
})

module.exports = BigView
