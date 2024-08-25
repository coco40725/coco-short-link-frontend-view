<script setup>
import {userInfoStore} from "@/main.ts";
import {onMounted} from "vue";

import {AddLinkInfoHandler} from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoHandler.ts";
import {AddLinkInfoValidator} from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoValidator.ts";

import {ChangeExpireDateHandler} from "@/appplication/cqrs/command/ChangeExpireDate/ChangeExpireHandler.ts";
import {ChangeOriginLinkHandler} from "@/appplication/cqrs/command/ChangeOriginLink/ChangeOriginLinkHandler.ts";
import {DisabledLinkInfoHandler} from "@/appplication/cqrs/command/DisabledLinkInfo/DisabledLinkInfoHandler.ts";
import {EnabledLinkInfoHandler} from "@/appplication/cqrs/command/EnabledLinkInfo/EnabledLinkInfoHandler.ts";
import {EnabledLinkInfoValidator} from "@/appplication/cqrs/command/EnabledLinkInfo/EnabledLinkInfoValidator.ts";

import {LoginHandler} from "@/appplication/cqrs/command/Login/LoginHandler.ts";
import {LoginValidator} from "@/appplication/cqrs/command/Login/LoginValidator.ts"

import {LogoutHandler} from "@/appplication/cqrs/command/Logout/LogoutHandler.ts";
import {LogoutValidator} from "@/appplication/cqrs/command/Logout/LogoutValidator.ts";

import {GetUserLinkStatHandler} from "@/appplication/cqrs/query/GetUserLinkStat/GetUserLinkStatHandler.ts";
import {GetUserShortLinkHandler} from "@/appplication/cqrs/query/GetUserShortLinkInfo/GetUserShortLinkHandler.ts";



onMounted(() => {
    userInfoStore.login()
})
</script>

<template lang="pug">
router-view
</template>

<style scoped>

</style>
