let items = [];

function addItem() {
    const desc = document.getElementById("itemDesc").value;
    const qty = parseInt(document.getElementById("itemQty").value);
    const price = parseFloat(document.getElementById("itemPrice").value);

    if (!desc || qty <= 0 || price < 0) {
        alert("請輸入正確的品項、數量和單價！");
        return;
    }

    items.push({ desc, qty, price });
    updateInvoice();
}

function updateInvoice() {
    document.getElementById("previewCompany").innerText = document.getElementById("companyName").value || "公司名稱";
    document.getElementById("previewClient").innerText = document.getElementById("clientName").value || "---";
    document.getElementById("previewNumber").innerText = document.getElementById("invoiceNumber").value || "---";
    document.getElementById("previewDate").innerText = document.getElementById("invoiceDate").value || "---";

    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    let total = 0;
    items.forEach(item => {
        const row = document.createElement("tr");
        const subtotal = item.qty * item.price;
        total += subtotal;

        row.innerHTML = `
            <td>${item.desc}</td>
            <td>${item.qty}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        itemList.appendChild(row);
    });

    document.getElementById("totalAmount").innerText = total.toFixed(2);
}

function generatePDF() {
    const invoice = document.getElementById("invoice");
    html2pdf().from(invoice).save("invoice.pdf");
}
