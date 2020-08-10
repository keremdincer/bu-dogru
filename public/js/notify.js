function closest(el, selector) {
  var matchesFn;

  // Eğer arattığımız element kendisi ise
  if (el.tagName.toLowerCase() === selector || el.classList.contains(selector.replace('.', ''))) {
    return el
  }

  // find vendor prefix
  ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
    if (typeof document.body[fn] == 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  })

  var parent;

  // traverse parents
  while (el) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
      return parent;
    }
    el = parent;
  }

  return null;
}

var notify = {
  DOMObject: null,
  addListener: function (DOMObject) {
    if (!DOMObject) {
      DOMObject = this.DOMObject
    }
    DOMObject.addEventListener('click', function (e) {
      // notify.clear(1,e.currentTarget)
      console.log(closest(e.target, '.notify'))
    })
  },
  clear: function (duration, DOMObject) {
    setTimeout(function () {
      if (DOMObject) {
        DOMObject.classList.add('go-out')
        setTimeout(function () {
          DOMObject.parentNode.removeChild(DOMObject)
        }, 500)
      }
    }, duration || 5000)
  },
  createNotify: function (title, message, notifyType) {
    var notify = document.createElement('div')
    notify.setAttribute('id', ('alert' + this.counter))
    notify.classList.add('notify')
    notify.classList.add(notifyType)

    var pTitle = document.createElement('p')
    pTitle.innerHTML = title
    pTitle.classList.add('f-bold')
    notify.appendChild(pTitle)

    var pMessage = document.createElement('p')
    pMessage.innerHTML = message
    notify.appendChild(pMessage)
    this.counter++
    this.DOMObject = notify
    return this
  },
  information: function (title, message, duration) {
    return this.createNotify(title, message, 'information')
  },
  // Uygulamanın taşıyıcı konteynır'ı oluşturulur
  init: function () {
    var notifyBox = document.createElement('div')
    notifyBox.setAttribute('id', 'notify-box')
    notifyBox.classList.add('notify-box')
    document.body.appendChild(notifyBox)
  },
  show: function (duration) {
    if (!duration) {
      duration = 5000
    }

    this.clear(duration, this.DOMObject)

    this.addListener(this.DOMObject)

    var notifyBox = document.querySelector('#notify-box')
    notifyBox.appendChild(this.DOMObject)

    this.DOMObject = null
  },
  success: function (title, message, duration) {
    return this.createNotify(title, message, 'success')
  },
  warning: function (title, message, duration) {
    return this.createNotify(title, message, 'warning')
  },
  counter: 0
}
notify.init()