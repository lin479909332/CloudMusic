<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号码" />
      <input type="password" name="password" class="password" v-model="password" placeholder="请输入密码" />
      <button class="btn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { getLoginUser } from "@/request/api/home"
export default {
  data() {
    return {
      phone: "",
      password: ""
    }
  },
  methods: {
    async login() {
      let res = await this.$store.dispatch("getLogin", { phone: this.phone, password: this.password })
      //console.log(res);
      if (res.data.code == 200) {
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        this.$store.commit("updateUser", result);
        this.$router.push("/infoUser");
      } else {
        alert("手机号码或者密码错误");
        this.password = "";
      }
    }
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);

  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }

  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;

    .phone,
    .password {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }

    .btn {
      width: 2rem;
      height: .6rem;
    }
  }
}
</style>
