import { MonAn } from "../models/MonAn.js";
import { Menu } from "../models/Menu.js";

let menu = new Menu();
menu.layLocalStorage();
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
      if (key === "hinhMon") {
        html += `
            <li class = "list-group-item d-flex justify-content-between lh-condensed">
            <div>
            <h6 class="my-0">${key}</h6>
            </div>
            <span id="text_${key}" class="text-muted">
            <img src="${mon[key]}" width = "200px" height = "50px"/>
            </span>
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
  }

  //dom đến thẻ ul dựa vào querySelector
  document.querySelector("main .list-group").innerHTML = html;

  //lưu món ăn vào mảng món ăn
  menu.themMonAn(mon);
  menu.luuLocalStorage();

  //   mangMonAn.push(mon);
  //sau khi thêm món ăn thì lưu mảng món ăn vào storage
  //   luuLocalStrorage();
};
// function luuLocalStrorage() {
//   //biến mangMonAn thành chuỗi sau đó đem chuỗi lưu vào localStorage
//   localStorage.setItem("mangMonAn", JSON.stringify(mangMonAn));
// }
// function layLocalStorage() {
//   if (localStorage.getItem("mangMonAn")) {
//     mangMonAn = JSON.parse(localStorage.getItem("mangMonAn"));
//   }
// }

// window.onload = function () {
//   layLocalStorage();
// };
