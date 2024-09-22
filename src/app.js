import React, { useState, useEffect } from 'react';
import { commafy, getWordForQuantity } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store = {} }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleRemoveFromCart = (code) => {
    store.removeFromCart(code);
    setIsCartOpen(true);
  };

  useEffect(() => {
    // Обновляем состояние при изменении store
    store.listeners.push(() => {
      setIsCartOpen(isCartOpen);
    });
  }, [store]);

  return (
    <div className="App">
      <div className="App-head">
        <h1>Магазин</h1>
      </div>

      <div className="App-center">
        <div className="List">
          <div className="List-item">
            <div className="Item">
              <p> корзине:</p>
              <p className="Card-info"> {store.getState().cartTotal === 0 ? 'пусто' : store.getState().cartTotal}</p>
              {store.getState().cartTotal != 0 && (
                <p className="Card-info">
                  {getWordForQuantity(store.getState().cartTotal)} / {commafy(store.getState().cartSum)}₽
                </p>
              )}
              <div className="Item-actions">
                <button onClick={() => setIsCartOpen(true)}>Перейти</button>
              </div>
            </div>
          </div>
          {store.getState().list.map(item => (
            <div key={item.code} className="List-item">
              <div className="Item">
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                <div className="Item-cost">{commafy(item.cost)} ₽</div>
                <div className="Item-actions">
                  <button onClick={() => store.addToCart(item)}>Добавить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isCartOpen && (
        <div className="Modal">
          <div className="Modal-header">
            <h2>Корзина</h2>
            <button onClick={() => setIsCartOpen(false)}>Закрыть</button>
          </div>
          <div className="Modal-body">
            {store.getState().cart.length === 0 ? (
              <div>Корзина пуста</div>
            ) : (
              <ul>
                {store.getState().cart.map(cartItem => (
                  <div key={cartItem.code} className="List-item">
                    <div className="Item">
                      <div className="Item-code">{cartItem.code}</div>
                      <div className="Item-title">{cartItem.title}</div>
                      <div className="Item-cost">{commafy(cartItem.cost)} ₽</div>
                      <div className="Item-cost">{cartItem.quantity} шт</div>
                      <div className="Item-actions">
                        <button onClick={() => handleRemoveFromCart(cartItem.code)}>Удалить</button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <div className="Modal-footer">
            <div>Сумма: {commafy(store.getState().cartSum)} ₽</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
