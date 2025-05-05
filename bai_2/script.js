function tinhtong(n) {
    if (n <= 1) return 0;
    let tong = 1;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            tong += i;
            let j = n / i;
            if (j !== i) tong += j;
        }
    }
    return tong;
}
function CapSoThanThiet(a, b) {
    if (a === b) return false;
    return tinhtong(a) === b && tinhtong(b) === a;
}
function kiemTraCapSoThanThiet() {
    const a = parseInt(document.getElementById('soA').value, 10);
    const b = parseInt(document.getElementById('soB').value, 10);
    const ketQuaDiv = document.getElementById('ketQua');

    if (CapSoThanThiet(a, b)) {
        ketQuaDiv.textContent = `(${a}, ${b}) là cặp số thân thiết.`;
    } else {
        ketQuaDiv.textContent = `(${a}, ${b}) không phải cặp số thân thiết.`;
    }
}
