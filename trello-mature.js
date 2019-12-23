const checkOnBoard = () => {
  if (window.location.href.includes('trello.com/b/')) {
    return true
  }
  return false
}

/*
function calculateCardCount() {
  if (checkOnBoard()) {
    var numberCards = document.querySelectorAll('.list-card').length;
    var counterElement = document.getElementById('total-cards')
    if (counterElement == null) {
      document.querySelector('.board-header-btns.mod-left').insertAdjacentHTML('beforeend', '<div id="total-cards">Total Cards: <span id="total-cards-count">' + numberCards + '</span></div>')
    } else {
      document.getElementById('total-cards-count').innerText = numberCards;
    }
  }
}
*/

const boardId = () => {
  const matches = window.location.href.match(/\/(.{8})\//)
  if (matches && matches.length > 1) return matches[1]
  return null
}

const allList = () => {
  return document.querySelectorAll('.list')
}

const allListHeader = () => {
  return document.querySelectorAll('.list-header-extras')
}

const getListHeader = index => {
  let list = {}
  try {
    list = allListHeader()[index]
  } catch {
    console.log('não tem lista')
  }
  return list
}

const hasMatureHeaderClass = list => {
  return list.querySelector('.mature-header')
}

/*
var dialog = document.querySelector('dialog');
document.querySelector('.mature-header').onclick = function() {
  console.log('clicou no dialog')
  dialog.show();
};
*/

const addChosenContainer = parent => {
  const dialog = document.querySelector('dialog')
  if (!dialog) {
    const blockChosen = document.createElement('dialog')
    blockChosen.setAttribute("style", "height:40%");
    /*
    blockChosen.innerHtml =
       `<iframe id="headlineFetcher" style="height:100%"></iframe>
        <div style="position:absolute; top:0px; left:5px;">  
            <button>x</button>
        </div>`
    */
    blockChosen.innerHTML = `<h1>Ativar Trello Mature para essa lista?</h1>
      <div class="switch__container">
        <input id="switch-shadow" class="switch switch--shadow" type="checkbox">
          <label for="switch-shadow"></label>
      </div>
      <button class="closeModal">Fechar</button>`
    // blockChosen.className = 'block-list-chosen'
    // blockChosen.innerHtml = '<p>TESTE CADA A COISA?</p>'
    // blockChosen.innerText = 'TESTE CADA A COISA?'
    parent.appendChild(blockChosen)
  }
}

const enableCloseDialog = () => {
  const closeDialog = document.querySelector('.closeModal')
  const dialog = document.querySelector('dialog')
  if (closeDialog) {
    closeDialog.onclick = function () {
      dialog.close()
    }
  }
}


const listsByTrello = () => {
  const url = `https://trello.com/1/boards/${boardId()}/lists`
  fetch(url).then(res => res.json()).then(result => {
    console.log('Checkout this JSON! ', result)
  })
}

const addActivateListButton = () => {
  if (allList().length > 0) {
    for (let i = 0; i < allListHeader().length; i++) {
      // find if element exists
      const list = getListHeader(i)
      const matureHeader = hasMatureHeaderClass(list)
      if (matureHeader === null) {
        const element = document.createElement('div')
        const myImage = document.createElement('img')
        const iconURL = chrome.runtime.getURL('trello-mature.png')
        // const iconURL = chrome.extension.getURL('trello-mature.png')
        // myImage.src = iconURL
        myImage.src = "https://library.kissclipart.com/20180831/sye/kissclipart-project-management-icon-png-clipart-project-manage-2019b26f06bb17a9.png"
        // myImage.src = 'https://media.geeksforgeeks.org/wp-content/uploads/20190529122828/bs21.png'
        myImage.width = 32 
        myImage.height = 32
        myImage.title = 'Configurar Mature'
        element.className = 'mature-header'
        element.appendChild(myImage)
        // addChosenContainer(element)
        // element.innerHTML = '<span>Mature ?</span>'
        list.insertAdjacentElement('afterbegin', element)
        const dialog = document.querySelector('dialog')
        // return document.querySelectorAll('.list-header-extras')
        // document.querySelectorAll('.mature-header').onclick = function() {
        element.onclick = function() {
          console.log(allList()[i], '====== CLICK MODAL ')
          listsByTrello()
          dialog.showModal()
        }
      }
    }
  }
}

const applyEffects = () => {
  if (checkOnBoard()) {
    console.log('boardId', boardId())
    addChosenContainer(document.body)
    enableCloseDialog()
    addActivateListButton()
  }
}

setInterval(applyEffects, 10000);
// applyEffects()

/*
 * Agoritmo
 *
 * Dado um board, habilitar em cada lista uma opção de configuração para ativar
 * ou desativar a aplicação de efeitos de Mature nos cards
 *
 *
 * Varrer as listas do board e add o botão de configuração
 *
 * Se tiver a config e ativado para cada lista
 *
 * varrer os cards
 * aplicar o efeito
 */

/**
 * Trello Classes
 * 
 * list-header-extras  -> Card Header Class do lado direito
 *
 * list-wrapper -> Wrapper da lista
 */

