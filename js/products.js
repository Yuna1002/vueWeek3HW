const url = "https://vue3-course-api.hexschool.io/v2";
const path = "yuna1002";

let productModal = "";
let delProductModal = "";
//1.生命週期mounted:modal實體化
//2.method:openModel()
//3.新增產品、編輯產品 modal按鈕為同一個 updateProduct
//4.刪除

const app = {
  data() {
    return {
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          //console.log(res.data);
          this.getData();
        })
        .catch((err) => {
          console.dir(err);
          window.location = "login.html";
        });
    },
    getData() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
          //console.log(this.products);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    openModal(isNew, item) {
      if (isNew === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },

    updateProduct() {
      if (this.isNew == true) {
        axios
          .post(`${url}/api/${path}/admin/product`, {
            data: this.tempProduct,
          })
          .then((res) => {
            //console.log(res);
            alert("新增成功");
            productModal.hide();
            this.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`, {
            data: this.tempProduct,
          })
          .then((res) => {
            //console.log(res);
            alert("修改成功");
            productModal.hide();
            this.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    delProduct() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          //console.log(res);
          alert("刪除成功");
          delProductModal.hide();
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    //1.modal實體化：透過JS開啟modal
    productModal = new bootstrap.Modal(document.getElementById("productModal"));
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );

    // 取得token:當cookie有token時，取得token,放進headers裡
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)yunaToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //console.log(token);
    //放進headers裡
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();
  },
};

Vue.createApp(app).mount("#app");
