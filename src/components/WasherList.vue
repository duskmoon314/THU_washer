<template>
  <n-grid
    x-gap="12"
    y-gap="12"
    cols="1 s:2 m:3 l:4 xl:5 2xl:6"
    responsive="screen"
  >
    <n-gi v-for="washer in washers">
      <washer-card :data="washer" />
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import { NGrid, NGi } from "naive-ui";
import { defineProps, toRefs } from "vue";
import WasherCard from "./WasherCard.vue";

const props = defineProps<{
  washers: {
    code: string;
    name: string;
    number: number;
    status: string;
    offline: boolean;
    updated: string;
    updated_time: string;
  }[];
}>();

const { washers } = toRefs(props);
</script>
