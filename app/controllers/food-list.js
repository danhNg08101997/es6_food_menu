import { Menu } from "../models/Menu.js";
import { LOAI_MON } from "../data/LoaiMon.js";
import { TINH_TRANG } from "../data/TinhTrang.js";
import { MonAn } from "../models/MonAn.js";

let menu = new Menu();
menu.layLocalStorage();

let renderMonAn = (mangMonAn) => {
  //input: [{}, {},...]
  //output: html  <tr>...</tr>  <tr>...</tr>
  let html = "";
  for (let monAn of mangMonAn) {
    //monAn => lấy localStorage (không có phương thức)
    let monProto = new MonAn();
    monAn = { ...monProto, ...monAn };

    html += `
        <tr>
        <td>${monAn.maMon}</td>
        <td>${monAn.tenMon}</td>
        <td>${LOAI_MON[monAn.loai]}</td>
        <td>${monAn.giaMon}</td>
        <td>${monAn.khuyenMai}</td>
        <td>${monAn.tinhGiaKhuyenMai()}</td>
        <td>${TINH_TRANG[monAn.tinhTrang]}</td>
        <td>
        <button class="btn btn-danger" onclick="xoaMonAn('${
          monAn.maMon
        }')">Xóa</button>
        <button class="btn btn-info" data-target="#exampleModal" data-toggle="modal" onclick = "layThongTinMonAn('${
          monAn.maMon
        }')">Sửa</button>
        </td>
        </tr>
        `;
  }
  //hiển thị output ra giao diện
  document.querySelector("#tbodyFood").innerHTML = html;
};

window.xoaMonAn = (maMon) => {
  menu.xoaMonAn(maMon);
  renderMonAn(menu.mangMonAn);
};
window.layThongTinMonAn = (maMon) => {
  let ttMon = menu.layThongTinMonAn(maMon);
  if (ttMon) {
    //tìm thấy
    let arrInput = document.querySelectorAll(
      "#foodForm input, #foodForm select, #foodForm textarea"
    );
    for (let input of arrInput) {
      let { id } = input;
      input.value = ttMon[id];
    }
  }
};
document.querySelector("#btnCapNhat").onclick = function () {
  //lấy tất cả dữ liệu giao diện khi người dùng thay dổi lưu vào biến monAn
  let monAnUpdate = new MonAn();
  let arrInput = document.querySelectorAll(
    "#foodForm input, #foodForm select, #foodForm textarea"
  );
  for (let input of arrInput) {
    let { id, value } = input;
    monAnUpdate[id] = value;
  }
  //   console.log(monAnUpdate)
  // cập nhật lại món từ giao diện sau khi người dùng thay đổi ứng với phần tử trong mảng
  menu.capNhatMonAn(monAnUpdate.maMon, monAnUpdate);
  menu.luuLocalStorage();
  renderMonAn(menu.mangMonAn);
};

window.onload = function () {
  //gọi hàm sau khi giao diện load
  renderMonAn(menu.mangMonAn);
};
