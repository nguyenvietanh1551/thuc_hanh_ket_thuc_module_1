const danhSachSach = [];

function openForm() {
    new bootstrap.Modal('#formPopup').show();
}

function openAddStockForm() {
    new bootstrap.Modal('#addStockForm').show();
}

function filterTable() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    document.querySelectorAll('#bookTable tbody tr').forEach(row => {
        const title = row.cells[1].innerText.toLowerCase();
        row.style.display = title.includes(query) ? '' : 'none';
    });
}

function hienThiDanhSach() {
    const tbody = document.querySelector('#bookTable tbody'); tbody.innerHTML = '';
    danhSachSach.forEach(s => {
        tbody.innerHTML += `<tr>
      <td>${s.maSach}</td>
      <td>${s.tenSach}</td>
      <td>${s.namXuatBan}</td>
      <td>${s.soQuyen}</td>
      <td>${s.soLuongBanDau}</td>
      <td>${s.soLanMuon}</td>
      <td>${s.tinhTrang ? '<span class="badge bg-success">Còn</span>' : '<span class="badge bg-danger">Hết</span>'}</td>
    </tr>`;
    });
    document.getElementById('mainTitle').innerText = 'Quản lý sách';
    document.getElementById('backButton').style.display = 'none';
    hienThiSachNhieuMuon();
}
// Hàm thêm sách mới vào danh sách
function submitForm() {
    // Lấy dữ liệu từ form
    const ma = document.getElementById('maSach').value.trim();
    const ten = document.getElementById('tenSach').value.trim();
    const nam = document.getElementById('namXuatBan').value.trim();
    const so = parseInt(document.getElementById('soQuyen').value, 10);

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!/^[0-9]{5}$/.test(ma)) return alert('Mã sách không hợp lệ');
    if (!ten) return alert('Tên sách không được để trống');
    if (!/^[0-9]{4}$/.test(nam)) return alert('Năm xuất bản không hợp lệ');
    if (isNaN(so) || so < 0) return alert('Số quyển không hợp lệ');

    // Thêm sách vào danh sách
    danhSachSach.push({
        maSach: ma,
        tenSach: ten,
        namXuatBan: nam,
        soQuyen: so,
        soLuongBanDau: so,
        soLanMuon: 0,
        tinhTrang: so > 0
    });

    // Đóng form và cập nhật giao diện
    bootstrap.Modal.getInstance('#formPopup').hide();
    hienThiDanhSach();
}

// Hàm mượn sách
function muonSach() {
    const ma = prompt('Nhập mã sách mượn:');
    const sach = danhSachSach.find(x => x.maSach === ma);

    if (!sach) {
        return alert('Không tìm thấy sách');
    }

    // Kiểm tra số lượng sách còn
    if (sach.soQuyen > 0) {
        sach.soQuyen--;
        sach.soLanMuon++;
        if (sach.soQuyen === 0) sach.tinhTrang = false;
        alert('Mượn sách thành công!');
    } else {
        alert('Sách đã hết!');
    }

    hienThiDanhSach();
}

// Hiển thị danh sách sách đã mượn
function hienThiDanhSachMuon() {
    const ds = danhSachSach.filter(s => s.soLanMuon > 0);

    if (!ds.length) return alert('Chưa có sách nào được mượn');

    const tbody = document.querySelector('#bookTable tbody');
    tbody.innerHTML = '';  // Xóa dữ liệu cũ

    // Hiển thị danh sách sách đã mượn
    ds.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td>${s.maSach}</td>
                <td>${s.tenSach}</td>
                <td>${s.namXuatBan}</td>
                <td>${s.soQuyen}</td>
                <td>${s.soLuongBanDau}</td>
                <td>${s.soLanMuon}</td>
                <td>
                    ${s.tinhTrang ?
            '<span class="badge bg-success">Còn</span>' :
            '<span class="badge bg-danger">Hết</span>'}
                </td>
            </tr>
        `;
    });

    document.getElementById('mainTitle').innerText = 'Thông tin mượn sách';
    document.getElementById('backButton').style.display = 'inline-block';
}

// Hiển thị sách mượn nhiều nhất
function hienThiSachNhieuMuon() {
    if (!danhSachSach.length) {
        return document.getElementById('sachNhieuMuon').innerText = '';
    }

    const max = Math.max(...danhSachSach.map(s => s.soLanMuon));
    const ds = danhSachSach.filter(s => s.soLanMuon === max && max > 0);

    document.getElementById('sachNhieuMuon').innerText = ds.length
        ? `Sách mượn nhiều nhất: ${ds.map(x => x.tenSach).join(', ')} (${max} lần)`
        : '';
}

// Quay lại danh sách sách
function goBack() {
    hienThiDanhSach();
}

// Lưu số lượng sách thêm
document.getElementById('saveBook').addEventListener('click', submitForm);

// Cập nhật số lượng sách
document.getElementById('updateStock').addEventListener('click', () => {
    const ma = document.getElementById('maSachAdd').value.trim();
    const them = parseInt(document.getElementById('soLuongAdd').value.trim(), 10);

    const sach = danhSachSach.find(x => x.maSach === ma);

    if (!sach) return alert('Không tìm thấy sách');
    if (isNaN(them) || them < 1) return alert('Số lượng thêm không hợp lệ');

    // Cập nhật số lượng sách
    sach.soQuyen += them;
    sach.soLuongBanDau += them;
    sach.tinhTrang = true;

    // Đóng form và cập nhật danh sách
    bootstrap.Modal.getInstance('#addStockForm').hide();
    hienThiDanhSach();
});

// Hiển thị danh sách sách khi tải trang
window.onload = hienThiDanhSach;
