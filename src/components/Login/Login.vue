<template>
  <div class="login">
    <h1>网易云音乐</h1>
      <label
        >手机号:
        <input type="text"  ref="telephone" />
      </label>
      <label
        >密码:
        <input type="password"  ref="password" />
      </label>
      <button @click="login">登录</button>
  </div>
</template>

<script>
import { _login } from "@/axios/user";

import { onMounted,onUpdated } from '@vue/runtime-core';
import {ref,getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'

export default {
  name: "Login",
  setup() {
    let instance=null
    const router = useRouter()
    onMounted(()=>{
      instance=getCurrentInstance()
    })  
    function login() {
      _login(instance.refs.telephone.value,instance.refs.password.value).then((res) => {
        console.log(res);
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('userid',res.data.account.id)
        router.push('/home')
      });
    }
    return {
      login
    };
  },
};
</script>

<style lang="scss" scoped>
.login{
  width: 20rem;
  height: 10rem;
  background-color: #ccc;
  margin: 10rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
