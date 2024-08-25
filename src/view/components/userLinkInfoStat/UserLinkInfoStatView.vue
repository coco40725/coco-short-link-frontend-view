<script lang="ts" setup>


import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import LinkStat from "@/domain/model/LinkStat";
import DateUtils from "@/infra/Utils/DateUtils";
import {QueryFactory} from "@/appplication/cqrs/query/base/QueryFactory";
import {GetUserShortLinkQuery} from "@/appplication/cqrs/query/GetUserShortLinkInfo/GetUserShortLinkQuery";
import {GetUserLinkStatQuery} from "@/appplication/cqrs/query/GetUserLinkStat/GetUserLinkStatQuery";
import {queryFactory} from "@/main";

const router = useRouter()
const route = useRoute()
const styleOptions = {
    width: "100%",
    height: "200px"
}


const shortLink = computed(() => {
    return route.query.link
})
const totalAccessCount = ref("無資料")
const lastCreateDate = ref("無資料")

const ipOptions = ref(null)
const initIpData = (linkStat: LinkStat) => {
    const ipCountData = linkStat.ipCount
    const ipPoints = []
    Object.keys(ipCountData).forEach((key) => {
        ipPoints.push({ label: key, y: ipCountData[key] })
    })

    ipOptions.value = {
        colorSet: "colors1",
        theme: "light2",
        axisY: {
            title: "次數"
        },
        data: [{
            yValueFormatString: "### 次",
            dataPoints: ipPoints
        }]
    }
}

const refererOptions = ref(null)
const initRefererData = (linkStat: LinkStat) => {
    const refererCountData = linkStat.referCount
    const refererPoints = []
    Object.keys(refererCountData).forEach((key) => {
        refererPoints.push({ label: key, y: refererCountData[key] })
    })
    refererOptions.value = {
        colorSet: "colors1",
        theme: "light2",
        axisY: {
            title: "次數"
        },
        data: [{
            yValueFormatString: "### 次",
            dataPoints: refererPoints
        }]
    }
}

const userAgentOptions = ref(null)
const initUserAgentData = (linkStat: LinkStat) => {
    const userAgentCountData = linkStat.userAgentCount
    const userAgentPoints = []
    Object.keys(userAgentCountData).forEach((key) => {
        userAgentPoints.push({ label: key, y: userAgentCountData[key] })
    })
    userAgentOptions.value = {
        colorSet: "colors1",
        theme: "light2",
        axisY: {
            title: "次數"
        },
        data: [{
            yValueFormatString: "### 次",
            dataPoints: userAgentPoints
        }]
    }
}

onMounted(async () => {
    const link = shortLink.value as string
    const query = new GetUserLinkStatQuery(link)
    const handler = queryFactory.getQueryHandler(query)
    const linkStat  = await handler.handle(query)
    if (linkStat != null) {
        initRefererData(linkStat)
        initIpData(linkStat)
        initUserAgentData(linkStat)
        totalAccessCount.value = linkStat.totalCount.toString()
        lastCreateDate.value = DateUtils.formatDateToString(linkStat.createDate)
    }

})
</script>

<template lang="pug">
.stats-card.dashboard-style
    .overview-card
        h2.card-title 總覽
        .card-content
            p.title 短網址
            span.content {{shortLink}}
        .card-content
            p.title 最後更新時間
            span.content {{lastCreateDate}}
        .card-content
            p.title 訪問總次數
            span.content {{totalAccessCount}}

    .charts-container
        .chart-card
            .card-header
                h3.card-title referer IP
            .chart-container
                CanvasJSChart(:options="ipOptions" :styles="styleOptions")
        .chart-card
            .card-header
                h3.card-title referer
            .chart-container
                CanvasJSChart(:options="refererOptions" :styles="styleOptions")
        .chart-card
            .card-header
                h3.card-title userAgent
            .chart-container
                CanvasJSChart(:options="userAgentOptions" :styles="styleOptions")
</template>

<style scoped lang="sass">
.stats-card.dashboard-style
    display: grid
    background-color: antiquewhite
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
    gap: 20px
    height: 100vh

    .chart-card
        margin-top: 20px
    .overview-card
        height: 300px
        margin-top: 20px
    .overview-card, .chart-card
        background-color: #fff
        border-radius: 8px
        box-shadow: 0 2px 5px rgba(0,0,0,0.1)
        padding: 20px
        margin: 10px

        .card-header
            display: flex
            justify-content: space-between
            align-items: center
            margin-bottom: 15px


        .card-title
            font-size: 1.2rem
            font-weight: 600
            margin: 0


        .card-content
            color: #666
            margin-bottom: 20px
            p
                margin-top: 10px
                margin-bottom: 5px
                font-weight: bold
                font-size: 1.1rem
            span
                font-size: 1rem

        .chart-container
            height: 200px

</style>