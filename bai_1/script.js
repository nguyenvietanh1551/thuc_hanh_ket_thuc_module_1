function TinhTrungBinh() {
    const input = document.getElementById("inputArray").value.trim();
    const arr = input.replace(/[^\d\s,-]/g, '').split(',').map(Number);
    if (arr.length > 50) {
        document.getElementById("result").textContent = "Mảng có quá 50 phần tử. Vui lòng nhập lại.";
        return;
    }
    let sum = 0;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0 && arr[i] % 2 !== 0) {
            sum += arr[i];
            count++;
        }
    }
    const result = document.getElementById("result");
    if (count > 0) {
        let average = sum / count;
        result.textContent = "Trung bình cộng các số lẻ ở vị trí chẵn là: " + average;
    } else {
        result.textContent = "Không có số lẻ nào ở vị trí chẵn.";
    }
}
