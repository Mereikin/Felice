import debtsData from './debtslist.js';

async function showDebts() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2 class="debt-title">Список долгов</h2>
        <div class="debts-wrapper" style="max-width: 600px; margin: 0 auto;">
            <div id="debtsContainer" class="debts-container" style="display: flex; flex-direction: column; gap: 10px;">
                <!-- Долги будут добавляться здесь -->
            </div>
            <div class="add-debt-button-container">
                <button onclick="addNewDebt()" class="btn btn-primary btn-add-debt">
                    <i class="fas fa-plus"></i> Добавить долг
                </button>
            </div>
        </div>
    `;
    await loadSavedDebts();
}

async function loadSavedDebts() {
    try {
        await debtsData.loadFromStorage();
        const debts = debtsData.getAllDebts();
        
        const container = document.getElementById('debtsContainer');
        container.innerHTML = '';

        debts.forEach(debt => {
            const debtItem = document.createElement('div');
            debtItem.className = 'debt-item';
            debtItem.innerHTML = `
                <div class="saved-debt">
                    <div>
                        <div class="debt-name">${debt.name}</div>
                        <div class="debt-products">
                            ${debt.products.map(p => `${p.name} - ${p.quantity}шт`).join('<br>')}
                        </div>
                    </div>
                    <div class="debt-buttons">
                        <button class="btn-save" onclick="editDebt(this)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-cancel" onclick="deleteDebt(this)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(debtItem);
        });
    } catch (error) {
        console.error('Ошибка при загрузке долгов:', error);
        alert('Ошибка при загрузке долгов');
    }
}

function addNewDebt() {
    const container = document.getElementById('debtsContainer');
    const newItem = document.createElement('div');
    newItem.className = 'debt-item';
    
    newItem.innerHTML = `
        <div class="debt-details">
            <input type="text" class="debt-input" placeholder="Имя Должника">
            <div class="debts-rows-container">
                <div class="debt-row">
                    <input type="text" class="product-input" placeholder="Название товара">
                    <input type="number" class="quantity-input" placeholder="Кол-во">
                   
                </div>
            </div>
            <button class="btn-add-row" onclick="addDebtRow(this)">
                <i class="fas fa-plus"></i> Добавить товар
            </button>
        </div>
        <div class="debt-controls">
            <button class="btn-save" onclick="saveNewDebt(this)">
                <i class="fas fa-save"></i> Сохранить
            </button>
            <button class="btn-cancel" onclick="cancelDebt(this)">
                <i class="fas fa-times"></i> Отмена
            </button>
        </div>
    `;
    container.appendChild(newItem);
}

function removeDebtRow(button) {
    const debtRow = button.closest('.debt-row');
    const container = debtRow.parentElement;
    if (container.querySelectorAll('.debt-row').length > 1) {
        debtRow.remove();
    }
}

function addDebtRow(button) {
    const container = button.previousElementSibling;
    const newRow = document.createElement('div');
    newRow.className = 'debt-row';
    newRow.innerHTML = `
        <input type="text" class="product-input" placeholder="Название товара">
        <input type="number" class="quantity-input" placeholder="Кол-во">
    `;
    container.appendChild(newRow);
}

function saveNewDebt(button) {
    const debtItem = button.closest('.debt-item');
    const nameInput = debtItem.querySelector('.debt-input');
    const rows = debtItem.querySelectorAll('.debt-row');
    
    if (!nameInput.value.trim()) {
        alert('Введите имя клиента');
        return;
    }

    const products = [];
    rows.forEach(row => {
        const productName = row.querySelector('.product-input').value.trim();
        const quantity = row.querySelector('.quantity-input').value;
        
        if (productName && quantity) {
            products.push({ name: productName, quantity: quantity });
        }
    });

    if (products.length === 0) {
        alert('Добавьте хотя бы один товар');
        return;
    }

    // Сохраняем в модуль debtsData
    debtsData.addDebt(nameInput.value, products);

    debtItem.innerHTML = `
        <div class="saved-debt">
            <div>
                <div class="debt-name">${nameInput.value}</div>
                <div class="debt-products">
                    ${products.map(p => `${p.name} - ${p.quantity}шт`).join('<br>')}
                </div>
            </div>
            <div class="debt-buttons">
                <button class="btn-save" onclick="editDebt(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-cancel" onclick="deleteDebt(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function cancelDebt(button) {
    const debtItem = button.closest('.debt-item');
    debtItem.remove();
}

function deleteDebt(button) {
    if (confirm('Вы уверены, что хотите удалить этот долг?')) {
        const debtItem = button.closest('.debt-item');
        const name = debtItem.querySelector('.debt-name').textContent;
        debtsData.deleteDebt(name);
        debtItem.remove();
    }
}

function editDebt(button) {
    const debtItem = button.closest('.debt-item');
    const savedDebt = debtItem.querySelector('.saved-debt');
    const name = savedDebt.querySelector('.debt-name').textContent;
    const products = savedDebt.querySelector('.debt-products').innerHTML
        .split('<br>')
        .map(item => {
            const [name, quantity] = item.split(' - ');
            return {
                name,
                quantity: quantity.replace('шт', '')
            };
        });

    debtItem.innerHTML = `
        <div class="debt-details">
            <input type="text" class="debt-input" value="${name}">
            <div class="debts-rows-container">
                ${products.map(product => `
                    <div class="debt-row">
                        <input type="text" class="product-input" value="${product.name}">
                        <input type="number" class="quantity-input" value="${product.quantity}">
                        
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-info btn-add-row" onclick="addDebtRow(this)">
                <i class="fas fa-plus"></i> Добавить товар
            </button>
        </div>
        <div class="debt-controls">
            <button class="btn-save" onclick="saveNewDebt(this)">
                <i class="fas fa-save"></i> Сохранить
            </button>
            <button class="btn-cancel" onclick="cancelDebt(this)">
                <i class="fas fa-times"></i> Отмена
            </button>
        </div>
    `;
}

window.showDebts = showDebts;
window.addNewDebt = addNewDebt;
window.addDebtRow = addDebtRow;
window.saveNewDebt = saveNewDebt;
window.cancelDebt = cancelDebt;
window.deleteDebt = deleteDebt;
window.editDebt = editDebt;
window.removeDebtRow = removeDebtRow;