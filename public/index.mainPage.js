const mentorCard = document.querySelector('#allCards');

mentorCard.addEventListener('click', (event) => {
  const cardId = event.target.closest('[data-id]').dataset.id;
  window.location = `/mentor/${cardId}`;
});
