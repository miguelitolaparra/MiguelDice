const levels = 12
let keys = generateKeys(levels)

function nextLevel(currentLevel) {
  if (currentLevel == levels) {
    return swal({
      title: '¡¡Felicidades. Has ganado...!!',
      tipe: 'success',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      closeOnConfirm: true
    })
  }

  swal ({
    timer:1000,
    title:`Nivel ${currentLevel + 1} / ${levels}`,
    showConfirmButton: false
  })


  for (let i = 0; i <= currentLevel; i++) {
    setTimeout(() => activate(keys[i]), 1000 * (i + 1) + 1000)
  }

  let i = 0
  let currentKey = keys[i]
  window.addEventListener('keydown', onkeydown)

  function onkeydown(e) {
    if (e.keyCode == currentKey) {
      activate(currentKey, { success: true })
      i++
      if (i > currentLevel) {
        window.removeEventListener('keydown', onkeydown)
        setTimeout(() => nextLevel(i), 1500)
      }
      currentKey = keys [i]
    }else {
      activate (e.keyCode, {fail: true})
      window.removeEventListener('keydown', onkeydown)
      swal ({
        title:`Has perdido...!!`,
        text: '¿Quieres jugar otra partida?',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        closeOnConfirm: true
      }, function (ok) {
        if (ok) {
          keys = generateKeys(levels)
          nextLevel(0)
        }

      })

    }
  }
}

nextLevel(0)

function generateKeys(levels) {
  return new Array(levels).fill(0).map(generarTeclaAzar)
}

function generarTeclaAzar() {
  const min = 65
  const max = 90
  return Math.round(Math.random() * (max - min) + min)
}

function getElementByKeyCode(keyCode) {
  return document.querySelector(`[data-key = "${keyCode}"]`)
}

function activate(keyCode, options = {}) {
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')
  if (options.success == true) {
    el.classList.add('success')
  } else if (options.fail) {
    el.classList.add('fail')
  }
  setTimeout(() => deactivate(el), 1000)
}

function deactivate(el) {
  el.className = 'key'
}










/////////////////////////////////////////

/*const niveles = 15
let teclas = generateKeys(niveles)

function generateKeys(niveles) {
  return new Array(niveles).fill(0).map(generarTeclaAleatoria)
}

function generarTeclaAleatoria() {
  const min = 65
  const max = 90
  return Math.round(Math.random() * (max - min) + min)
}

function getElementByKeyCode(keyCode) {
  return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = {}) {
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')
  if (opts.success) {
    el.classList.add('success')
  } else if (opts.fail) {
    el.classList.add('fail')
  }
  setTimeout(() => deactivate(el), 500)
}

function deactivate(el) {
  el.className = 'key'
}*/