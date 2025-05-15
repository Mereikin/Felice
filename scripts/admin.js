// Загрузка данных при старте
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadSuppliersForSelect();
    loadProducts();
    loadSuppliers();
    loadPriceLists();
    generateQRCode();
    
    // Добавляем обработчик для фильтра категорий
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            filterProducts(e.target.value);
        });
    }
});

// Управление секциями
function showSection(sectionName) {
    // Скрываем все секции
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Показываем выбранную секцию
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Обновляем активную кнопку
    document.querySelectorAll('.admin-nav-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`[onclick="showSection('${sectionName}')"]`).classList.add('active');
}

// Работа с товарами
async function loadProducts() {
    try {
        const response = await fetch('/api/categories');
        const categories = await response.json();
        
        const productsList = document.getElementById('products-list');
        productsList.innerHTML = '';
        
        Object.entries(categories).forEach(([category, items]) => {
            Object.entries(items).forEach(([product, supplier]) => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <div>
                        <strong>${product}</strong>
                        <span class="category-tag">${category}</span>
                        <span class="supplier-tag">${supplier}</span>
                    </div>
                    <div class="item-actions">                    <button onclick="editProduct('${product}')" title="Редактировать товар" aria-label="Редактировать товар ${product}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProduct('${product}')" title="Удалить товар" aria-label="Удалить товар ${product}">
                        <i class="fas fa-trash"></i>
                    </button>
                    </div>
                `;
                productsList.appendChild(item);
            });
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function filterProducts(category) {
    const response = await fetch('/api/categories');
    const categories = await response.json();
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    
    Object.entries(categories).forEach(([cat, items]) => {
        if (!category || category === cat) {
            Object.entries(items).forEach(([product, supplier]) => {
                const item = document.createElement('div');
                item.className = 'list-item';
                item.innerHTML = `
                    <div>
                        <strong>${product}</strong>
                        <span class="category-tag">${cat}</span>
                        <span class="supplier-tag">${supplier}</span>
                    </div>
                    <div class="item-actions">
                        <button onclick="editProduct('${product}')" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteProduct('${product}')" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                productsList.appendChild(item);
            });
        }
    });
}

// Функции редактирования и удаления товаров
async function editProduct(productName) {
    try {
        const response = await fetch('/api/categories');
        const categories = await response.json();
        
        // Находим категорию и поставщика товара
        let productCategory = '';
        let productSupplier = '';
        
        for (const [category, items] of Object.entries(categories)) {
            if (items[productName]) {
                productCategory = category;
                productSupplier = items[productName];
                break;
            }
        }

        // Заполняем форму текущими данными
        document.getElementById('product-name').value = productName;
        const categorySelect = document.getElementById('product-category');
        const supplierSelect = document.getElementById('product-supplier');

        // Загружаем списки категорий и поставщиков
        await loadCategories();
        await loadSuppliersForSelect();

        // Устанавливаем текущие значения
        categorySelect.value = productCategory;
        supplierSelect.value = productSupplier;

        // Показываем модальное окно
        const modal = document.getElementById('add-product-modal');
        modal.style.display = 'block';

        // Обновляем обработчик формы для режима редактирования
        const form = document.getElementById('add-product-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            try {
                const response = await fetch(`/api/products/${encodeURIComponent(productName)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldName: productName,
                        newName: formData.get('name'),
                        category: formData.get('category'),
                        supplier: formData.get('supplier')
                    })
                });

                if (response.ok) {
                    closeModal('add-product-modal');
                    loadProducts();
                } else {
                    alert('Ошибка при обновлении товара');
                }
            } catch (error) {
                console.error('Error updating product:', error);
                alert('Ошибка при обновлении товара');
            }
        };
    } catch (error) {
        console.error('Error loading product for edit:', error);
        alert('Ошибка при загрузке данных товара');
    }
}

async function deleteProduct(productName) {
    if (confirm(`Вы уверены, что хотите удалить товар "${productName}"?`)) {
        try {
            const response = await fetch(`/api/products/${encodeURIComponent(productName)}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadProducts();
            } else {
                alert('Ошибка при удалении товара');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Ошибка при удалении товара');
        }
    }
}

// Работа с поставщиками
async function loadSuppliers() {
    try {
        const response = await fetch('/api/suppliers');
        const suppliers = await response.json();
        
        const suppliersList = document.getElementById('suppliers-list');
        suppliersList.innerHTML = '';
        
        Object.entries(suppliers).forEach(([name, phone]) => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div>
                    <strong>${name}</strong>
                    <span class="phone-tag">${phone}</span>
                </div>
                <div class="item-actions">                    <button onclick="editSupplier('${name}')" title="Редактировать поставщика" aria-label="Редактировать поставщика ${name}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteSupplier('${name}')" title="Удалить поставщика" aria-label="Удалить поставщика ${name}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            suppliersList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading suppliers:', error);
    }
}

// Функции для работы с поставщиками
async function editSupplier(supplierName) {
    try {
        // Открываем модальное окно в режиме редактирования
        showAddSupplierModal(supplierName, true);

        const form = document.getElementById('add-supplier-form');
        // Обновляем обработчик формы для режима редактирования
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            try {
                const response = await fetch(`/api/suppliers/${encodeURIComponent(supplierName)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldName: supplierName,
                        newName: formData.get('name'),
                        phone: formData.get('phone')
                    })
                });

                if (response.ok) {
                    closeModal('add-supplier-modal');
                    loadSuppliers();
                } else {
                    alert('Ошибка при обновлении поставщика');
                }
            } catch (error) {
                console.error('Error updating supplier:', error);
                alert('Ошибка при обновлении поставщика');
            }
        };
    } catch (error) {
        console.error('Error loading supplier for edit:', error);
        alert('Ошибка при загрузке данных поставщика');
    }
}

async function deleteSupplier(supplierName) {
    if (confirm(`Вы уверены, что хотите удалить поставщика "${supplierName}"?`)) {
        try {
            const response = await fetch(`/api/suppliers/${encodeURIComponent(supplierName)}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (response.ok) {
                loadSuppliers();
            } else {
                alert(data.error || 'Ошибка при удалении поставщика');
            }
        } catch (error) {
            console.error('Error deleting supplier:', error);
            alert('Ошибка при удалении поставщика');
        }
    }
}

// Работа с прайс-листами
async function loadPriceLists() {
    try {
        const response = await fetch('/api/price-lists');
        const priceLists = await response.json();
        
        const priceListsDiv = document.getElementById('price-lists');
        priceListsDiv.innerHTML = '';
        
        priceLists.forEach(filename => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div>
                    <i class="fas fa-file-pdf"></i>
                    <span>${filename}</span>
                </div>
                <div class="item-actions">                    <button onclick="downloadPriceList('${filename}')" title="Скачать прайс-лист" aria-label="Скачать прайс-лист ${filename}">
                        <i class="fas fa-download"></i>
                    </button>
                    <button onclick="deletePriceList('${filename}')" title="Удалить прайс-лист" aria-label="Удалить прайс-лист ${filename}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            priceListsDiv.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading price lists:', error);
    }
}

// Вспомогательные функции
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        const categories = await response.json();
        
        // Заполняем выпадающий список категорий
        const categorySelect = document.querySelector('select[name="category"]');
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Выберите категорию</option>';
            Object.keys(categories).forEach(category => {
                categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
            });
        }

        // Заполняем фильтр категорий
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="">Все категории</option>';
            Object.keys(categories).forEach(category => {
                categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function loadSuppliersForSelect() {
    try {
        const response = await fetch('/api/suppliers');
        const suppliers = await response.json();
        
        // Заполняем выпадающий список поставщиков
        const supplierSelect = document.querySelector('select[name="supplier"]');
        if (supplierSelect) {
            supplierSelect.innerHTML = '<option value="">Выберите поставщика</option>';
            Object.keys(suppliers).forEach(supplier => {
                supplierSelect.innerHTML += `<option value="${supplier}">${supplier}</option>`;
            });
        }
    } catch (error) {
        console.error('Error loading suppliers for select:', error);
    }
}

function showAddProductModal() {
    // Загружаем актуальные данные перед открытием модального окна
    loadCategories();
    loadSuppliersForSelect();
    document.getElementById('add-product-modal').style.display = 'block';
}

function showAddSupplierModal(supplierName = null, isEdit = false) {
    const modal = document.getElementById('add-supplier-modal');
    const form = document.getElementById('add-supplier-form');
    const title = modal.querySelector('h3');
    
    // Очищаем старые данные формы
    form.reset();
    
    if (isEdit && supplierName) {
        title.textContent = 'Редактировать поставщика';
        // Сохраняем оригинальное имя для определения редактирования
        form.dataset.originalName = supplierName;
        
        // Заполняем форму текущими данными
        fetch('/api/suppliers')
            .then(response => response.json())
            .then(suppliers => {
                form.querySelector('input[name="name"]').value = supplierName;
                form.querySelector('input[name="phone"]').value = suppliers[supplierName];
            });
    } else {
        title.textContent = 'Добавить поставщика';
        delete form.dataset.originalName;
    }
    
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        delete form.dataset.originalName;
    }
    modal.style.display = 'none';
}

// Функции для работы с новыми категориями
function showNewCategoryInput() {
    const input = document.getElementById('new-category-input');
    input.style.display = 'flex';
}

async function addNewCategory() {
    const input = document.getElementById('new-category-name');
    const categoryName = input.value.trim();
      if (!categoryName) {
        alert('Введите название категории');
        return;
    }
      try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ name: categoryName }),
            credentials: 'same-origin'
        });            if (response.ok) {
                // Обновляем список категорий
                await loadCategories();
                // Выбираем новую категорию
                const categorySelect = document.getElementById('product-category');
                categorySelect.value = categoryName;
                // Скрываем поле ввода и очищаем его
                const newCategoryInput = document.getElementById('new-category-input');
                newCategoryInput.style.display = 'none';
                input.value = '';
                
                // Обновляем меню на главной странице
                // Если окно администратора было открыто из основного окна
                const mainWindow = window.opener;
                if (mainWindow && typeof mainWindow.updateMenu === 'function') {
                    mainWindow.updateMenu();
                } else {
                    console.log('Меню будет обновлено при следующем открытии главной страницы');
                }
            } else {
                const data = await response.json();
                alert(data.error || 'Ошибка при добавлении категории');
            }
    } catch (error) {
        console.error('Error adding category:', error);
        alert('Ошибка при добавлении категории');
    }
}

// Обработка форм
document.getElementById('add-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        if (response.ok) {
            closeModal('add-product-modal');
            loadProducts();
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
});

document.getElementById('add-supplier-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const isEdit = !!form.dataset.originalName;
    
    try {
        let url = '/api/suppliers';
        let method = 'POST';
        let body = Object.fromEntries(formData);
        
        if (isEdit) {
            url = `/api/suppliers/${encodeURIComponent(form.dataset.originalName)}`;
            method = 'PUT';
            body = {
                oldName: form.dataset.originalName,
                newName: formData.get('name'),
                phone: formData.get('phone')
            };
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (response.ok) {
            closeModal('add-supplier-modal');
            loadSuppliers();
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Ошибка при сохранении поставщика');
        }
    } catch (error) {
        console.error('Error saving supplier:', error);
        alert('Ошибка при сохранении поставщика');
    }
});

async function generateQRCode() {
    try {
        const response = await fetch('/api/server-info');
        const { addresses } = await response.json();
        
        if (addresses && addresses.length > 0) {
            const url = `http://${addresses[0]}:3000`;
            document.getElementById('mobileUrl').textContent = url;
            
            // Создаем QR-код
            new QRCode(document.getElementById("qrcode"), {
                text: url,
                width: 200,
                height: 200
            });
        }
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}
