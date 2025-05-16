function showPricList() {
    const content = document.getElementById('content');
    
    content.innerHTML = `
        <h2>Прайс-листы поставщиков</h2>
        <div style="display: grid; gap: 20px; margin-top: 20px;">
            <div class="price-list-container" style="padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                <div class="price-item" onclick="window.open('price-lists/GWS.pdf', '_blank')" style="cursor: pointer; display: flex; align-items: center;">
                    <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                    <span style="flex: 1;">GWS</span>
                </div>

                <div class="price-item" onclick="window.open('price-lists/KWS вино.pdf', '_blank')" style="cursor: pointer; margin-top: 15px; display: flex; align-items: center;">
                    <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                    <span style="flex: 1;">KWS вино</span>
                </div>

                <div class="price-item" onclick="window.open('price-lists/kws крепкое.pdf', '_blank')" style="cursor: pointer; margin-top: 15px; display: flex; align-items: center;">
                    <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                    <span style="flex: 1;">KWS крепкое</span>
                </div>

                <div class="price-item" onclick="window.open('price-lists/Респект вино.pdf', '_blank')" style="cursor: pointer; margin-top: 15px; display: flex; align-items: center;">
                    <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                    <span style="flex: 1;">Респект вино</span>
                </div>

                <div class="price-item" onclick="window.open('price-lists/Респект крепкое.pdf', '_blank')" style="cursor: pointer; margin-top: 15px; display: flex; align-items: center;">
                    <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                    <span style="flex: 1;">Респект крепкое</span>
                </div>

                <div class="price-item" onclick="window.open('price-lists/Крафт.pdf', '_blank')" style="cursor: pointer; margin-top: 15px; display: flex; align-items: center;">
                    <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                    <span style="flex: 1;">Крафт</span>
                </div>

                <div class="price-item" onclick="window.open('price-lists/Barbados.pdf', '_blank')" style="cursor: pointer; margin-top: 15px; display: flex; align-items: center;">
                    <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
                    <span style="flex: 1;">Barbados</span>
                </div>
            </div>
        </div>
    `;
}
