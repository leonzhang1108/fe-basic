function Listener() {
  var events = {}
  this.on = function(listener, cb) {
    if (!events[listener]) events[listener] = [];
    if(events[listener].filter(l => l == cb).length == 0){
      events[listener].push(cb)
    }
  }
  this.off = function(listener, cb) {
    if(!events[listener]) return
    if(cb) {
      var index = 0
      events[listener].forEach((item, i) => {
        if(item == cb) index = i
      })
      events[listener].shift(index)
    } else {
      events[listener] = []
    }
  }
  this.trigger = function(listener) {
    if (listener && events[listener] && events[listener].length > 0) {
      events[listener].forEach(item => item())
    }
  }
}

//use example

var leon = new Listener()
var leonfun1 = () => console.log('fun1')
var leonfun2 = () => console.log('fun2')
leon.on('test', leonfun1)
leon.on('test', leonfun2)
leon.trigger('test')
leon.off('test', leonfun1)
leon.trigger('test')
leon.off('test')
leon.trigger()