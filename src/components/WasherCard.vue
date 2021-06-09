<template>
  <n-alert
    v-if="data.name"
    type="success"
    :title="data.name"
    :show-icon="false"
  >
    <n-icon v-if="data.offline" color="red">
      <signal-wifi0-bar24-filled />
    </n-icon>
    <n-icon v-else color="green">
      <signal-wifi4-bar24-filled />
    </n-icon>
    <n-descriptions label-placement="left">
      <n-descriptions-item label="状态">
        <n-tag v-if="data.status === '待机空闲'" type="success">待机空闲</n-tag>
        <n-tag v-else-if="data.status === '脱水运行'" type="warning"
          >脱水运行</n-tag
        >
        <n-tag v-else-if="data.status === '洗涤运行'" type="warning"
          >洗涤运行</n-tag
        >
        <n-tag v-else-if="data.status === '漂洗运行'" type="warning"
          >漂洗运行</n-tag
        >

        <n-tag v-else type="error">未知状态</n-tag>
      </n-descriptions-item>
      <n-descriptions-item label="更新时间">{{
        data.updated
      }}</n-descriptions-item>
    </n-descriptions>
  </n-alert>
  <n-alert v-else type="error" title="未获取到数据" :show-icon="false">
    稍后再试一下吧
  </n-alert>
</template>

<script lang="ts" setup>
import {
  NCard,
  NIcon,
  NDescriptions,
  NDescriptionsItem,
  NTag,
  NAlert,
} from 'naive-ui';
import {
  SignalWifi0Bar24Filled,
  SignalWifi4Bar24Filled,
} from '@vicons/material';
import { defineProps, toRefs } from 'vue';

const props = defineProps<{
    data: {
      code: string;
      name: string;
      number: number;
      status: string;
      offline: boolean;
      updated: string;
      updated_time: string;
    };
  }>();

const { data } = toRefs(props);
</script>

<style>
.n-card {
  max-width: 300px;
}
</style>
