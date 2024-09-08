<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {LogoutCommand} from "@/application/cqrs/command/Logout/LogoutCommand";
import {commandFactory, toastAlertStore, userInfoStore} from "@/main";
const {user, isLogin} = storeToRefs(userInfoStore)

const route = useRoute()
const router = useRouter()
const currentNav = ref('Home')
const links = ref([
    { text: '首頁', name: 'Home' },
    { text: '管理網址', name: 'User' },
    { text: '網站架構', name: 'SystemDesign' },
    { text: '聯絡我們', name: 'Contact' },
])

const clickNav = (name: string) => {
    currentNav.value = name
    router.push({
        name: name,
    })
}
const logout = async () => {
    const command = new LogoutCommand()
    const validator = commandFactory.getCommandValidator(command)
    const handler = commandFactory.getCommandHandler(command)
    const validateResult = validator.validate(command)
    if (!validateResult.isValid) {
        const errorCode = validateResult.errorCode[0]
        const msg = validator.getValidationMessage(errorCode)
        toastAlertStore.setMsg(msg)
        toastAlertStore.openToast()
        return
    }

    // call api
    try {
        await handler.handle(command)
        await router.push({name: 'Home'})

    } catch (e) {
        console.log(e)
        toastAlertStore.setMsg("請求失敗，請稍後再試")
        toastAlertStore.openToast()
    }
}

onMounted(() => {
    currentNav.value = route.name as string
})

</script>

<template lang="pug">
nav.nav-bar
    .nav-bar-left
        .logo
            img(src="@/assets/logo.svg" alt="Logo")
        ul.nav-links-container
            li(v-for="link in links" :key="link.name" :data-key="link.name" @click="clickNav(link.name)" :class="currentNav === `${link.name}` ? 'active': ''")  {{ link.text }}
    .nav-bar-right
        .guest(v-if="!isLogin")
            span#login.nav-link(@click="clickNav('Login')") 登入
        .user(v-else)
            span {{ user.name }}
            span#logout.nav-link(@click="logout") 登出



</template>

<style lang="sass" scoped>

.nav-bar
    background-color: #f8f8f8
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0.5rem

.nav-bar-left
    display: flex
    align-items: center

.logo img
    height: 3rem


.nav-links-container
    list-style: none
    display: flex
    li
        margin-left: 2rem
        cursor: pointer
        &:hover
            color: rgba(30, 46, 224)
        &.active
            color: rgba(30, 46, 224)
            font-weight: bold
            text-decoration: underline
.nav-bar-right
    span
        margin-right: 1rem
    span.nav-link
        cursor: pointer
        &:hover
            color: rgba(30, 46, 224)



.actions button
    margin-left: 1rem
</style>