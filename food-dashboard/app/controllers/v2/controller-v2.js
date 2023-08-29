export const BASE_URL = "https://64d6fae32a017531bc12e71b.mockapi.io/Food";
const MON_CHAY = true;
const CON_MON = true;
let renderFoodList = (list) => {
  let contentHTML = "";
  list.reverse().forEach((food) => {
    let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhMon, moTa } = food;
    let trString = /*html*/ `  
    <tr>
                <td>${ma}</td>
                <td>${ten}</td>
                <td>${loai == MON_CHAY ? "Chay" : "<h5 class='text-danger'>Mặn</h5>"}</td>
                <td>${gia}</td>
                <td>${khuyenMai}</td>
                <td>0</td>
                <td>${tinhTrang == CON_MON ? "Còn" : "Hết "}</td>
                <td>

                <button class='btn btn-info' onclick='editFood(${ma})'>Sửa</button>
                <button  onclick='deleteFood(${ma})'  class='btn btn-danger'>Xoá</button>
                </td>
    </tr>
    `;
    contentHTML += trString;
  });
  document.getElementById("tbodyFood").innerHTML = contentHTML;
};
export let fetchFoodList = () => {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then((res) => {
      renderFoodList(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
export let showMessage = (message, isSuccess = true) => {
  Toastify({
    text: message,
    style: {
      background: isSuccess ? "green" : "red",
    },
  }).showToast();
};

export let showThongTinForm = (food) => {
  let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhMon, moTa } = food;
  document.getElementById("foodID").value = ma;
  document.getElementById("tenMon").value = ten;
  document.getElementById("loai").value = loai == MON_CHAY ? "loai1" : "loai2";
  document.getElementById("giaMon").value = gia;
  document.getElementById("khuyenMai").value = khuyenMai;
  document.getElementById("tinhTrang").value = tinhTrang ? "1" : "0";
  document.getElementById("hinhMon").value = hinhMon;
  document.getElementById("moTa").value = moTa;
};

export function layThongTinTuForm() {
  let ma = document.getElementById("foodID").value;
  let ten = document.getElementById("tenMon").value;
  let loai = document.getElementById("loai").value == "loai1";
  let gia = document.getElementById("giaMon").value;
  let khuyenMai = document.getElementById("khuyenMai").value;
  let tinhTrang = document.getElementById("tinhTrang").value == "1";
  let hinhMon = document.getElementById("hinhMon").value;
  let moTa = document.getElementById("moTa").value;
  return {
    ma,
    ten,
    loai,
    gia,
    khuyenMai,
    tinhTrang,
    hinhMon,
    moTa,
    tinhGiaKm: function () {
      return this.gia * (1 - this.khuyenMai);
    },
  };
}
