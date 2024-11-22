export const getSortCars = (a, b) => {
  const regex = /^([a-zA-Z]+)(\d+)$/; // Розбиває на текстову і числову частини

  const [, textA, numberA] = a.name.match(regex) || [];
  const [, textB, numberB] = b.name.match(regex) || [];

  // Сортування за текстовою частиною
  const textComparison = textA.localeCompare(textB);
  if (textComparison !== 0) {
    return textComparison;
  }

  // Сортування за числовою частиною
  return parseInt(numberA, 10) - parseInt(numberB, 10);
};
