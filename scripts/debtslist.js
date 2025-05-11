const debtsData = {
    debts: [],
    fileHandle: null,
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    addDebt(name, products) {
        this.debts.push({ name, products });
        this.saveToFile();
    },

    deleteDebt(name) {
        this.debts = this.debts.filter(debt => debt.name !== name);
        this.saveToFile();
    },

    updateDebt(name, products) {
        const index = this.debts.findIndex(debt => debt.name === name);
        if (index !== -1) {
            this.debts[index] = { name, products };
            this.saveToFile();
        }
    },

    getAllDebts() {
        return this.debts;
    },

    async saveToFile() {
        if (this.isMobile()) {
            // Сохранение для мобильных устройств
            try {
                localStorage.setItem('debts', JSON.stringify(this.debts));
            } catch (error) {
                console.error('Ошибка при сохранении в localStorage:', error);
            }
            return;
        }

        // Существующий код для десктопа
        try {
            if (!this.fileHandle) {
                this.fileHandle = await this.getFileHandle();
            }
            const writable = await this.fileHandle.createWritable();
            await writable.write(JSON.stringify(this.debts, null, 2));
            await writable.close();
        } catch (error) {
            console.error('Ошибка при сохранении файла:', error);
        }
    },

    async loadFromStorage() {
        if (this.isMobile()) {
            // Загрузка для мобильных устройств
            try {
                const saved = localStorage.getItem('debts');
                this.debts = saved ? JSON.parse(saved) : [];
            } catch (error) {
                console.error('Ошибка при чтении из localStorage:', error);
                this.debts = [];
            }
            return;
        }

        // Существующий код для десктопа
        try {
            if (!this.fileHandle) {
                const [handle] = await window.showOpenFilePicker({
                    types: [{
                        description: 'JSON Files',
                        accept: { 'application/json': ['.json'] },
                    }],
                });
                this.fileHandle = handle;
            }
            
            const file = await this.fileHandle.getFile();
            const text = await file.text();
            this.debts = JSON.parse(text);
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
            this.debts = [];
            // Если файл не выбран, создаем новый
            this.fileHandle = await this.getFileHandle();
            await this.saveToFile();
        }
    },

    async getFileHandle() {
        const options = {
            suggestedName: 'debts.json',
            types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] },
            }],
        };
        
        return await window.showSaveFilePicker(options);
    }
};

export default debtsData;