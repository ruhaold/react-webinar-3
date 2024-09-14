/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.usedCodes = new Set(this.state.list.map(item => item.code));
    // this.lastUsedCode = Math.max(...this.state.list.map(item => item.code));
    this.nextCode = Math.max(...this.state.list.map(item => item.code)) + 1;
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
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.nextCode;
    this.usedCodes.add(newCode);
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
    });
    this.nextCode++;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
    this.usedCodes.delete(code);
    // if (code === this.lastUsedCode - 1) {
    //   let newLastUsedCode = Math.max(...this.state.list.map(item => item.code));
    //   if (newLastUsedCode < this.lastUsedCode) {
    //     this.lastUsedCode = newLastUsedCode;
    //   }
    // }
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected) {
            // Если запись уже была выделена, сбрасываем выделение
            item.selected = false;
          } else {
            item.selected = true;
            item.selectionCount = (item.selectionCount || 0) + 1; // Увеличиваем счетчик
          }
        } else {
          item.selected = false; // Сбрасываем выделение для других пунктов
        }
        item.displaySelectionCount = item.selectionCount > 0; // Показываем счетчик даже для не выделенных пунктов
        return item;
      }),
    });
  }
}

export default Store;

