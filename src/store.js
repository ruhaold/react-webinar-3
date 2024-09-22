/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      cart: [], // Состояние корзины
      cartTotal: 0, // Общее количество уникальных товаров в корзине
      cartSum: 0, // Общая сумма товаров
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object} Товар, который нужно добавить в корзину
   */
  addToCart(item) {
    if (!item.code || !item.cost) {
      throw new Error('Товар должен иметь свойства code и cost');
    }

    const cartItem = this.state.cart.find(cartItem => cartItem.code === item.code);
    const newCart = [...this.state.cart]; // Создаем новый массив

    if (cartItem) {
      // Если товар уже есть в корзине, увеличиваем его количество
      const index = newCart.indexOf(cartItem);
      newCart[index] = { ...cartItem, quantity: cartItem.quantity + 1 };
      this.state.cartSum = Number(this.state.cartSum) + Number(item.cost); // Преобразуем к числам перед сложением
    } else {
      // Если товара нет в корзине, добавляем его с количеством 1
      newCart.push({ ...item, quantity: 1 });
      this.state.cartSum = Number(this.state.cartSum) + Number(item.cost); // Преобразуем к числам перед сложением
    }
    this.state.cartTotal = newCart.length; // Обновляем общее количество товаров в корзине
    this.setState({ ...this.state, cart: newCart }); // Обновляем состояние
  }

  /**
   * Удаление товара из корзины
   * @param code {Number} Код товара, который нужно удалить из корзины
   */
  removeFromCart(code) {
    const itemToRemove = this.state.cart.find(cartItem => cartItem.code === code);
    if (!itemToRemove) {
      throw new Error(`Товар с кодом ${code} не найден в корзине`);
    }

    const newCart = this.state.cart.filter(cartItem => cartItem.code !== code);
    this.state.cartSum = Number(this.state.cartSum) - Number(itemToRemove.cost) * Number(itemToRemove.quantity); // Преобразуем к числам перед вычитанием
    this.state.cartTotal = newCart.length; // Обновляем общее количество товаров в корзине
    this.setState({ ...this.state, cart: newCart }); // Обновляем состояние
  }

  /**
   * Получение общего количества товаров в корзине
   * @returns {Number} Общее количество уникальных товаров в корзине
   */
  getCartTotal() {
    return this.state.cart.length;
  }

  /**
   * Получение общей суммы всех товаров в корзине
   * @returns {Number} Общая сумма товаров
   */
  getCartSum() {
    return this.state.cart.reduce((sum, item) => sum + item.cost * (item.quantity || 1), 0);
  }
}

export default Store;
