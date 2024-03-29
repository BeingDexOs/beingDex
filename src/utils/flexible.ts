export function flexible(window: any, document: any) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    // if (docEl.clientWidth < 1280 && docEl.clientWidth >= 768) {
    //   docEl.style.fontSize = '128px'
    // } else if (docEl.clientWidth < 768) {
    //   docEl.style.fontSize = '76.8px'
    // } else {
    //   docEl.style.fontSize = rem + 'px'
    // }
    if (docEl.clientWidth < 1280) {
      docEl.style.fontSize = '128px'
    } else {
      docEl.style.fontSize = rem + 'px'
    }
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e: any) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}
