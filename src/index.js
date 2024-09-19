import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Название товара', cost: '100' },
    { code: 2, title: 'Книга по React', cost: '770' },
    { code: 3, title: 'Конфета', cost: '23' },
    { code: 4, title: 'Трактор', cost: '8000000' },
    { code: 5, title: 'Телефон Iphone XIXIXIXIXIXIXIXI', cost: '120000' },
    { code: 6, title: 'Карандаши цветные', cost: '111' },
    { code: 7, title: 'Товар сюрприз', cost: '0' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
