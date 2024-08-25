<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {toastAlertStore} from "@/main";

const { msg, showToast } = storeToRefs(toastAlertStore)

</script>

<template lang="pug">
.alert(v-if="showToast")
    span.closeBtn(@click="toastAlertStore.closeToast()") &times;
    strong {{ msg }}
</template>

<style lang="sass" scoped>
.alert
    display: block
    position: absolute
    left: 50%
    top: 5%
    padding: 15px
    background-color: rgba(219, 112, 147, 0.4)
    border-radius: 5px
    color: #dc0808
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