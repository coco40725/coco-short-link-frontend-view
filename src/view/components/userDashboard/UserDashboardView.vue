<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {QueryFactory} from "@/application/cqrs/query/base/QueryFactory";
import {GetUserShortLinkQuery} from "@/application/cqrs/query/GetUserShortLinkInfo/GetUserShortLinkQuery";
import {createLinkModalStore, userInfoStore} from "@/main";
import EnableLinkInfo from "@/view/components/userDashboard/EnableLinkInfo.vue";
import CreateLinkInfo from "@/view/components/userDashboard/modal/CreateLinkInfo.vue";
import DisableLinkInfo from "@/view/components/userDashboard/DisableLinkInfo.vue";

const {user, isLogin, isShortLinkInfoLoaded, enabledShortLink, disabledShortLink} = storeToRefs(userInfoStore)
const { showModal } = storeToRefs(createLinkModalStore)
const router = useRouter()
const queryFactory = new QueryFactory()

// tab link
const tabLinks = ref([
    {
        id: "EnabledLink",
        name: "連結紀錄"
    },
    {
        id: "DisabledLink",
        name: "失效連結"
    },

])
const currentTab = ref(tabLinks.value[0].id)
const changeTab = (tabId: string) => {
    currentTab.value = tabId
}
const openCreateLinkModal = () => {
    console.log('open add link modal')
    createLinkModalStore.openModal()
}

onMounted(async () => {
    if (!isLogin.value) {
       await router.push({name: 'Login'})
    }
    const query = new GetUserShortLinkQuery()
    const handler = queryFactory.getQueryHandler(query)
    await handler.handle(query)
})
</script>

<template lang="pug">
create-link-info(v-if="showModal")
.dashboard(v-if="isLogin && isShortLinkInfoLoaded")
    .tab-container
        ul.tab-link
            li(v-for="tab in tabLinks" :key="tab.id" :class="{active: tab.id === currentTab}" @click="changeTab(tab.id)") {{ tab.name }}
            li
                .add-link(@click="openCreateLinkModal")
                    img(src="@/assets/icon/circle-plus.svg" alt="add")
                    span 添加連結
    .content-container
        enable-link-info(v-if="currentTab === 'EnabledLink'")
        disable-link-info(v-if="currentTab === 'DisabledLink'")
</template>

<style lang="sass" scoped>
.dashboard
    background-color: #f0f0f0
    padding: 20px

    .tab-container
        ul
            list-style-type: none
            padding: 0
            margin: 0
            display: flex
            li
                padding: 10px 20px
                cursor: pointer
                &.active
                    background-color: #ffcf49
                    color: black
    .content-container
        margin-top: 20px

    .add-link
        display: flex
        align-items: center
        cursor: pointer
        img
            width: 20px
            height: 20px
            margin-right: 5px

        &:hover
            text-decoration: underline


</style>