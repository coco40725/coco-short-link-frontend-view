<script setup>
import {useUserInfoStore} from "@/domain/store/UserInfo.store.ts";
import {onMounted} from "vue";

const userInfoStore = useUserInfoStore()

onMounted(() => {
    userInfoStore.login()
})
</script>

<template lang="pug">
router-view
</template>

<style scoped>

</style>
