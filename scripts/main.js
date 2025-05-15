const categories = {
    "Вино": {
        "Zenato Pinot Grigio": "GWS",
        "Zenato Bardolino": "GWS",
        "Zenato Chiaretto": "GWS",
        "Haulashore Sauvignon Blanc": "GWS",
        "770 mile Zinfandel": "GWS",
        "Speri Valpolicella": "Крафт 2",
        "1924 Chardonnay": "GWS",
        "Ak Arba Kazakh Riesling": "Arba Wine",
        "Ak Arba Riesling 0.3": "Arba Wine",
        "Ak Arba Riesling Reserve": "Arba Wine",
        "Allimant-Laugner Gewürztraminer": "GWS",
        "Attems Pinot Grigio": "KWS",
        "Banfi Principessa Gavia Gavi": "North Trade",
        "BARISTA PINOTAGE": "GWS",
        "Belvento Vermentino": "KWS",
        "Black Stallion Cabernet Sauvignon": "GWS",
        "Black Stallion Chardonnay": "GWS",
        "Blason d'Issan, Margaux AOC": "GWS",
        "Chablis Domaine Long-Depaquit": "North Trade",
        "Chablis Premier Cru 'Fourchaume'": "North Trade",
        "Chablis 1er Cru Montmains": "GWS",
        "Chateau Giscours Margaux AOC": "GWS",
        "Chateau Lanessan Haut-Medoc AOС": "GWS",
        "Chateau Troupian Haut - Medoc": "GWS",
        "CORRALILLO WINEMAKERS BLEND": "GWS",
        "Cote-Rotie 'Brune et Blonde'": "KWS",
        "Coto de Imaz Rioja": "GWS",
        "Cune Rioja Gran Reserva": "GWS",
        "EQ CHARDONNAY": "GWS",
        "EQ PINOT NOIR": "GWS",
        "EQ SAUVIGNON BLANC": "GWS",
        "Errazuriz Chardonnay": "KWS",
        "Errazuriz Sauvignon Blanc": "KWS",
        "Fritz Walter Riesling": "GWS",
        "Fritz Walter Spatburgunder (Pinot Noir)": "GWS",
        "Furlet Bianco": "GWS",
        "Furlet Pinot Nero": "GWS",
        "Gaja 'Gaia & Rey' Langhe": "KWS",
        "Gaja 'Rossj - Bass' Langhe": "KWS",
        "Gotas de Mar Albarino": "Крафт 2",
        "Gotas de Mar Godello": "Крафт 2",
        "Kyzyl Arba Cabernet Franc": "Arba Wine",
        "Kyzyl Arba Cabernet Franc 0.3": "Arba Wine",
        "La Scolca Gavi dei Gavi": "Крафт 2",
        "Lagyl Arba Saperavi Reserve": "Arba Wine",
        "Laporte Sancerre Le Rochoy": "GWS",
        "Le Merle Blanc de Chateau Clarke": "GWS",
        "Le Volte dell’Ornellaia": "KWS",
        "Livio Felluga Pinot Grigio": "Крафт 2",
        "LVNAE Vermentino 'Etichetta Grigia'": "North Trade",
        "Marlborough Sun Pinot Noir": "Крафт 2",
        "Marlborough Sun Rose": "Крафт 2",
        "Marlborough Sun Sauvignon": "Крафт 2",
        "Mauro Molino Barolo": "GWS",
        "Meursault ": "North Trade",
        "Muller Reisling Göttweiger Berg": "GWS",
        "Muller Zweigelt Göttweiger Berg": "GWS",
        "Natureo Muscat 0%": "KWS",
        "Natureo Syrah 0%": "KWS",
        "Nuala Pinot Noir": "KWS",
        "Nuala Sauvignon Blanc": "KWS",
        "Old Coach Road Pinot Noir": "GWS",
        "Pino Arba Pinot Noir 0.3": "Arba Wine",
        "Pino Arba Pinot Noir Reserve": "Arba Wine",
        "Pino Sape": "Arba Wine",
        "REYNEKE ORGANIC CHENIN BLANC": "GWS",
        "REYNEKE ORGANIC SYRAH": "GWS",
        "Sassicaia Bolgheri DOC": "Крафт 2",
        "Talo Primitivo-Merlot": "KWS",
        "Terre NatuzziI Chianti": "GWS",
        "THE CHOCOLATE BLOCK": "GWS",
        "Tommasi Le Rosse Pinot Grigio": "North Trade",
        "Valduero Blanco": "GWS",
        "Valduero Una Cepa 2016": "GWS",
        "Zenato AMARONE DELLA VALPOLICELLA CLASSICO": "GWS",
        "Zenato LUGANA DOC San Benedetto": "GWS",
        "Zenato SERGIO LUGANA DOC RISERVA": "GWS",
        "Zenato VALPOLICELLA RIPASSO DOC SUPERIORE": "GWS"
    },
    "Виски": {
        "The Macallan 12 у.о": "GWS",
        "The Macallan Double Cask 15 YO": "GWS",
        "The Macallan Double Cask 18 YO": "GWS",
        "The Macallan Sherry Oak 18": "GWS",
        "Glenlivet Founders": "Astalco",
        "Glenmorangie 10 y.o": "KWS",
        "Glenmorangie Nectar D'OR": "KWS",
        "Dalmore 12 y.o": "North Trade",
        "Chivas regal 12 y.o": "",
        "Jameson Crested": "Astalco",
        "Jameson Black Barrel": "Astalco"
    },
    "Водка": {
        "Водка Кызлжар Голд 0.5": "СатурнДистриб",
        "Водка Казак ели 0.7": "СатурнДистриб",
        "Водка Саболина 0.5": "Крафт 2",
        "Водка Царская Golden Snow 0.7": "Крафт 2",
        "Grey Goose 0.7": "Респект"
    },
    "Джин": {
        "Tanqueray 1л": "North Trade",
        "Roku Gin": "North Trade",
        "Bombay Sapphire ": "",
        "Bulldog dry Gin ": "",
        "The Botanist": "North Trade"
    },
    "Игристое": {
        "Allimant-Laugner Crémant": "GWS",
        "GOSSET Blanc de Blanc": "GWS",
        "GOSSET Brut": "GWS",
        "Laurent Perrier Blanc de Blanc": "North Trade",
        "Laurent Perrier Rose": "North Trade",
        "Marlborough Sun Bubbles": "Крафт 2",
        "Moёt Chandon Brut 0.2": "KWS",
        "Moёt Chandon Brut 0.75": "KWS",
        "Montelvini Asolo": "GWS",
        "Montelvini Extra Dry": "GWS",
        "Ruinart Blanc de Blancs": "KWS",
        "Valdo Valdobbiadene": "GWS"
    },
    "Коньяк": {
        "Hennessy VS 0.5": "KWS",
        "Hennessy VSOP 0.7": "KWS",
        "Hennessy XO 0.7": "KWS",
        "Martell XO 0.7 ": "",
        "Deau Cognac VS 0.7": ""
    },
    "Пиво": {
        "Bitburger 0%": "Крафт 2",
        "Warsteiner": "Крафт 2",
        "Blanche de Bruxelles": "Крафт 2"
    },
    "Портвейн": {
        "Taylor’s Vintage Port": "GWS",
        "Taylor’s Tawny 20": "GWS",
        "Gonzalez Byass Nectar": "Monte Bianco",
        "Gonzalez Byass Alfonso": "Monte Bianco",
        "Gonzalez Byass Leonor": "Monte Bianco",
        "Gonzalez Byass Noe": "Monte Bianco"
    },
    "Прочее": {
        "Малина сироп": "North Trade",
        "Манго сироп": "North Trade",
        "Маракуйя сироп": "North Trade",
        "Киви сироп": "North Trade",
        "Роза сироп": "North Trade",
        "Кофе": "Данияр Кофе"
    },
    "Ром": {
        "Brugal 1888": "GWS",
        "Bacardi reserva 8 y.o": "Респект",
        "Zacapa 23 y.o": "North Trade",
        "Zacapa XO": "North Trade"
    },
    "Саша Закуп": {
        "Пюре малина": "Саша Закуп",
        "Пюре киви": "Саша Закуп",
        "Пюре маракуйя": "Саша Закуп",
        "Пюре манго": "Саша Закуп",
        "Ассам чай": "Саша Закуп",
        "Молоко 3,2%": "Саша Закуп",
        "Кокос молоко": "Саша Закуп",
        "Миндаль молоко": "Саша Закуп",
        "Мёд": "Саша Закуп",
        "Сахар песок": "Саша Закуп",
        "Сахар рафинад": "Саша Закуп",
        "Тростник рафинад": "Саша Закуп",
        "Клюква с/м": "Саша Закуп",
        "Вишня с/м": "Саша Закуп",
        "Облепиха с/м": "Саша Закуп"
    },
    "Софты": {
        "Сан бенедетно газ": "Крафт 2",
        "Сан бенедетно б/г": "Крафт 2",
        "Туран стекло газ": "СатурнДистриб",
        "Туран стекло б/г": "СатурнДистриб",
        "Туран газ 1л": "СатурнДистриб",
        "Кола стекло": "Ред машин",
        "Кола зеро стекло": "Ред машин",
        "Фанта стекло": "Ред машин",
        "Спрайт стекло": "Ред машин",
        "Swell яблоко": "Крафт 2",
        "Swell апельсин": "Крафт 2",
        "Swell томат": "Крафт 2",
        "Swell вишня": "Крафт 2"
    },
    "Текила": {
        "Patton Silver": "Респект",
        "Patron Reposado": "Респект",
        "Patron Anejo": "Респект",
        "Don Julio Blanco": "North Trade",
        "Don Julio 1942": "North Trade"
    },
   
};

    const supplierPhones = {
    "GWS": "+77014304714",
    "Astalco": "+77759160529",
    "СатурнДистриб": "+77015938616",
    "Крафт 2": "+77014988085",
    "Ред машин": "+77014291311",
    "KWS": "+77780512704",
    "Респект": "+77072535639",
    "Monte Bianco": "+77076020224",
    "North Trade": "+77717569321",
    "Саша Закуп": "+77017743245",
    "Данияр Кофе": "+77016619699"
};

const selectedItems = {};

function showCategory(category) {
const content = document.getElementById('content');
content.innerHTML = `<h2>${category}</h2>`;

  const items = Object.keys(categories[category]).sort((a, b) => 
        a.localeCompare(b, 'ru', {sensitivity: 'base'})
    );

Object.keys(categories[category]).forEach(item => {
    content.innerHTML += `
        <div class="item">
            <div class="item-details">
                <span class="item-name">${item}</span>
            </div>
            <div class="item-controls">
                <button onclick="changeQty('${item}', -1)">-</button>
                <span id="${item}-qty">${selectedItems[item] || 0}</span>
                <button onclick="changeQty('${item}', 1)">+</button>
            </div>
        </div>
    `;
});
content.innerHTML += `
    <div class="summary">
        <button onclick="showSummary()">Посмотреть сводку</button>
    </div>
`;
}

function changeQty(item, delta) {
// Проверяем, есть ли у товара поставщик
const supplier = Object.entries(categories).find(([_, items]) => items[item])?.[1][item];
if (!supplier) {
    alert(`У товара "${item}" не указан поставщик.`);
    return;
}

// Если товар — "Сахар песок", изменяем количество на 5
const step = item === "Сахар песок" ? 5 : 1;

// Изменяем количество товара
selectedItems[item] = (selectedItems[item] || 0) + delta * step;
if (selectedItems[item] < 0) selectedItems[item] = 0;

// Обновляем отображение количества
document.getElementById(`${item}-qty`).innerText = selectedItems[item];

// Обновляем отображение кнопки "Сбросить"
updateResetButton();
}

function showSummary() {
const content = document.getElementById('content');
content.innerHTML = `<h2>Сводка заказа</h2>`;
const groupedBySupplier = {};

// Группировка товаров по поставщикам
for (const [item, qty] of Object.entries(selectedItems)) {
    if (qty > 0) {
        const supplier = Object.entries(categories).find(([_, items]) => items[item])?.[1][item];
        if (supplier) {
            if (!groupedBySupplier[supplier]) groupedBySupplier[supplier] = [];
            groupedBySupplier[supplier].push({ item, qty });
        }
    }
}

// Проверка, есть ли товары для отображения
if (Object.keys(groupedBySupplier).length === 0) {
    content.innerHTML += `<p>Вы не выбрали ни одного товара.</p>`;
    return;
}

// Отображение товаров по поставщикам
for (const [supplier, items] of Object.entries(groupedBySupplier)) {
    content.innerHTML += `<h3>${supplier}</h3><ul>`;
    items.forEach(({ item, qty }) => {
        content.innerHTML += `<li class="summary-item">${item}: ${qty}</li>`;
    });
    content.innerHTML += `</ul><button class="send-order-button" onclick="sendOrder('${supplier}')">📦 Отправить заявку ${supplier}</button>`;
}
}

function sendOrder(supplier) {
const items = Object.entries(selectedItems)
    .filter(([item, qty]) => qty > 0 && Object.values(categories).find(cat => cat[item])[item] === supplier)
    .map(([item, qty]) => {
        // Проверяем, нужно ли добавлять "кг" или "кейс" к количеству
        const itemsWithKg = ["Клюква с/м", "Вишня с/м", "Облепиха с/м", "Сахар песок"];
        const isSoft = categories["Софты"] && categories["Софты"][item];
        const quantityText = itemsWithKg.includes(item)
            ? `${qty}кг` // Добавляем "кг" для указанных товаров
            : isSoft
            ? `${qty}кейс` // Добавляем "кейс" для товаров из категории "Софты"
            : `${qty}`; // Оставляем только количество для остальных товаров
        return `${item}: ${quantityText}`;
    })
    .join("\n");

if (!items) {
    alert("Нет товаров для отправки этому поставщику.");
    return;
}

const message = `Здравствуйте, заявка:\n\n${items}`;
const phone = supplierPhones[supplier];

const encodedMessage = encodeURIComponent(message);
const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
console.log(`WhatsApp URL: ${whatsappUrl}`); // Для отладки
window.open(whatsappUrl, '_blank');
}

function resetSelection() {
// Очистка выбранных товаров
for (const item in selectedItems) {
    selectedItems[item] = 0;
}

// Возврат на главный экран
const content = document.getElementById('content');
content.innerHTML = `
    <h2>Добро пожаловать</h2>
    <p>Выберите категорию, чтобы начать добавлять товары в заказ.</p>
`;

// Обновляем отображение кнопки "Сбросить"
updateResetButton();
}

function searchItems() {
const query = document.getElementById('search-input').value.toLowerCase();
const clearButton = document.getElementById('clear-search');
const content = document.getElementById('content');

// Показываем или скрываем кнопку очистки
if (query) {
    clearButton.style.display = 'block';
} else {
    clearButton.style.display = 'none';
}

content.innerHTML = '';

let foundItems = false;

Object.keys(categories).forEach(category => {
    const filteredItems = Object.keys(categories[category]).filter(item =>
        item.toLowerCase().includes(query)
    );

    if (filteredItems.length > 0) {
        foundItems = true;
        content.innerHTML += `<h2>${category}</h2>`;
        filteredItems.forEach(item => {
            content.innerHTML += `
                <div class="item">
                    <div class="item-details">
                        <span class="item-name">${item}</span>
                    </div>
                    <div class="item-controls">
                        <button onclick="changeQty('${item}', -1)">-</button>
                        <span id="${item}-qty">${selectedItems[item] || 0}</span>
                        <button onclick="changeQty('${item}', 1)">+</button>
                    </div>
                </div>
            `;
        });
    }
});

if (!foundItems) {
    content.innerHTML = '<p>Ничего не найдено.</p>';
} else {
    // Добавляем кнопку "Посмотреть сводку", если найдены товары
    content.innerHTML += `
        <div class="summary">
            <button onclick="showSummary()">Посмотреть сводку</button>
        </div>
    `;
}
}

function updateResetButton() {
const menu = document.getElementById('menu');
const hasSelectedItems = Object.values(selectedItems).some(qty => qty > 0);

// Удаляем кнопку "Сбросить", если она уже есть
const existingResetButton = document.getElementById('reset-button');
if (existingResetButton) {
    existingResetButton.remove();
}

// Если есть выбранные товары, добавляем кнопку "Сбросить"
if (hasSelectedItems) {
    const resetButton = document.createElement('button');
    resetButton.id = 'reset-button';
    resetButton.className = 'category-button reset';
    resetButton.textContent = 'Сбросить';
    resetButton.onclick = resetSelection;
    menu.appendChild(resetButton);
}
}

function clearSearch() {
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-search');

searchInput.value = ''; // Очищаем поле ввода
clearButton.style.display = 'none'; // Скрываем кнопку очистки
searchItems(); // Обновляем результаты поиска
updateResetButton(); // Обновляем отображение кнопки "Сбросить"
}

function updateMenu() {
    const menu = document.getElementById('menu');
    menu.innerHTML = ''; // Очищаем текущее меню

    // Получаем все категории и сортируем их по алфавиту
    const sortedCategories = Object.keys(categories).sort((a, b) => 
        a.localeCompare(b, 'ru', {sensitivity: 'base'})
    );

    // Создаем кнопки для каждой категории
    sortedCategories.forEach(category => {
        // Пропускаем пустые категории
        if (Object.keys(categories[category]).length === 0) return;

        const button = document.createElement('button');
        button.className = 'category-button';
        button.onclick = () => showCategory(category);

        // Добавляем эмодзи в зависимости от категории
        let emoji = '';
        switch(category) {
           
        }

        button.textContent = `${category} ${emoji}`.trim();
        menu.appendChild(button);
    });

    // Обновляем отображение кнопки сброса
    updateResetButton();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateMenu();
});

