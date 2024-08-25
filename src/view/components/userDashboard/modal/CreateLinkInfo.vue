<script lang="ts" setup>

import {ref, watch} from "vue";
import AddLinkInfoCommand from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoCommand";
import {storeToRefs} from "pinia";
import moment from "moment/moment";
import LinkInfo from "@/domain/model/LinkInfo";
import {LinkType} from "@/domain/enums/LinkType";
import {commandFactory, createLinkModalStore, userInfoStore} from "@/main";
const { user, enabledShortLink } = storeToRefs(userInfoStore)

// originalLink
const originalLink = ref(null)

// shortLinkType
const shortLinkType = ref('auto')
const shortLinkDomain = import.meta.env.VITE_APP_API_BASE_URL

// currentShortLink
const currentShortLink = ref(null)

// shortLinkExpire
const expireType = ref("noExpire")
const currentExpireDate = ref(null)
const currentExpireTime = ref(null)
const currentExpire = ref(null)
watch([currentExpireDate, currentExpireTime], () => {
    if (!currentExpireDate.value || !currentExpireTime.value) {
        currentExpire.value = null
    } else {
        const expireDate = moment(currentExpireDate.value + " " + currentExpireTime.value)
        currentExpire.value = expireDate.toDate()
    }
})

// add link
const errorMessage = ref(null)
const addLinkInfo = async () => {
    errorMessage.value = ''
    let fullShortLink = null
    if (shortLinkType.value === 'custom') {
        fullShortLink = `${shortLinkDomain}/${currentShortLink.value}`
    }
    const command = new AddLinkInfoCommand(
            fullShortLink,
            originalLink.value,
            currentExpire.value,
    )
    const validator = commandFactory.getCommandValidator(command)
    const validateResult = validator.validate(command)

    if (!validateResult.isValid) {
        const errorCode = validateResult.errorCode[0]
        errorMessage.value = validator.getValidationMessage[errorCode]
        return
    }

    // call API to shorten link
    const handler = commandFactory.getCommandHandler(command)
    try {
        const linkInfo = await handler.handle(command)
        userInfoStore.addLinkInfo(linkInfo, LinkType.ENABLED)
        createLinkModalStore.closeModal()
    } catch (e) {
        const handlerErrorCode = e.message
        errorMessage.value = handler.getExceptionMessage(handlerErrorCode)
    }
}



</script>

<template lang="pug">
.create-link-modal
    .modal-background
    .modal-content
        h2 創建短網址
        form(@submit.prevent="handleSubmit")
            .form-group
                label(for="originalLink") 原始連結
                input#originalLink(type="url" v-model="originalLink" required)

            .form-group
                label 短網址類型
                .radio-group
                    input(type="radio" id="autoShortLink" name="shortLinkType" value="auto" v-model="shortLinkType")
                    label(for="autoShortLink") 自動產生
                    input(type="radio" id="customShortLink" name="shortLinkType" value="custom" v-model="shortLinkType")
                    label(for="customShortLink") 自訂短網址

            .form-group(v-if="shortLinkType === 'custom'")
                label(for="shortLink") 短網址
                .url-link
                    span {{shortLinkDomain}}/
                    input(type="text" v-model="currentShortLink" required)

            .form-group
                label 短網址有效期限
                .radio-group
                    input(type="radio" id="noExpire" name="expireType" v-model="expireType" value="noExpire")
                    label(for="noExpire") 永久
                    input(type="radio" id="expire" name="expireType" v-model="expireType" value="expire")
                    label(for="expire") 設定過期日

            .form-group(v-if="expireType === 'expire'")
                label(for="currentExpireDate") 過期日
                input#currentExpireDate(type="date" v-model="currentExpireDate" required)
                input#currentExpireTime(type="time" v-model="currentExpireTime" required)

            .btn-container
                button.confirm-btn(type="button" @click="addLinkInfo") 創建
                button.cancel-btn(type="button" @click="createLinkModalStore.closeModal()") 取消
            .message-container(v-if="errorMessage != ''")
                p.error {{ errorMessage }}
</template>

<style lang="sass" scoped>
.create-link-modal
    position: fixed // 固定定位，覆蓋整個視窗
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    z-index: 10 // 確保 modal 在其他元素之上
    .modal-background
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, 0.5)
        display: flex
        justify-content: center
        align-items: center

    .modal-content
        width: 800px
        background-color: white
        padding: 30px
        border-radius: 10px
        text-align: center
        z-index: 20

        h2
            font-size: 1.5rem
            margin-bottom: 20px
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

            .radio-group
                display: flex
                align-items: center
                margin-bottom: 15px
                input
                    width: auto
                    margin-right: 5px

                label
                    margin-right: 20px

            .url-link
                display: flex
                align-items: center
                input
                    width: 100%
                    padding: 10px
                    border: 1px solid #ccc
                    border-radius: 5px
                    margin-left: 5px

        .btn-container
            display: flex
            justify-content: center
            margin-top: 20px
        .confirm-btn
            background-color: #4CAF50
            color: white
            border: none
            padding: 10px 20px
            border-radius: 5px
            cursor: pointer
            margin-right: 10px

        .cancel-btn
            background-color: #6a6767
            color: white
            border: none
            padding: 10px 20px
            border-radius: 5px
            cursor: pointer
            margin-left: 10px

p.error
    color: red
    margin-top: 10px
    font-size: 1rem
    font-weight: bold
    text-align: center

</style>