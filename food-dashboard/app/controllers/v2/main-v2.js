
import {
  BASE_URL,
  fetchFoodList,
  layThongTinTuForm,
  showMessage,
  showThongTinForm,
} from "./controller-v2.js";

fetchFoodList();

let deleteFood = (id) => {
  console.log(id);
  axios
    .delete(`${BASE_URL}/${id}`)
    .then((res) => {
      fetchFoodList();
      showMessage("Xoá thành công");
    })
    .catch((err) => {
      console.log(err);
      showMessage("Đã có lỗi xảy ra", false);
    });
};
window.deleteFood = deleteFood;

let addFood = () => {
  let data = layThongTinTuForm();
  axios
    .post(BASE_URL, data)
    .then((res) => {
      console.log(res);
      $("#exampleModal").modal("hide");
      showMessage("Thêm thành công");
      fetchFoodList();
    })
    .catch((err) => {
      console.log(err);
    });
};
window.addFood = addFood;

window.editFood = (id) => {
  $("#exampleModal").modal("show");
  document.getElementById("foodID").readOnly = true;
  let url = `${BASE_URL}/${id}`;
  axios
    .get(url)
    .then((res) => {
      console.log(res);
      showThongTinForm(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.updateFood = () => {
  let data = layThongTinTuForm();
  axios
    .put(`${BASE_URL}/${data.ma}`, data)
    .then((res) => {
      console.log(res);
      $("#exampleModal").modal("hide");
      showMessage("update thành công");
      fetchFoodList();
    })
    .catch((err) => {
      console.log(err);
    });
};
