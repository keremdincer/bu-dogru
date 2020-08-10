var markdownEditor = document.querySelector('#markdown')
var outputArea = document.querySelector('#output')

document.querySelector('#toggle-code').addEventListener('click', function () {
  document.querySelector('#markdown-editor').classList.toggle('hidden')
})

window.addEventListener(
  'keydown',
  function (e) {
    if (
      (window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) &&
      e.keyCode == 83
    ) {
      e.preventDefault()
      axios.put('', { content: markdownEditor.value }).then(function (e) {
        console.log('success', e)
        notify.success('','Kayıt Başarılı').show()
      })
    }

    if (e.keyCode === 113) {
      document.querySelector('#markdown-editor').classList.toggle('hidden')
    }
  },
  false
)

markdownEditor.addEventListener('input', function (event) {
  outputArea.innerHTML = marked(event.target.value)
  _.each(document.querySelectorAll('pre code'), function (code) {
    Prism.highlightElement(code)
  })
})

outputArea.innerHTML = marked(markdownEditor.value)
