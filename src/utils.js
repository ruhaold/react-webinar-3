// создание пробелов в четырёхзначных числах
export function commafy(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function getWordForQuantity(count) {
  const remainder10 = count % 10;
  const remainder100 = count % 100;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return 'товаров';
  }

  if (remainder10 === 1) {
    return 'товар';
  }

  if (remainder10 >= 2 && remainder10 <= 4) {
    return 'товара';
  }

  return 'товаров';
}
