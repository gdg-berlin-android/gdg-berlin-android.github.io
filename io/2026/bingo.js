const debug = document.getElementById('debug')

function lg(message) {
  debug.innerText += message + "\n"
}

try {
  const gridElement = document.getElementById('grid')
  const modal = document.getElementById('bingo-modal')

  let cells = []

  function wordsLoaded(data) {
    words = data.split("\n")
    selected = []

    for (let i = 0; i < 25; ++i) {
      if (i == 12) {
        word = 'AI'
      } else {
        word = ''
        do {
          const index = Math.floor(Math.random() * words.length)
          word = words[index]
        } while (word.length == 0 || selected.indexOf(word) != -1)
      }

      selected.push(word)
    }

    initBingo(selected)
  }

  function initBingo(buzzwords) {
    for (let i = 0; i < 25; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      cell.innerText = buzzwords[i]
      if(i != 12){
        cell.addEventListener('click', () => toggleCell(i))
      } else {
        cell.addEventListener('click', () => window.alert("AI - Free field for everyone"))
        cell.classList.toggle('active')
      }

      gridElement.appendChild(cell)
      cells.push(cell)
    }
  }

  function toggleCell(index) {
    if (index != 12) {
      cells[index].classList.toggle('active')
      checkBingo()
    }
  }

  function checkBingo() {
    const size = 5;
    let hasBingo = false;

    for (let i = 0; i < size; i++) {
      let row = true;
      for (let j = 0; j < size; j++) {
        if (!cells[i * size + j].classList.contains('active')) row = false;
      }

      if (row) hasBingo = true;
    }

    for (let i = 0; i < size; i++) {
      let col = true;
      for (let j = 0; j < size; j++) {
        if (!cells[j * size + i].classList.contains('active')) col = false;
      }
      if (col) hasBingo = true;
    }

      let diag = true;
      for (let j = 0; j < size; j++) {
        if (!cells[j * size + j].classList.contains('active')) diag = false;
      }

      if (diag) hasBingo = true;

      diag = true;
      for (let j = 0; j < size; j++) {
        if (!cells[j * size + size-1-j].classList.contains('active')) diag = false;
      }

      if (diag) hasBingo = true;

    if (hasBingo) {
      modal.style.display = 'flex';
    }
  }

  function closeModal() {
    modal.style.display = 'none';
    location.reload()
  }

  fetch('buzzwords')
    .then(res => res.text())
    .then(data => wordsLoaded(data))
} catch (e) {
  lg(e)
}
