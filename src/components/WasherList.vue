<template>
  <n-grid x-gap="12" :cols="washers.length">
    <n-gi v-for="washer in washers">
      <washer-card :data="washer" />
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import { NGrid, NGi } from 'naive-ui';
import { defineProps, toRefs } from 'vue';
import WasherCard from './WasherCard.vue';

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
