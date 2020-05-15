document.addEventListener('DOMContentLoaded', () => {
//tot el js s'executarà quan la web estigui carregada: https://developer.mozilla.org/es/docs/Web/Events/DOMContentLoaded

  //card options
  const cardArray=[
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'icecream',
      img: 'images/icecream.png'
    },
    {
      name: 'icecream',
      img: 'images/icecream.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
  ]

  //ordenem de manera aleatoria l'array de cartes
  cardArray.sort(() => 0.5 - Math.random())

  //així podem sel·leccionar els elements del html
  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  var cardsChosen = []//array de noms
  var cardsChosenId = []//array de id's
  var cardsWon = [] //array de cartes acertades

  //crearem la taula de joc
  //let es block-scoped i var es function-scoped https://www.geeksforgeeks.org/difference-between-var-and-let-in-javascript/
  function createBoard() {
    for(let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img')//creem un element html images
      card.setAttribute('src', 'images/blank.png')//asignem la imatge font
      card.setAttribute('data-id',i) //li assignem un identificador per saber quina és
      card.addEventListener('click',flipCard)//li assignem una accio al interactuar fent un click
      grid.appendChild(card)//ho afegim a l'element grid, que és un div
    }
  }

  //check for matches
  function checkForMatch() {
    var cards = document.querySelectorAll('img')//selecciona tots els elements imatge del html
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if(cardsChosen[0] === cardsChosen[1]){
      //avisem
      alert('You found a match')
      //les posem en blanc
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')
      //les guardem a l'array de trobades
      cardsWon.push(cardsChosen)
    } else {
      //les tornem a blanc
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry, try again')
    }
    //buidem els array de cartes
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length //Actualitzem el marcador amb les cartes acertades
    if(cardsWon.length === cardArray.length/2)//si ja les ha acertat totes el felicitem
    {
      resultDisplay.textContent = 'Congratulations! You found them all!'
    }
  }

  //flip your card
  function flipCard() {
    var cardId = this.getAttribute('data-id')//obtenim l'id de la carta
    cardsChosen.push(cardArray[cardId].name)//afegim al cardsChosen el nom de la carta clickada
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)//cambien l'atribut src de la imatge
    //ho podem fer, perque this apunta a qui ha cridat a la funcio, en aquest cas la imatge
    if(cardsChosen.length === 2){
      //si ja hem triat dues, comprovem que facin parella
      setTimeout(checkForMatch,500)//fem la crida, possem el timeout per a que s'esperi 500ms i no vagi mass ràpid

    }
  }




  //Cridem a la funció
  createBoard()

})
