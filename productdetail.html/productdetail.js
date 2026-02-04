let product = {};       
let currentSize = "40"; 
let quantity = 1;       
let unitPrice = 0;      

window.onload = function() {
    const data = localStorage.getItem('view_product');
    
    if (data) {
        try {
            product = JSON.parse(data);
            unitPrice = product.price; 

            document.getElementById('detail-name').innerText = product.name;
            document.getElementById('detail-img').src = product.image;
            document.getElementById('detail-price').innerText = formatMoney(unitPrice);
            
            if(product.description) {
                document.getElementById('detail-desc').innerText = product.description;
            }

            calculateTotal();
        } catch (e) {
            console.error("Lỗi đọc dữ liệu sản phẩm:", e);
        }
    } else {
        alert("Vui lòng chọn sản phẩm từ trang chủ!");
        window.location.href = "../index1.html";
    }
};

function formatMoney(num) {
    return num.toLocaleString('vi-VN') + ' VNĐ';
}

function selectSize(element) {
    document.querySelectorAll('.size-box').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    currentSize = element.innerText;
    document.getElementById('size-display').innerText = currentSize;
}

function updateQty(change) {
    let newQty = quantity + change;
    if (newQty < 1) return;
    if (newQty > 10) {
        alert("Bạn chỉ được mua tối đa 10 sản phẩm!");
        return;
    }
    quantity = newQty;
    document.getElementById('qty-value').innerText = quantity;
    calculateTotal();
}

function calculateTotal() {
    let total = unitPrice * quantity;
    document.getElementById('total-price').innerText = formatMoney(total);
}

function processPayment() {
    const orderInfo = {
        id: product.id || Date.now(),
        name: product.name,
        image: product.image,
        price: unitPrice,      
        quantity: quantity,   
        size: currentSize,     
        total: unitPrice * quantity 
    };

    localStorage.setItem('buy_now_item', JSON.stringify(orderInfo));

    window.location.href = "/Thanh toán/thanhtoan.html"; 
}
