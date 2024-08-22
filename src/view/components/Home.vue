<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import QrcodeVue from 'qrcode.vue'
import {useToastAlertStore} from "@/domain/store/ToastAlert.store";
import AddLinkInfoCommand from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoCommand";
import {validateAddLinkInfo} from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoValidate";
import {handleAddLinkInfo} from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoHandler";
import {useToastSuccessStore} from "@/domain/store/ToastSuccess.store";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {storeToRefs} from "pinia";
import QRCodeUtils from "@/infra/Utils/QRCodeUtils";
import DateUtils from "@/infra/Utils/DateUtils";
const toastAlertStore = useToastAlertStore()
const toastSuccessStore = useToastSuccessStore()
const userInfoStore = useUserInfoStore()
const { user, isLogin } = storeToRefs(userInfoStore)



// 縮短網址
const originalLink = ref("")
const shortLinkError = ref([])
const shortLinkInfo = ref(null)
const shortenLinkBtnAvailable = computed(() => {
    return (originalLink.value === '' || !originalLink.value);
})
const sendShortenLinkReq = async () => {
    const command = new AddLinkInfoCommand(null, originalLink.value, null)
    const validateResult = validateAddLinkInfo(command)
    if (!validateResult.isValid) {
        const msg = validateResult.errorMessage[0]
        toastAlertStore.setMsg(msg)
        toastAlertStore.openToast()
        return
    }

    // call API to shorten link
    try {
        const result = await handleAddLinkInfo(command)
        shortLinkInfo.value = result
        toastSuccessStore.setMsg("🎉 成功產生 🎉")
        toastSuccessStore.openToast()
    } catch (e) {
        toastAlertStore.setMsg("請求失敗，請稍後再試")
        toastAlertStore.openToast()
    }

}

// tag 輪播
const tags = ref(['🍖 永久短網址', '👍🏻 免註冊', '🌏️ 短網址成效分析'])
const currentTagIndex = ref(0)
const currentTag = computed(() => tags.value[currentTagIndex.value])
const startTagCarousel = () => {
    setInterval(() => {
        currentTagIndex.value = (currentTagIndex.value + 1) % tags.value.length
    }, 2000)
}

// copy short link
const copyShortLink = () => {
    navigator.clipboard.writeText(shortLinkInfo.value.shortLink)
    toastSuccessStore.msg = "複製成功"
    toastSuccessStore.openToast()
}

// download qr code
const qrCodeRef = ref(null)
const downloadQrCode = () => {
    QRCodeUtils.downloadQrCode(qrCodeRef)
}

onMounted(() => {
    startTagCarousel()
})
</script>

<template lang="pug">
.container
    .link-container
        .tag-carousel
            span.tag {{currentTag}}
        .header
            span.flag 台灣
            h1 coco-dev 縮短網址
        .input-container
            img(src="@/assets/logo.svg" alt="Link Icon")
            input(type="text" placeholder="請輸入您想縮短的網址" v-model="originalLink" maxlength="100")
            button.shorten-button(:disabled="shortenLinkBtnAvailable" @click="sendShortenLinkReq") 縮短網址
        .shorten-container(v-if="shortLinkInfo")
            .short-url-container
                span.short-url {{ shortLinkInfo?.shortLink }}
                img(src="@/assets/icon/copy.svg" alt="Copy Icon" @click="copyShortLink")
            .qr-code-container
                div(ref="qrCodeRef")
                    qrcode-vue(:value="shortLinkInfo?.shortLink" size="150"  )
                button(@click="downloadQrCode") 下載


</template>

<style lang="sass" scoped>
.container
    background-color: #f0f0f0
.link-container
    width: 900px
    display: flex
    flex-direction: column
    align-items: self-start
    justify-content: center
    min-height: 100vh
    margin-left: 100px

    // title
    .header
        display: flex
        align-items: center
        margin-bottom: 10px

        .flag
            margin-right: 10px

        h1
            font-size: 2.5rem


    // 輸入框樣式
    .input-container
        display: flex
        align-items: center
        background-color: white
        border-radius: 5px
        padding: 10px
        width: 700px
        margin-bottom: 20px
        img
            height: 20px
            margin-right: 10px
        span
            font-size: 1rem
            color: rgba(51, 51, 51, 0.72)
        input
            border: none
            outline: none
            flex-grow: 1 // 讓輸入框佔據剩餘空間
        .shorten-button
            background-color: #ffcf49 // 或者您想要的按鈕顏色
            color: black
            border: none
            padding: 10px 20px
            border-radius: 5px
            cursor: pointer
            margin-left: 10px
            &:disabled
                background-color: #f0f0f0
                color: #ccc
                cursor: not-allowed


    // tag 輪播樣式
    .tag-carousel
        display: flex
        margin-top: 20px
        margin-bottom: 10px
        background-color: #f4e49c
        border-radius: 28px
        width: 250px
        justify-content: center
        span
            color: chocolate
            padding: 5px 10px
            border-radius: 28px
            margin-right: 10px
            opacity: 1
            transition: opacity 0.3s

    // 縮網址的結果
    .shorten-container
        background-color: rgb(227, 210, 152)
        border-radius: 8px
        padding: 20px
        width: 700px // 或者根據您的需求調整寬度
        .short-url-container
            display: flex
            align-items: center
            justify-content: space-between
            background-color: white
            border-radius: 28px
            margin-bottom: 20px
            .short-url
                padding: 8px 12px
                margin-right: 10px
                width: 600px // 或根據您的需求調整寬度
                flex-grow: 1 // 讓輸入框佔據剩餘空間，並將按鈕推到最右邊
            img
                width: 20px
                height: 20px
                cursor: pointer
                margin-right: 10px
        .qr-code-container
            display: flex
            align-items: center

            img
                width: 150px
                height: 150px
                margin-right: 10px
                border-radius: 5px
                margin-top: 0
            button
                background-color: #384ed9
                color: white
                border: none
                padding: 10px 20px
                border-radius: 5px
                cursor: pointer
                margin-left: 10px

</style>