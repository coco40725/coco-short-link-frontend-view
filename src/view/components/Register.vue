<script lang="ts" setup>

import {GoogleLogin} from "vue3-google-login";

const register = () => {}

</script>

<template lang="pug">
.login-signup-modal
    .modal-content
        h2 開始使用
        form(@submit.prevent="handleSubmit")
            .form-group
                label(for="email") 名稱
                input#email(type="text" v-model="username" required)

            .form-group
                label(for="email") Email
                input#email(type="email" v-model="email" required)

            .form-group
                label(for="password") 密碼
                input#password(type="password" v-model="password" required)

            button(type="submit") 註冊

        p 已經有帳號了嗎？
            router-link(to="/login", tag="a") 登入
        router-link(to="/", tag="a") 返回首頁
</template>

<style lang="sass" scoped>
.login-signup-modal
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #f0f0f0
    display: flex
    justify-content: center
    align-items: center
    z-index: 1000
    .modal-content
        background-color: #fff
        padding: 30px
        border-radius: 10px
        text-align: center
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
        width: 470px
        h2
            font-size: 1.5rem
            margin-bottom: 20px


        .social-logins
            display: flex
            justify-content: center
            margin-bottom: 20px

            button
                background-color: #eee
                border: none
                padding: 10px 15px
                border-radius: 5px
                display: flex
                align-items: center
                cursor: pointer
                margin: 0 5px

                img
                    width: 20px
                    height: 20px
                    margin-right: 10px

        form
            .form-group
                margin-bottom: 15px
                text-align: left
                label
                    display: block
                    margin-bottom: 5px


                input
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
.divider
    &::before
        background: #dee2e6
        position: absolute
        content: ""
        height: 1px
        width: 13%
        top: 44%
        left: 52%
    &::after
        background: #dee2e6
        position: absolute
        content: ""
        height: 1px
        width: 13%
        top: 44%
        left: 35%
form
    margin-top: 20px

button[type="submit"]
    background-color: #4CAF50
    color: white
    border: none
    padding: 10px 20px
    border-radius: 5px
    cursor: pointer

    p
        margin-top: 20px
a
    color: #007bff
    text-decoration: none
    cursor: pointer

    &:hover
        text-decoration: underline

</style>