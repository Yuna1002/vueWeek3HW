const url = "https://vue3-course-api.hexschool.io/v2";
const { createApp } = Vue;
const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          //console.log(res.data);
          const { token, expired } = res.data;
          //將token, expired儲存在cookie
          document.cookie = `yunaToken=${token}; expires=${new Date(expired)}`;
          window.location = "products.html";
        })
        .catch((err) => {
          //console.dir(err);
          if (err.data.success == false) {
            alert("輸入錯誤，請重新輸入");
            this.user.username = "";
            this.user.password = "";
          }
        });
    },
  },
};

createApp(app).mount("#app");
