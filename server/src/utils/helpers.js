const listOfColors = [
  "#1abc9c",
  "#16a085",
  "#2ecc71",
  "#27ae60",
  "#3498db",
  "#2980b9",
  "#9b59b6",
  "#8e44ad",
  "#34495e",
  "#2c3e50",
  "#f1c40f",
  "#f39c12",
  "#e67e22",
  "#d35400",
  "#e74c3c",
  "#c0392b",
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function* getColorGenerator() {
  let current = 0;
  const loc = [...listOfColors];
  shuffle(loc);
  while (true) {
    yield loc[current];
    current += 1;
    if (current === loc.length) {
      current = 0;
    }
  }
}

function createArrayOfUsersFromObject(obj) {
  return Object.keys(obj).map((k) => ({ username: k, ...obj[k] }));
}

module.exports = {
  getColorGenerator,
  createArrayOfUsersFromObject,
};
