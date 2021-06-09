<template>
  <n-message-provider
    ><n-layout>
      <n-layout-header>
        <h1>THU WASHER</h1>

        Powered by: Vite Vue naive-ui<br />
        Thanks:
        <a href="https://gitee.com/stevenlele/washer">stevenlele/washer</a>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px">
          <n-select
            placeholder="选择宿舍楼"
            :options="options"
            @update:value="changeBuilding"
          />
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px">
          <n-list>
            <n-list-item v-for="layer in status">
              <template #prefix>
                {{ layer.section }}
              </template>
              <washer-list :washers="layer.washers"
            /></n-list-item>
          </n-list>
        </n-layout-content>
      </n-layout>
      <n-layout-footer> </n-layout-footer>
    </n-layout>
  </n-message-provider>
</template>

<script lang="ts" setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
  NSelect,
  NMessageProvider,
  NList,
  NListItem,
} from 'naive-ui';
import { ref } from 'vue';
import axios from 'axios';
import WasherList from './components/WasherList.vue';

const options = [
  { value: 'zijing01', label: '紫荆1号楼' },
  { value: 'zijing02', label: '紫荆2号楼' },
  { value: 'zijing04', label: '紫荆4号楼' },
  { value: 'zijing05', label: '紫荆5号楼' },
  { value: 'zijing06', label: '紫荆6号楼' },
  { value: 'zijing07', label: '紫荆7号楼' },
  { value: 'zijing08', label: '紫荆8号楼' },
  { value: 'zijing11', label: '紫荆11号楼' },
  { value: 'south09', label: '南区9号楼' },
  { value: 'south10', label: '南区10号楼/北楼' },
];

const building = ref('zijing01');
const status = ref<{ section: string; washers: any[] }[]>([]);
// const message = useMessage();

const changeBuilding = async (value: any) => {
  building.value = value;
  await getWasherStatus(value);
};

const getWasherStatus = async (building: string) => {
  console.log(building);
  const url = `https://service-f973foaz-1258628808.bj.apigw.tencentcs.com/release/building/${building}`;
  console.log(url);
  const result = await axios.get(url);
  if (result.data.success) {
    status.value = result.data.result;
  } else {
    // message.error("获取信息失败", { closable: true });
  }
};
</script>

<style>
.n-layout-header,
.n-layout-footer {
  background: #ffffff;
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
