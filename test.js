/* global describe, beforeEach, afterEach, after, it,  */

var elementVisible = require('./')
var elementClientRect = require('element-client-rect')

var assert = require('assert')

describe('elementVisible', function () {
  // Mocha detects the frame id as being leaked in IE
  // ------------------------------------------------
  var userAgent = window.navigator.userAgent
  var ieDetected = (userAgent.indexOf('MSIE ') !== false ||
    !!navigator.userAgent.match(/Trident.*rv\:11\./))

  if (global.mocha && ieDetected) {
    global.mocha.globals(['getComputedStyle', 'el', 'getPropertyValue'])
  }
  // ------------------------------------------------

  function dispatchScroll (target, newScrollTop) {
    window.scroll(0, newScrollTop)
  }

  var targetNode

  beforeEach(function () {
    'use strict'

    document.body.style.position = 'relative'
    document.body.style.width = '30000px'
    document.body.style.height = '30000px'

    targetNode = document.createElement('div')
    targetNode.style.width = '250px'
    targetNode.style.height = '250px'
    targetNode.style.textAlign = 'center'
    targetNode.style.position = 'absolute'
    targetNode.style.lineHeight = targetNode.style.height
    targetNode.style.top = '10000px'
    targetNode.style.left = 0
    targetNode.style.zIndex = 20
    targetNode.innerHTML = 'Am I Viewable?'
    targetNode.style.backgroundColor = 'red'
    targetNode.style.overflow = 'hidden'

    document.body.appendChild(targetNode)

    window.scrollTo(0, 0)
  })

  afterEach(function () {
    document.body.removeChild(targetNode)
  })

  after(function () {
    document.body.style.position = 'inherit'
    document.body.style.width = 'inherit'
    document.body.style.height = 'inherit'
  })

  it('should not be viewable top of element is truncated 100%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      dispatchScroll(document.body, targetNodeRect.bottom)

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable top of element is truncated over 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      dispatchScroll(document.body, targetNodeRect.bottom - (targetNodeRect.bottom - targetNodeRect.top) * 0.4)

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable top of element is truncated under 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      dispatchScroll(document.body, targetNodeRect.bottom - (targetNodeRect.bottom - targetNodeRect.top) * 0.6)

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable bottom of element is truncated 100%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight)

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable bottom of element is truncated over 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight + (targetNodeRect.bottom - targetNodeRect.top) * 0.4)

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable bottom of element is truncated under 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight + (targetNodeRect.bottom - targetNodeRect.top) * 0.6)

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable left of element is truncated over 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      targetNode.scrollIntoView()
      targetNode.style.left = ((targetNodeRect.right - targetNodeRect.left) * -0.6) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable left of element is truncated 100%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      targetNode.scrollIntoView()
      targetNode.style.left = (targetNodeRect.left - targetNodeRect.right) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable left of element is truncated under 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      targetNode.scrollIntoView()
      targetNode.style.left = ((targetNodeRect.right - targetNodeRect.left) * -0.4) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable right of element is truncated under 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      targetNode.scrollIntoView()
      targetNode.style.left = (document.documentElement.clientWidth - (targetNodeRect.right - targetNodeRect.left) * 0.4) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable right of element is truncated 100%', function (done) {
    this.timeout(10 * 1000)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      targetNode.scrollIntoView()
      targetNode.style.left = document.documentElement.clientWidth + 'px'
      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable right of element is truncated over 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      targetNode.scrollIntoView()
      targetNode.style.left = (document.documentElement.clientWidth - (targetNodeRect.right - targetNodeRect.left) * 0.6) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable top and left of element is truncated 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.bottom - (targetNodeRect.bottom - targetNodeRect.top) * 0.5)
      targetNode.style.left = ((targetNodeRect.right - targetNodeRect.left) * -0.5) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable top and left of element is truncated 20%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.bottom - (targetNodeRect.bottom - targetNodeRect.top) * 0.8)
      targetNode.style.left = ((targetNodeRect.right - targetNodeRect.left) * -0.2) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable top and right of element is truncated 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.bottom - (targetNodeRect.bottom - targetNodeRect.top) * 0.5)
      targetNode.style.left = (document.documentElement.clientWidth - (targetNodeRect.right - targetNodeRect.left) * 0.5) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable top and right of element is truncated 20%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.bottom - (targetNodeRect.bottom - targetNodeRect.top) * 0.8)
      targetNode.style.left = (document.documentElement.clientWidth - (targetNodeRect.right - targetNodeRect.left) * 0.8) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable bottom and left of element is truncated 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight + (targetNodeRect.bottom - targetNodeRect.top) * 0.5)
      targetNode.style.left = ((targetNodeRect.right - targetNodeRect.left) * -0.5) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable bottom and left of element is truncated 20%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight + (targetNodeRect.bottom - targetNodeRect.top) * 0.8)
      targetNode.style.left = ((targetNodeRect.right - targetNodeRect.left) * -0.2) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable bottom and right of element is truncated 50%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight + (targetNodeRect.bottom - targetNodeRect.top) * 0.5)
      targetNode.style.left = (document.documentElement.clientWidth - (targetNodeRect.right - targetNodeRect.left) * 0.5) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should be viewable bottom and left of element is truncated 20%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight + (targetNodeRect.bottom - targetNodeRect.top) * 0.8)
      targetNode.style.left = (document.documentElement.clientWidth - (targetNodeRect.right - targetNodeRect.left) * 0.8) + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), true)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })

  it('should not be viewable bottom and right of element is truncated 100%', function (done) {
    this.timeout(10 * 1000)

    var targetNodeRect = elementClientRect(targetNode)

    setTimeout(function () {
      targetNode.style.position = 'absolute'
      dispatchScroll(document.body, targetNodeRect.top - document.documentElement.clientHeight)
      targetNode.style.left = document.documentElement.clientWidth + 'px'

      setTimeout(function () {
        'use strict'
        try {
          assert.equal(elementVisible(targetNode, 0.5), false)
          done()
        } catch (e) {
          done(e)
        }
      }, 1500)
    }, 1000)
  })
})
