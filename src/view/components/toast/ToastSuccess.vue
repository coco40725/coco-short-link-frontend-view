<script lang="ts" setup>
import {useToastAlertStore} from "@/domain/store/ToastAlert.store";
import {storeToRefs} from "pinia";
import {toastSuccessStore} from "@/main";

const { msg, showToast } = storeToRefs(toastSuccessStore)

</script>

<template lang="pug">
.success(v-if="showToast")
    span.closeBtn(@click="toastSuccessStore.closeToast()") &times;
    strong {{ msg }}
</template>

<style lang="sass" scoped>
.success
    display: block
    position: absolute
    left: 50%
    top: 5%
    padding: 15px
    background-color: rgba(207, 240, 206, 0.6)
    border-radius: 5px
    color: #167201
    margin-bottom: 15px

    .closeBtn
        margin-left: 15px
        color: white
        font-weight: bold
        float: right
        font-size: 22px
        line-height: 20px

        cursor: pointer
        transition: 0.3s
        &:hover
            color: black

</style>