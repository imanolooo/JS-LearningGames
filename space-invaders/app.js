document.addEventListener('DOMContentLoaded', ()=> {//per a que s'executi al carregar la pàgina
  const squares = document.querySelectorAll('.grid div')//sel·lecciona tots els div de class grid
  const resultDisplay = document.querySelector('#result')//selecciona el primer element and id result que troba
  let width = 15
  let currentShooterIndex = 202
  let currentInvaderIndex = 0
  let alienInvadersTakenDown = []
  let result = 0
  let direction = 1
  let invaderId

  //define the alien Invaders
  const alienInvaders = [//son els índexos a les posicions dels aliens a la grid
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
  ]

  //de l'array de squares (posicions de la grid), els hi posa class invader per a que es vegin com invaders
  alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))

  //marquem una square coma a shooter posant-li class shooter al div
  squares[currentShooterIndex].classList.add('shooter')

  //move shooter along a line
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')//eliminem la class shooter de la casella actual
    switch (e.keyCode) {//mirem quina tecla s'ha pres
      case 37:
        if(currentShooterIndex % width !== 0) currentShooterIndex -= 1//comprovem que no surti del límit
        break;
      case 39:
        if(currentShooterIndex % width < width - 1) currentShooterIndex += 1//comprovem que no surti del límit
        break;
    }
    //marquem la nova casella com a shooter
    squares[currentShooterIndex].classList.add('shooter')
  }
  //asignem la funció a quan es prem una tecla
  document.addEventListener('keydown', moveShooter)

  //move the alien Invaders
  function moveInvaders() {
    //comprovem si estem a un dels extrems
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1

    //mirem cap a on s'ha de moure
    if((leftEdge && direction === -1) || (rightEdge && direction === 1)){//si estem a algun dels límits esquerre o dret
      direction = width//afegim 15 posicions per a que baixi una línia
    } else if (direction === width){//si ja ha baixat, mirem de quin cantó està per asignar el nou moviment
      if(leftEdge) direction =1
      else direction =-1
    }

    //recorrem l'array per treure l'etiqueta de invaders a les cel·les del grid
    for(let i = 0; i <= alienInvaders.length -1; i++){
      squares[alienInvaders[i]].classList.remove('invader')
    }
    //recorrem l'array per treure moure els aliens
    for(let i = 0; i <= alienInvaders.length -1; i++){
      alienInvaders[i] += direction
    }
    //recorrem l'array per posar l'etiqueta de invaders a les cel·les del grid
    //si no esta inclos en la llista de matats
    for(let i = 0; i <= alienInvaders.length -1; i++){
      if(!alienInvadersTakenDown.includes(i))
      {
        squares[alienInvaders[i]].classList.add('invader')
      }
    }

    //decide if the game is over
    //si els aliens arriban al shooter, ho comprovem si té les dues etiquetes
    if(squares[currentShooterIndex].classList.contains('invader','shooter')) {
      resultDisplay.textContent = 'Game Over'//diem que s'ha acabat el joc
      squares[currentShooterIndex].classList.add('boom')//posem el shooter a explotat
      clearInterval(invaderId)//aturem el temps
    }
    //comprovem també si els aliens han arribat al final de la pantalla, per dir que s'ha acabat el joc
    for(let i = 0; i <= alienInvaders.length -1; i++){
      if(alienInvaders[i] > (squares.length - (width-1))){
        resultDisplay.textContent = 'Game Over'//diem que s'ha acabat el joc
        clearInterval(invaderId)//aturem el temps
      }
    }

    //decide a win
    if(alienInvadersTakenDown.length === alienInvaders.length){
      resultDisplay.textConent = 'You win!'
      clearInterval(invaderId)
    }
  }

  //asignem que els aliens es moguin cada 500ms
  invaderId = setInterval(moveInvaders,500)

  //shoot at aliens
  function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    //move the laser from the shooter to the alien invader
    function moveLaser() {
      //treiem la class de laser
      squares[currentLaserIndex].classList.remove('laser')
      //movem la posició del laser
      currentLaserIndex -= width
      //posem la class de laser
      squares[currentLaserIndex].classList.add('laser')
      //comprovem si el laser esta tocant un alien
      if(squares[currentLaserIndex].classList.contains('invader'))
      {
        squares[currentLaserIndex].classList.remove('laser')//esborrem el laser
        squares[currentLaserIndex].classList.remove('invader')//esborrem el alien
        squares[currentLaserIndex].classList.add('boom')//afegim el boom

        //() => Indica funcio
        //(argument) => code
        //és eqivalent a: function(argument) {code}
        //fem que el boom desaparegui en 250ms
        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),250)
        clearInterval(laserId)//aturem el moviment del laser

        //afegim l'alien a la llista de matats
        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
        alienInvadersTakenDown.push(alienTakenDown)
        result++
        resultDisplay.textContent = result
      }

      //esborrar el laser quan es surt per adatl
      if(currentLaserIndex < width){
        clearInterval(laserId)
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'),100)
      }
    }

    //fem que es moguin cada 100 ms un cop deixem anar la barra d'espais
    switch (e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser,100)
        break;
    }
  }
  //fem que es disparin lasers quan deixem anar la barra d'espais
  document.addEventListener('keyup', shoot)

})
