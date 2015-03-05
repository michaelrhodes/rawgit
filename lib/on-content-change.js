module.exports = function (target, fn) {
  document.readyState !== 'complete' ?
    addEventListener('load', watch.bind(null, fn)) :
    watch(fn)

  function watch (fn) {
    fn()

    if (target) {
      new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
          if (m.type === 'childList' && m.addedNodes.length) {
            fn()
          }
        })
      })
      .observe(target, {
        attributes: false,
        childList: true,
        characterData: false
      })
    }
  }
}
