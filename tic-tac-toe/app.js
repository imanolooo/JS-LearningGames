document.addEventListener('DOMContentLoaded',() => {
  //li diem que tot .grid div seran squares
  const squares = document.querySelectorAll('.grid div')
  //assignem id player a playerDisplay
  const playerDisplay = document.querySelector('#player')

  //definim el jugador inicial
  let currentPlayer = 'playerX'

  //posem per a cada square un listener, de manera que si fan click cridara a la funció clickOutcome
  squares.forEach(square => {
    square.addEventListener('click', clickOutcome)
  })

  //definim la funció clickOutcome
  function clickOutcome(e) {
    //mostrar un missatge de que s'ha clickat
    //alert('Clicked!')
    //esbrinar quina square s'ha clickat
    const squareArray = Array.from(squares)//creem un Array
    const index = squareArray.indexOf(e.target)//preguntem l'index
    //console.log(index)//ho imprimim a la consola
    //fem que el que tingui id=player pinti el nom del player actual
    playerDisplay.innerHTML = currentPlayer

    if(currentPlayer === 'playerX'){
      squares[index].classList.add('playerX')//assignem a l'square la class playerX i al css fem que aparegui la imatge
      currentPlayer = 'player0'
    } else {
      squares[index].classList.add('playerO')//assignem a l'square la class playerO i al css fem que aparegui la imatge
      currentPlayer = 'playerX'
    }
  }

})
