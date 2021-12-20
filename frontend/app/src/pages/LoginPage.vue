<template>
  <v-card v-if="isLoginForm" class="mx-auto" max-width="400" style="margin-top:50px">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Thông tin đăng nhập</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Tài khoản"
          name="username"
          type="text"
          v-model="username"
        />
        <v-text-field
          label="Mật khẩu"
          name="password"
          @click:append="() => (passwordValue = !passwordValue)"
          :type="passwordValue ? 'text' : 'password'"
          v-model="password"
          @keyup.enter="login"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="gotoSignUp">Đăng ký</v-btn>
      <v-btn color="primary" @click="login">Đăng nhập</v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-else class="mx-auto" max-width="600" style="margin-top:50px">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Thông tin đăng ký</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col md6>
            <v-text-field
              label="Tài khoản"
              name="username"
              type="text"
              v-model="registerInfo.username"
            />
            <v-text-field
              label="Mật khẩu"
              name="password"
              type="password"
              v-model="registerInfo.password"
            />
            <v-text-field
              label="Nhập lại mật khẩu"
              name="retypepassword"
              type="password"
              v-model="registerInfo.retypePassword"
            />
          </v-col>
          <v-col md6>
            <v-text-field
              label="Tên"
              name="first_name"
              type="text"
              v-model="registerInfo.first_name"
            />
            <v-text-field label="Họ" name="last_name" type="text" v-model="registerInfo.last_name" />
            <v-text-field
              label="Số điện thoại"
              name="phone_number"
              type="text"
              v-model="registerInfo.phone_number"
            />
            <v-text-field label="Email" name="email" type="text" v-model="registerInfo.email" />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="gotoSignin">Trở về</v-btn>
      <v-btn color="primary" @click="signup">Đăng ký</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoginForm: true,
      registerInfo: {
        username: "",
        password: "",
        retypePassword: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
      },
      passwordValue: false
    };
  },
  created() {
    this.$store.dispatch("setPageTitle", "Đăng nhập");
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push("/").catch(e=>{
            console.log(e);
          });
        })
        .catch(() => {
          alert("Thông tin đăng nhập không đúng")
        });
    },
    signup() {
      if (
        this.registerInfo.username == "" ||
        this.registerInfo.password == "" ||
        this.registerInfo.retypePassword == "" ||
        this.registerInfo.first_name == "" ||
        this.registerInfo.last_name == "" ||
        this.registerInfo.phone_number == "" ||
        this.registerInfo.email == ""
      ) {
        alert("Vui lòng điền đầy đủ thông tin")
      } else if (
        this.registerInfo.password != this.registerInfo.retypePassword
      ) {
        alert("Mật khẩu không giống nhau")
      } else {
        let data = this.prepareSignupData();
        let serverDomain = this.$store.getters.getServerDomain;
        let authenBucket = this.$store.getters.getAuthenBucket;
        let api = "/api/core/v1/user/register/" + authenBucket;
        let url = serverDomain + api;
        let config = {
          headers: this.$store.getters.getAuthConfig
        };

        // call api create a new account
        axios
          .post(url, data, config)
          .then(response => {
            if (response.data.code == "0") {
              alert("Tài khoản đã được tạo")
              this.registerInfo.username = "";
              this.registerInfo.password = "";
              this.registerInfo.retypePassword = "";
              this.registerInfo.first_name = "";
              this.registerInfo.last_name = "";
              this.registerInfo.phone_number = "";
              this.registerInfo.email = "";
            } else {
              alert("Đăng ký không thành công");
            }
          })
          .catch(() => {
            alert("Đăng ký không thành công");
          });
      }
    },
    prepareSignupData() {
      return {
        username: this.registerInfo.username,
        password: this.registerInfo.password,
        first_name: this.registerInfo.first_name,
        last_name: this.registerInfo.last_name,
        phone_number: this.registerInfo.phone_number,
        email: this.registerInfo.email
      };
    },
    gotoSignUp() {
      this.isLoginForm = false;
      this.username = "";
      this.password = "";
    },
    gotoSignin() {
      this.isLoginForm = true;
      this.registerInfo.username = "";
      this.registerInfo.password = "";
      this.registerInfo.retypePassword = "";
    }
  }
};
</script>