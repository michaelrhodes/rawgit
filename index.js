var pageload = require('./lib/on-content-change')

var $ = document.querySelectorAll.bind(document)
var slice = Array.prototype.slice
var rawgit = 'https://rawgit.com'

var container = (
  $('#js-repo-pjax-container')[0] ||
  $('#js-pjax-container')[0]
)

pageload(container, function () {
  var buttons
  if (!(buttons = $('#raw-url'))[0]) {
    buttons = $('a[aria-label="View Raw"]')
  }

  slice.call(buttons)
    .filter(untouched)
    .forEach(function (button) {
      var path = button.getAttribute('href')

      // Safely remove the “raw” url segment
      // for non-gist files. Not using a regex
      // to avoid potentionally messing with
      // repositories or users named “raw”.
      if (!/gist/.test(location.host)) {
        var segments = path.split('/')
        if (segments[3] === 'raw') {
          var end = segments.splice(4)
          var start = segments.splice(0, 3)
          path = start.concat(end).join('/')
        }
      }

      button.setAttribute('data-rawgit', true)
      button.setAttribute('href', rawgit + path)
    })
})

function untouched (button) {
  return !button.getAttribute('data-rawgit')
}
