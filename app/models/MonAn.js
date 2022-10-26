/*
trong model không thực hiện bất kỳ lệnh dom nào, nếu có thì phải có tham số 
*/

export class MonAn {
  maMon = "";
  tenMon = "";
  loai = "";
  giaMon = 0;
  khuyenMai = 0;
  tinhTrang = true;
  hinhMon = "";
  moTa = "";

  //vì không áp dụng kế thừa nên xây dụng phương thức = thuộc tính function
  tinhGiaKhuyenMai = function () {
    let giaKhuyenMai =
      Number(this.giaMon) - (Number(this.khuyenMai) * this.giaMon) / 100;
    return giaKhuyenMai;
  };
}
