<script setup lang="ts">
import {onMounted} from "vue";

</script>

<template lang="pug">
.github-link
    h2 GitHub Link
    a(href="https://github.com/coco40725/coco-user-bg" target="_blank") User Server github
    a(href="https://github.com/coco40725/coco-short-link-bg" target="_blank") Short Link Server github
    a(href="https://github.com/coco40725/coco-short-link-frontend-view" target="_blank") Web View github
img(src="@/assets/Short-link-system-diagram-Scenario1.jpg", alt="系統設計1")
hr
img(src="@/assets/Short-link-system-diagram-Scenario2.jpg", alt="系統設計2")

</template>

<style scoped lang="sass">
.github-link
    display: flex
    flex-direction: column
    padding: 20px
    a
        margin-bottom: 10px
</style>