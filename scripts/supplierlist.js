
function showSupplierList() {
    const content = document.getElementById('content');
    
    content.innerHTML = `
        <h2>Список поставщиков</h2>
        <div style="display: grid; gap: 20px; margin-top: 20px;">
            ${Object.entries(supplierPhones).map(([supplier, phone]) => `
                <div style="padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <h3>${supplier}</h3>
                    <p>
                        Телефон: ${phone}
                        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" 
                           target="_blank" 
                           style="margin-left: 50px; color: #25D366; text-decoration: none;">
                            <i class="fab fa-whatsapp fa-lg"></i>
                        </a>
                          <a href="tel:${phone.replace(/[^0-9]/g, '')}" 
                           style="margin-left: 30px; color: #007bff;">
                            <i class="fas fa-phone fa-lg"></i>
                        </a>
                    </p>
                </div>
            `).join('')}
        </div>
    `;
}