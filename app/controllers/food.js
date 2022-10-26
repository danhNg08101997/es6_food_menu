import { MonAn } from "../models/MonAn.js";

//xây dựng chức năng cho nút thêm món
document.getElementById("btnThemMon").onclick = function () {
  //lấy thông tin input từ người dùng (mã món, tên món,...)
  let mon = new MonAn();

  let arrInput = document.querySelectorAll(
    "#foodForm input, #foodForm select, #foodForm textarea"
  );
  for (let input of arrInput) {
    //for of dùng để duyệt từng item của mảng
    //lấy ra id và value của thẻ
    //cú pháp bóc tách phần tử
    let { id, value } = input;
    mon[id] = value;
  }
  console.log("mon:", mon);
  //cách1: dom đến các id trên li => gán giá trị
  //Tạo ra các thẻ li trên giao diện đưa vào ul
  let html = ""; //{maMon:1, tenMon:'cơm chiên', loaiMon:"loai1",...}
  for (let key in mon) {
    //for in dùng để duyệt object = {}
    if (typeof mon[key] === "function") {
      html += `
    <li class = "list-group-item d-flex justify-content-between lh-condensed">
    <div>
    <h6 class="my-0">${key}</h6>
    </div>
    <span id="text_${key}" class="text-muted">${mon[key]()}</span>
    </li>
    `;
    } else {
      html += `
    <li class = "list-group-item d-flex justify-content-between lh-condensed">
    <div>
    <h6 class="my-0">${key}</h6>
    </div>
    <span id="text_${key}" class="text-muted">${mon[key]}</span>
    </li>
    `;
    }
  }

  //dom đến thẻ ul dựa vào querySelector
  document.querySelector("main .list-group").innerHTML = html;
};
