<script setup>
import {userInfoStore} from "@/main.ts";
import {onMounted} from "vue";

import {AddLinkInfoHandler} from "@/application/cqrs/command/AddLinkInfo/AddLinkInfoHandler.ts";
import {AddLinkInfoValidator} from "@/application/cqrs/command/AddLinkInfo/AddLinkInfoValidator.ts";

import {ChangeExpireDateHandler} from "@/application/cqrs/command/ChangeExpireDate/ChangeExpireHandler.ts";
import {ChangeOriginLinkHandler} from "@/application/cqrs/command/ChangeOriginLink/ChangeOriginLinkHandler.ts";
import {DisabledLinkInfoHandler} from "@/application/cqrs/command/DisabledLinkInfo/DisabledLinkInfoHandler.ts";
import {EnabledLinkInfoHandler} from "@/application/cqrs/command/EnabledLinkInfo/EnabledLinkInfoHandler.ts";
import {EnabledLinkInfoValidator} from "@/application/cqrs/command/EnabledLinkInfo/EnabledLinkInfoValidator.ts";

import {LoginHandler} from "@/application/cqrs/command/Login/LoginHandler.ts";
import {LoginValidator} from "@/application/cqrs/command/Login/LoginValidator.ts"

import {LogoutHandler} from "@/application/cqrs/command/Logout/LogoutHandler.ts";
import {LogoutValidator} from "@/application/cqrs/command/Logout/LogoutValidator.ts";

import {GetUserLinkStatHandler} from "@/application/cqrs/query/GetUserLinkStat/GetUserLinkStatHandler.ts";
import {GetUserShortLinkHandler} from "@/application/cqrs/query/GetUserShortLinkInfo/GetUserShortLinkHandler.ts";



onMounted(() => {
    userInfoStore.login()
})
</script>

<template lang="pug">
router-view
</template>

<style scoped>

</style>
