const $form = document.querySelector('#searchForm');
const $cardsContainer = document.querySelector('#cardContainer');
const $curCards = document.querySelector('[name="card"]');

$form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const dataFromForm = Object.fromEntries(new FormData(event.target));
  const responce = await fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataFromForm),
  });
  if (responce.status === 400) {
    alert('wrong');
  }
  else {
    $curCards?.remove();
    const dataFromServer = await responce.json();
    const newCards = createHtmlCard(dataFromServer);
    $cardsContainer.insertAdjacentHTML('afterbegin', newCards);
  }
});

function createHtmlCard(newCards) {
  let htmlStr = '';
  // eslint-disable-next-line no-restricted-syntax
  for (let card of newCards) {
    htmlStr += `
    <div name="card" data-id=${card._id}>
      <img src=${card.image} width="100" height="300" class="card-img-top" alt="None">
      <div class="card-body">
        <div class="btn-group" role="group" aria-label="Basic outlined example">
        </div>
        <h5 class="card-title">${card.name}}</h5>
        <p class="card-text">${card.occupation}</p>
      </div>
    </div>
    `;
  }
  return htmlStr;
}
