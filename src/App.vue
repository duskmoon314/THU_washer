<template>
  <n-message-provider
    ><n-layout>
      <n-layout-header>
        <n-page-header title="THU WASHER">
          <n-grid :cols="2" :x-gap="12">
            <n-gi>
              <n-select
                placeholder="选择宿舍楼"
                :options="buildings"
                @update:value="changeBuilding"
              />
            </n-gi>
            <n-gi>
              <n-select
                placeholder="选择楼层"
                :options="layers"
                @update:value="changeLayer"
              />
            </n-gi>
          </n-grid>
        </n-page-header>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px">
        <h1>{{ layer.section }}</h1>
        <washer-list :washers="layer.washers" />
      </n-layout-content>
      <n-layout-footer>
        Powered by: Vite Vue naive-ui<br />
        Source Code:
        <a href="https://github.com/duskmoon314/THU_washer"
          >duskmoon314/THU_washer</a
        ><br />
        Thanks:
        <a href="https://gitee.com/stevenlele/washer"
          >stevenlele/washer</a
        ></n-layout-footer
      >
    </n-layout>
  </n-message-provider>
</template>

<script lang="ts" setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NSelect,
  NMessageProvider,
  NPageHeader,
  NGrid,
  NGi,
  // useMessage,
} from "naive-ui";
import { ref, computed } from "vue";
import axios from "axios";
import WasherList from "./components/WasherList.vue";

const buildings = [
  { value: "zijing01", label: "紫荆1号楼" },
  { value: "zijing02", label: "紫荆2号楼" },
  { value: "zijing03", label: "紫荆3号楼" },
  { value: "zijing04", label: "紫荆4号楼" },
  { value: "zijing05", label: "紫荆5号楼" },
  { value: "zijing06", label: "紫荆6号楼" },
  { value: "zijing07", label: "紫荆7号楼" },
  { value: "zijing08", label: "紫荆8号楼" },
  { value: "zijing11", label: "紫荆11号楼" },
  { value: "south09", label: "南区9号楼" },
  { value: "south10", label: "南区10号楼/北楼" },
];

const building = ref("zijing01");
const status = ref<{ section: string; washers: any[] }[]>([]);
const layers = computed(() =>
  status.value.map((v, idx) => ({ label: v.section, value: idx }))
);
const layer = ref<{ section: string; washers: any[] }>({
  section: "未选择楼层",
  washers: [],
});
// const message = useMessage();

const changeBuilding = async (value: any) => {
  building.value = value;
  await getWasherStatus(value);
};

const changeLayer = (index: any) => {
  layer.value = status.value[index];
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
