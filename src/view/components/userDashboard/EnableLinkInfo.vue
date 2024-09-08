<script lang="ts" setup>
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";
import ChangeOriginLinkCommand from "@/application/cqrs/command/ChangeOriginLink/ChangeOriginLinkCommand";
import QRCodeUtils from "@/infra/Utils/QRCodeUtils";
import QrcodeVue from 'qrcode.vue'
import DateUtils from "../../../infra/Utils/DateUtils";
import LinkInfo from "@/domain/model/LinkInfo";
import ChangeExpireDateCommand from "@/application/cqrs/command/ChangeExpireDate/ChangeExpireDateCommand";
import {LinkType} from "@/domain/enums/LinkType";
import moment from "moment";
import '@vuepic/vue-datepicker/dist/main.css';
import {useRouter} from "vue-router";
import {DisabledLinkInfoCommand} from "@/application/cqrs/command/DisabledLinkInfo/DisabledLinkInfoCommand";
import {commandFactory, toastSuccessStore, userInfoStore} from "@/main";

const router = useRouter()
const { enabledShortLink, isShortLinkInfoLoaded } = storeToRefs(userInfoStore)


const currentEditLinkInfo = ref(null)
const currentEditLinkInfoField = ref(null)
const checkCurrentEditLinkInfoField = (type: string, info: LinkInfo) => {
    return currentEditLinkInfoField.value !== null &&
    currentEditLinkInfo.value !== null &&
    currentEditLinkInfoField.value === type &&
    currentEditLinkInfo.value.id === info.id
}
const cleanEditLinkInfo = () => {
    currentEditLinkInfo.value = null
    currentEditLinkInfoField.value = null
}

// edit Original Link
let tmpOriginalLink = null

const openOriginLinkEdit = (urlInfo: LinkInfo) => {
    currentEditLinkInfo.value = urlInfo
    currentEditLinkInfoField.value = 'originalLink'
    tmpOriginalLink = urlInfo.originalLink
}
const confirmOriginLinkEdit = async (urlInfo: LinkInfo) => {
    cleanEditLinkInfo()
    const command = new ChangeOriginLinkCommand(urlInfo.id, urlInfo.originalLink)
    const handler = commandFactory.getCommandHandler(command)
    await handler.handle(command)
}
const cancelOriginLinkEdit = (urlInfo: LinkInfo) => {
    cleanEditLinkInfo()
    urlInfo.originalLink = tmpOriginalLink
}

// edit expire date
const currentExpireDate = ref(null)
const currentExpireTime = ref(null)
watch([currentExpireDate, currentExpireTime], () => {
    if (!currentExpireDate.value || !currentExpireTime.value) {
        currentEditLinkInfo.value.expirationDate = null
    } else {
        const expireDate = moment(currentExpireDate.value + " " + currentExpireTime.value)
        currentEditLinkInfo.value.expirationDate = expireDate.toDate()
    }

})
let tmpExpireDate = null
let tmpExpireTime = null
const openExpireDateEdit = (urlInfo: LinkInfo) => {
    currentEditLinkInfo.value = urlInfo
    currentEditLinkInfoField.value = 'expireDate'
    if (!urlInfo.expirationDate) {
        tmpExpireDate = null
        tmpExpireTime = null
        currentExpireDate.value = null
        currentExpireTime.value = null

    } else {
        const expireDate = urlInfo.expirationDate
        currentExpireDate.value = moment(expireDate).format("YYYY-MM-DD")
        currentExpireTime.value = moment(expireDate).format("HH:mm:ss")
        tmpExpireDate = currentExpireDate.value
        tmpExpireTime = currentExpireTime.value
    }
}
const confirmExpireDateEdit = async (urlInfo: LinkInfo) => {
    cleanEditLinkInfo()
    tmpExpireDate = null
    tmpExpireTime = null
    const command = new ChangeExpireDateCommand(urlInfo.id, urlInfo.expirationDate, LinkType.ENABLED)
    const handler = commandFactory.getCommandHandler(command)
    await handler.handle(command)
}
const cancelExpireDateEdit = (urlInfo: LinkInfo) => {
    cleanEditLinkInfo()
    urlInfo.expirationDate = tmpExpireDate
}
const changeExpireType = (expire: boolean) => {
    if (!expire) {
        currentExpireDate.value = null
        currentExpireTime.value = null
        currentEditLinkInfo.value.expirationDate = null
    } else {
        currentExpireDate.value = moment().format("YYYY-MM-DD")
        currentExpireTime.value = moment().format("HH:mm:ss")
        currentEditLinkInfo.value.expirationDate = moment().toDate()
    }
}

// action
const disableLink = async (id: string) => {
    const command = new DisabledLinkInfoCommand(id)
    const handler = commandFactory.getCommandHandler(command)
    await handler.handle(command)
}

// copy short link
const copyLink = (shortLink: string) => {
    navigator.clipboard.writeText(shortLink)
    toastSuccessStore.msg = "複製成功"
    toastSuccessStore.openToast()
}

// download qr code
const urlInfoRef = ref({})
const downloadQrCode = (id: string) => {
    const ref = urlInfoRef.value[id]
    console.log(ref)
    QRCodeUtils.downloadQrCode(ref)
}

// open statistic
const openStatistic = (link: string) => {
    let routeData = router.resolve(
            {
                path: '/link-stat',
                query: {'link': link}
            });
    window.open(routeData.href, '_blank');
}
</script>

<template lang="pug">
.enable-link-container(v-if="isShortLinkInfoLoaded")
    .header
        .title QR code
        .title 原始網址
        .title 短網址
        .title 建立時間
        .title 過期時間
        .title 功能
    .content(v-for="urlInfo in enabledShortLink" :key="urlInfo.id")
        .item.qr-code-img
            div(:ref="el => urlInfoRef[urlInfo.id] = el")
                QrcodeVue(:value="urlInfo?.shortLink" size="60"  )
            button(@click="downloadQrCode(urlInfo.id)") 下載
        .item.original-url
            .edit-container.row
                template(v-if="!checkCurrentEditLinkInfoField('originalLink', urlInfo)")
                    a(:href="urlInfo.originalLink" target='_blank') {{ urlInfo.originalLink }}
                    img(src="@/assets/icon/pen.svg" alt="Edit Icon" @click="openOriginLinkEdit(urlInfo)")
                template(v-else)
                    input(v-model="urlInfo.originalLink")
                    .edit-img-container
                        img(src="@/assets/icon/confirm.svg" alt="Copy Icon" @click="confirmOriginLinkEdit(urlInfo)")
                        img(src="@/assets/icon/cancel.svg" alt="Copy Icon" @click="cancelOriginLinkEdit(urlInfo)")

        .item.short-url
            .edit-container.row
                a(:href=" urlInfo.shortLink" target='_blank') {{ urlInfo.shortLink }}
                img(src="@/assets/icon/copy.svg" alt="Copy Icon" @click="copyLink(urlInfo.shortLink)")
        .item.created-at
            span {{ DateUtils.formatDateToString(urlInfo.createDate) }}
        .item.expire-at
                template(v-if="!checkCurrentEditLinkInfoField('expireDate', urlInfo)")
                    .edit-container.row
                        span {{ DateUtils.formatDateToString(urlInfo.expirationDate) }}
                        img(src="@/assets/icon/pen.svg" alt="Edit Icon" @click="openExpireDateEdit(urlInfo)")
                template(v-else)
                    .edit-container.column
                        .radio-container
                            input(type="radio" id="noExpire" name="expireType" :checked="!currentEditLinkInfo.expirationDate" @change="changeExpireType(false)")
                            label(for="noExpire") 永久
                            input(type="radio" id="expire" name="expireType" :checked="currentEditLinkInfo.expirationDate" @change="changeExpireType(true)")
                            label(for="expire") 設定到期日
                        .input-container(v-if="currentEditLinkInfo.expirationDate")
                            input(type="date" v-model="currentExpireDate")
                            input(type="time" step="3600" v-model="currentExpireTime")
                        .edit-img-container
                            img(src="@/assets/icon/confirm.svg" alt="Copy Icon" @click="confirmExpireDateEdit(urlInfo)")
                            img(src="@/assets/icon/cancel.svg" alt="Copy Icon" @click="cancelExpireDateEdit(urlInfo)")

        .item.actions
            button.delete-button(@click="disableLink(urlInfo.id)") 刪除
            button.view-stat-button(@click="openStatistic(urlInfo.shortLink)") 查看統計

</template>

<style lang="sass" scoped>
.enable-link-container
    width: 100% // 或根據您的需求調整寬度
    border-collapse: collapse // 讓表格邊框合併

    .header
        display: flex
        background-color: #f0f0f0 // 或您想要的標題背景顏色
        padding: 10px
        border-bottom: 1px solid #ddd // 或您想要的邊框顏色

        .title
            flex: 1 // 平均分配標題欄位寬度
            text-align: center
            font-weight: bold



    .content
        display: flex
        align-items: center
        padding: 10px
        border-bottom: 1px solid #eee // 或您想要的邊框顏色

        &:nth-child(even)  // 偶數行背景顏色
            background-color: #f9f9f9


        .qr-code-img
            width: 50px // 調整 QR code 圖片大小
            margin-right: 10px

            img
                width: 100%
                height: auto



        .item
            flex: 1
            text-align: center
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap

        .edit-container.column
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center

        .edit-container.row
            display: flex
            align-items: center
            justify-content: center

        .edit-container
            a
                height: 18px
                width: 140px
                padding: 0
                overflow: hidden
                position: relative
                display: inline-block
                margin: 0 5px 0 5px
                text-align: center
                text-decoration: none
                text-overflow: ellipsis
                white-space: nowrap
                color: #007bff
                cursor: pointer
                &:hover
                    text-decoration: underline
            span
                height: 18px
                width: 140px
                padding: 0
                overflow: hidden
                position: relative
                display: inline-block
                margin: 0 5px 0 5px
                text-align: center
                text-decoration: none
                text-overflow: ellipsis
                white-space: nowrap

            img
                width: 20px
                height: 20px
                margin-right: 10px
                align-self: flex-end
                &:hover
                    cursor: pointer
            .edit-link, .show-link
                display: flex
                justify-content: space-between /* 新增此行，讓子元素平均分佈空間 */

        .input-container
            display: flex
            flex-direction: column

        .actions
            button
                background-color: #007bff // 或您想要的按鈕顏色
                color: white
                border: none
                padding: 5px 10px
                text-align: center
                text-decoration: none
                display: inline-block
                font-size: 12px
                border-radius: 4px
                cursor: pointer
                margin: 0 5px // 調整按鈕間距

                &:hover
                    background-color: darken(#007bff, 10%) // 懸停時顏色變深
</style>