const { connect, disconnect } = require('./db');
const Tags = require('./models/tag.model');
const Ments = require('./models/ment.model');

const tagsMain = [
  {
    name: 'Java Script',
  },
  {
    name: 'Pyton',
  },
  {
    name: 'HTML',
  },
  {
    name: 'CSS',
  },
  {
    name: 'C++',
  },
  {
    name: 'C#',
  },
  {
    name: 'Java',
  },
  {
    name: 'Goolang',
  },
];

const mentorsFirst = [
  {
    name: 'Иванов Иван Иванович',
    mail: 'tapac@yandex.ru',
    password: 1234,
    image: 'https://dacha.avgust.com/upload/medialibrary/1af/1afb13e84f65d6d4f45a1754758f486d.jpg',
    experience: 5,
    price: 3000,
    tags: [],
    city: 'Москва',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    name: 'Петров Пётр Петрович',
    mail: 'tapac2@yandex.ru',
    password: 4321,
    image: 'https://storage.yandexcloud.net/incrussia-prod/wp-content/uploads/2018/10/Mole_Cover.jpg',
    experience: 3,
    price: 2000,
    tags: [],
    city: 'Москва',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    name: 'Сидоров Сидр Сидорович',
    mail: 'tapac3@yandex.ru',
    password: 9876,
    image: 'https://static.dw.com/image/51117271_401.jpg',
    experience: 1,
    price: 1000,
    tags: [],
    city: 'Москва',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

async function seed1() {
  connect();
  return Promise.all(tagsMain.map((tg) => Tags.create(tg)));
}
seed1().then(() => disconnect());

async function seed2() {
  connect();
  return Promise.all(mentorsFirst.map((mt) => Ments.create(mt)));
}
seed2().then(() => disconnect())
