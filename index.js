var getIntersectClientRects = require('intersect-client-rects')
var getElementClientRect = require('element-client-rect')
var getViewportPosition = require('viewport-position')
var elementInDocument = require('element-in-document')
var elementStyle = require('element-style')

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = elementVisible
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return elementVisible
    })
  } else {
    window.elementVisivle = elementVisible
  }
}

// Returns true if it is a DOM element
function isElement (o) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
}

/**
 * Finding out if the element is visible `threshold * 100`% in the viewport
 *
 * @param element {HTMLElement}
 * @param threshold {Number}
 * @returns {boolean}
 */
function elementVisible (element, threshold) {
  var currentNode = element
  var viewportRect
  var clientRect
  var clientRectArea
  var visibleClientRect
  var visibleClientRectArea
  var visibleRatio

  // Default: 100%
  threshold = +threshold || 1.0

  if (!element || !isElement(element)) {
    throw new Error('Element is mandatory')
  }

  var doc = element.ownerDocument

  if (threshold <= 0) {
    throw new Error('Threshold value must be greater than 0')
  }

  do {
    // Return false if our element is invisible
    if (elementStyle(currentNode, 'opacity') === '0' ||
      elementStyle(currentNode, 'display') === 'none' ||
      elementStyle(currentNode, 'visibility') === 'hidden') {
      return false
    }
  } while ((currentNode = currentNode.parentNode) !== document)

  // If element is actually visible in the document,
  if (elementInDocument(element, threshold)) {
    clientRect = getElementClientRect(element)
    viewportRect = getViewportPosition(doc.defaultView || doc.parentWindow)

    visibleClientRect = getIntersectClientRects(clientRect, viewportRect)

    clientRectArea = clientRect.width * clientRect.height
    visibleClientRectArea = visibleClientRect.width * visibleClientRect.height

    visibleRatio = +clientRectArea ? visibleClientRectArea / clientRectArea : 0

    return visibleRatio >= threshold
  }

  // Otherwise
  return false
}
