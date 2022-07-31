//------------Get : lấy dữ liệu từ server về--------

function layDuLieuProductApi() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
  });
  // XỬ LÝ THÀNH CÔNG
  promise.then(function (result) {
    console.log(result.data);
    renderProduct(result.data);
  });
  promise.catch(function (err) {});
}

window.onload = function () {
  layDuLieuProductApi();
};

function renderProduct(arrProduct) {
  var html = "";
  for (var i = 0; i < arrProduct.length; i++) {
    var pd = arrProduct[i];
    html += `
                <tr>
                    <td>${pd.id}</td>
                    <td><img style="width: 100%" src="${pd.img}" alt=""></td>
                    <td>${pd.name}</td>
                    <td>${pd.type}</td>
                    <td>${pd.price}</td>
                    <td>${pd.description}</td>
                    <td> 
                        <button class="btn btn-primary mr-2" onclick="chinhSua('${pd.id}')">Sửa</button>
                        <button class="btn btn-danger" onclick="xoaproductId('${pd.id}')">Xoá</button>
                    </td>
                </tr>

        `;
  }
  document.querySelector("#tblProduct").innerHTML = html;
}
// cập nhật dữ liệu
document.querySelector("#btnCreate").onclick = function () {
  var pd = new Product();
  pd.id = document.querySelector("#productId").value;
  pd.name = document.querySelector("#productName").value;
  pd.price = document.querySelector("#productPrice").value;
  pd.img = document.querySelector("#productImageLink").value;
  pd.description = document.querySelector("#productDescription").value;
  pd.type = document.querySelector("#type").value;
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct", // đường dẫn backend cung cấp
    method: "POST",
    data: pd, // dữ liệu gửi đi
  });
  promise.then(function (result) {
    console.log(result.data);

    layDuLieuProductApi();
  });
  promise.catch(function (error) {
    console.log(error);
  });
};
//xóa dữ liệu
function xoaproductId(maSPClick) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + maSPClick,
    method: "DELETE",
  });
  //THANH CÔNG
  promise.then(function (result) {
    console.log(result.data);

    layDuLieuProductApi();
  });
  //thất bại
  promise.catch(function (err) {});
}
// chỉnh sửa
function chinhSua(maSPClick) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + maSPClick,
    method: "GET",
  });
  // THÀNH CÔNG
  promise.then(function (result) {
    var pd = result.data;

    document.querySelector("#productId").value = pd.id;
    document.querySelector("#productName").value = pd.name;
    document.querySelector("#productPrice").value = pd.price;
    document.querySelector("#productImageLink").value = pd.img;
    document.querySelector("#productDescription").value = pd.description;
    document.querySelector("#type").value = pd.type;
  });

  //thất bại
  promise.catch(function (error) {
    console.log(error);
  });
}
//----------cap nhat ---------
document.querySelector("#btnUpdate").onclick = function () {
  var productUpdate = new Product();
  productUpdate.id = document.querySelector("#productId").value;
  productUpdate.name = document.querySelector("#productName").value;
  productUpdate.price = document.querySelector("#productPrice").value;
  productUpdate.img = document.querySelector("#productImageLink").value;
  productUpdate.description = document.querySelector(
    "#productDescription"
  ).value;
  productUpdate.type = document.querySelector("#type").value;

  //call api
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/UpdateProduct/" + productUpdate.id,
    method: "PUT",
    data: productUpdate,
  });
  promise.then(function (result) {
    //thành công

    layDuLieuProductApi();
  });

  promise.catch(function (err) {});
};

//----------search----------
document.querySelector("#btnSearch").onclick = function () {
  var search = document.querySelector("#searchName").value;
  //call api
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/SearchByName?name=" + search,
    method: "GET",
  });
  promise.then(function (result) {
    //thành công
    renderProduct(result.data);
    // layDuLieuProductApi();
  });

  promise.catch(function (err) {});
};
