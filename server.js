const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const config = require('./config');

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API Routes
// Получение категорий и товаров
app.get('/api/categories', async (req, res) => {
    try {
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        // Извлекаем объект categories из main.js
        const categoriesMatch = mainJs.match(/const categories = ({[\s\S]*?});/);
        if (categoriesMatch) {
            const categoriesObj = eval('(' + categoriesMatch[1] + ')');
            res.json(categoriesObj);
        } else {
            res.status(404).json({ error: 'Categories not found' });
        }
    } catch (error) {
        console.error('Error reading categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API для создания новой категории
app.post('/api/categories', async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Необходимо указать название категории' });
        }

        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        
        const categoriesMatch = mainJs.match(/const categories = ({[\s\S]*?});/);
        if (categoriesMatch) {
            let categoriesObj = eval('(' + categoriesMatch[1] + ')');
            
            // Проверяем, существует ли уже такая категория
            if (categoriesObj[name]) {
                return res.status(400).json({ error: 'Категория уже существует' });
            }
            
            // Добавляем новую категорию
            categoriesObj[name] = {};
            
            // Сортируем категории по алфавиту
            const sortedCategories = {};
            Object.keys(categoriesObj).sort((a, b) => 
                a.localeCompare(b, 'ru')
            ).forEach(key => {
                sortedCategories[key] = categoriesObj[key];
            });
            
            // Обновляем файл с отсортированными категориями
            const updatedContent = mainJs.replace(
                /const categories = {[\s\S]*?};/,
                `const categories = ${JSON.stringify(sortedCategories, null, 4)};`
            );
            
            await fs.writeFile('./scripts/main.js', updatedContent);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Categories not found' });
        }
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение списка поставщиков
app.get('/api/suppliers', async (req, res) => {
    try {
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        const suppliersMatch = mainJs.match(/const supplierPhones = ({[\s\S]*?});/);
        if (suppliersMatch) {
            const suppliersObj = eval('(' + suppliersMatch[1] + ')');
            res.json(suppliersObj);
        } else {
            res.status(404).json({ error: 'Suppliers not found' });
        }
    } catch (error) {
        console.error('Error reading suppliers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Работа с долгами
app.get('/api/debts', async (req, res) => {
    try {
        const debts = await fs.readFile(config.dbPath, 'utf-8');
        res.json(JSON.parse(debts));
    } catch (error) {
        console.error('Error reading debts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/debts', async (req, res) => {
    try {
        const newDebt = req.body;
        const debts = JSON.parse(await fs.readFile(config.dbPath, 'utf-8'));
        debts.push(newDebt);
        await fs.writeFile(config.dbPath, JSON.stringify(debts, null, 2));
        res.json(newDebt);
    } catch (error) {
        console.error('Error adding debt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение прайс-листов
app.get('/api/price-lists', async (req, res) => {
    try {
        const files = await fs.readdir('./price-lists');
        const priceLists = files.filter(file => file.endsWith('.pdf'));
        res.json(priceLists);
    } catch (error) {
        console.error('Error reading price lists:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Загрузка прайс-листа
app.get('/api/price-lists/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'price-lists', filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(404).json({ error: 'File not found' });
        }
    });
});

// API для управления товарами
app.post('/api/products', async (req, res) => {
    try {
        const { name, category, supplier } = req.body;
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        
        // Добавляем новый товар в категорию
        const categoriesMatch = mainJs.match(/const categories = ({[\s\S]*?});/);
        if (categoriesMatch) {
            let categoriesObj = eval('(' + categoriesMatch[1] + ')');
            if (!categoriesObj[category]) {
                categoriesObj[category] = {};
            }
            categoriesObj[category][name] = supplier;
            
            // Обновляем файл main.js
            const updatedContent = mainJs.replace(
                /const categories = {[\s\S]*?};/,
                `const categories = ${JSON.stringify(categoriesObj, null, 4)};`
            );
            
            await fs.writeFile('./scripts/main.js', updatedContent);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Categories not found' });
        }
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API для редактирования товара
app.put('/api/products/:name', async (req, res) => {
    try {
        const { oldName } = req.body;
        const { newName, category, supplier } = req.body;
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        
        // Получаем текущие категории
        const categoriesMatch = mainJs.match(/const categories = ({[\s\S]*?});/);
        if (categoriesMatch) {
            let categoriesObj = eval('(' + categoriesMatch[1] + ')');
            
            // Находим и удаляем старый товар
            let oldCategory = '';
            for (const [cat, items] of Object.entries(categoriesObj)) {
                if (items[oldName]) {
                    oldCategory = cat;
                    delete items[oldName];
                    break;
                }
            }
            
            // Добавляем товар с новыми данными
            if (!categoriesObj[category]) {
                categoriesObj[category] = {};
            }
            categoriesObj[category][newName] = supplier;
            
            // Обновляем файл
            const updatedContent = mainJs.replace(
                /const categories = {[\s\S]*?};/,
                `const categories = ${JSON.stringify(categoriesObj, null, 4)};`
            );
            
            await fs.writeFile('./scripts/main.js', updatedContent);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Categories not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API для удаления товара
app.delete('/api/products/:name', async (req, res) => {
    try {
        const productName = req.params.name;
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        
        const categoriesMatch = mainJs.match(/const categories = ({[\s\S]*?});/);
        if (categoriesMatch) {
            let categoriesObj = eval('(' + categoriesMatch[1] + ')');
            
            // Находим и удаляем товар
            let found = false;
            for (const items of Object.values(categoriesObj)) {
                if (items[productName]) {
                    delete items[productName];
                    found = true;
                    break;
                }
            }
            
            if (found) {
                const updatedContent = mainJs.replace(
                    /const categories = {[\s\S]*?};/,
                    `const categories = ${JSON.stringify(categoriesObj, null, 4)};`
                );
                
                await fs.writeFile('./scripts/main.js', updatedContent);
                res.json({ success: true });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } else {
            res.status(404).json({ error: 'Categories not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/suppliers', async (req, res) => {
    try {
        const { name, phone } = req.body;
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        
        // Добавляем нового поставщика
        const suppliersMatch = mainJs.match(/const supplierPhones = ({[\s\S]*?});/);
        if (suppliersMatch) {
            let suppliersObj = eval('(' + suppliersMatch[1] + ')');
            suppliersObj[name] = phone;
            
            // Обновляем файл main.js
            const updatedContent = mainJs.replace(
                /const supplierPhones = {[\s\S]*?};/,
                `const supplierPhones = ${JSON.stringify(suppliersObj, null, 4)};`
            );
            
            await fs.writeFile('./scripts/main.js', updatedContent);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Suppliers not found' });
        }
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API для редактирования поставщика
app.put('/api/suppliers/:name', async (req, res) => {
    try {
        const { oldName, newName, phone } = req.body;
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        
        const suppliersMatch = mainJs.match(/const supplierPhones = ({[\s\S]*?});/);
        if (suppliersMatch) {
            let suppliersObj = eval('(' + suppliersMatch[1] + ')');
            
            // Удаляем старую запись и добавляем новую
            delete suppliersObj[oldName];
            suppliersObj[newName] = phone;
            
            const updatedContent = mainJs.replace(
                /const supplierPhones = {[\s\S]*?};/,
                `const supplierPhones = ${JSON.stringify(suppliersObj, null, 4)};`
            );
            
            await fs.writeFile('./scripts/main.js', updatedContent);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Suppliers not found' });
        }
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API для удаления поставщика
app.delete('/api/suppliers/:name', async (req, res) => {
    try {
        const supplierName = req.params.name;
        const mainJs = await fs.readFile('./scripts/main.js', 'utf-8');
        
        // Проверяем использование поставщика в товарах
        const categoriesMatch = mainJs.match(/const categories = ({[\s\S]*?});/);
        if (categoriesMatch) {
            const categoriesObj = eval('(' + categoriesMatch[1] + ')');
            let isUsed = false;

            // Проверяем все категории и товары
            for (const category of Object.values(categoriesObj)) {
                for (const supplier of Object.values(category)) {
                    if (supplier === supplierName) {
                        isUsed = true;
                        break;
                    }
                }
                if (isUsed) break;
            }

            if (isUsed) {
                return res.status(400).json({ 
                    error: 'Невозможно удалить поставщика, так как он используется в товарах. Сначала удалите или измените все товары этого поставщика.' 
                });
            }
        }

        // Удаляем поставщика
        const suppliersMatch = mainJs.match(/const supplierPhones = ({[\s\S]*?});/);
        if (suppliersMatch) {
            let suppliersObj = eval('(' + suppliersMatch[1] + ')');
            
            if (suppliersObj[supplierName]) {
                delete suppliersObj[supplierName];
                
                const updatedContent = mainJs.replace(
                    /const supplierPhones = {[\s\S]*?};/,
                    `const supplierPhones = ${JSON.stringify(suppliersObj, null, 4)};`
                );
                
                await fs.writeFile('./scripts/main.js', updatedContent);
                res.json({ success: true });
            } else {
                res.status(404).json({ error: 'Поставщик не найден' });
            }
        } else {
            res.status(404).json({ error: 'Список поставщиков не найден' });
        }
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API для загрузки прайс-листов
app.post('/api/price-lists', async (req, res) => {
    try {
        if (!req.files || !req.files.priceList) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.files.priceList;
        const filePath = path.join(__dirname, 'price-lists', file.name);
        
        await file.mv(filePath);
        res.json({ success: true, filename: file.name });
    } catch (error) {
        console.error('Error uploading price list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    const interfaces = require('os').networkInterfaces();
    const addresses = [];
    
    for (const iface of Object.values(interfaces)) {
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                addresses.push(alias.address);
            }
        }
    }
    
    console.log(`Server is running on port ${PORT}`);
    console.log('Access the app from your phone using one of these addresses:');
    addresses.forEach(addr => {
        console.log(`http://${addr}:${PORT}`);
    });
});
