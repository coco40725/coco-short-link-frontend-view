<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {storeToRefs} from "pinia";
import {handleLogout} from "@/appplication/cqrs/command/Logout/LogoutHandler";
import {validateAddLinkInfo} from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoValidate";
import {validateLogout} from "@/appplication/cqrs/command/Logout/LogoutValidate";
import {useToastAlertStore} from "@/domain/store/ToastAlert.store";
import {handleAddLinkInfo} from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoHandler";
const userInfoStore = useUserInfoStore()
const toastAlertStore = useToastAlertStore()
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
    const validateResult = validateLogout()
    if (!validateResult.isValid) {
        const msg = validateResult.errorMessage[0]
        toastAlertStore.setMsg(msg)
        toastAlertStore.openToast()
        return
    }

    // call api
    try {
        await handleLogout()
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
            li(v-for="link in links" :key="link.name" @click="clickNav(link.name)" :class="currentNav === `${link.name}` ? 'active': ''")  {{ link.text }}
    .nav-bar-right
        .guest(v-if="!isLogin")
            span.nav-link(@click="clickNav('Login')") 登入
        .user(v-else)
            span {{ user.name }}
            span.nav-link(@click="logout") 登出



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