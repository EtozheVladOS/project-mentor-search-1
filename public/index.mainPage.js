const $mentorCard = document.querySelector('#allCards');
const $signUpCheckBos = document.querySelector('.searchContainer');
const $containerForMentorsForm = document.querySelector('.containerForMentors');

$mentorCard?.addEventListener('click', (event) => {
  const cardId = event.target.closest('[data-id]').dataset.id;
  window.location = `/mentor/${cardId}`;
});

$signUpCheckBos?.addEventListener('click', (event) => {
  if (event.target.value === '2') {
    const $mentForm = document.querySelector('#mentForm1');
    $mentForm?.remove();
    // eslint-disable-next-line no-use-before-define
    $containerForMentorsForm.insertAdjacentHTML('afterbegin', formForMent);
  }
  else if (event.target.value === '1') {
    const $mentForm = document.querySelector('#mentForm1');
    $mentForm?.remove();
  }
});

const formForMent = `
<div class="mb-3" id="mentForm1">

      <label for="exampleFormControlInput1" class="form-label">Ссылка на вашу фотографию</label>
      <input name="image" type="text" class="form-control" id="exampleFormControlInput1">

      <label for="exampleFormControlInput2" class="form-label">Коротко о себе</label>
      <input name="description" type="text" class="form-control" id="exampleFormControlInput1">

      <div name="experience">
        <p>Ваш опыт </p>
        <div class="form-check form-check-inline">
          <input name="experience" value="1.0" class="form-check-input" type="radio" id="inlineCheckbox2">
          <label class="form-check-label" for="inlineCheckbox2">От 1 года</label>
        </div>
        <div class="form-check form-check-inline">
          <input name="experience" value="3" class="form-check-input" type="radio" id="inlineCheckbox2">
          <label class="form-check-label" for="inlineCheckbox2">От 3 лет</label>
        </div>
        <div class="form-check form-check-inline">
          <input name="experience" value="5" class="form-check-input" type="radio" id="inlineCheckbox2">
          <label class="form-check-label" for="inlineCheckbox2">Более 5 лет</label>
        </div>
      </div>

      <label for="exampleFormControlInput3" class="form-label">Желаемая оплата в час</label>
      <input name="price" type="text" class="form-control" id="exampleFormControlInput1">

      <label for="exampleFormControlInput4" class="form-label">Карьера</label>
      <input name="occupation" type="text" class="form-control" id="exampleFormControlInput1">

      <label for="exampleFormControlInput5" class="form-label">Город</label>
      <input name="city" type="text" class="form-control" id="exampleFormControlInput1">
    </div>
`;
