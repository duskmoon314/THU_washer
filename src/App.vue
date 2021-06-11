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
  { value: "zijing09", label: "紫荆9号楼" },
  { value: "zijing10", label: "紫荆10号楼" },
  { value: "zijing11", label: "紫荆11号楼" },
  { value: "zijing12", label: "紫荆12号楼" },
  { value: "zijing13", label: "紫荆13号楼" },
  { value: "zijing14", label: "紫荆14号楼" },
  { value: "zijing15", label: "紫荆15号楼" },
  { value: "zijing16", label: "紫荆16号楼" },
  { value: "zijing17", label: "紫荆17号楼" },
  { value: "zijing18", label: "紫荆18号楼" },
  { value: "south01", label: "南区1号楼" },
  { value: "south05", label: "南区5号楼" },
  { value: "south07", label: "南区7号楼" },
  { value: "south08", label: "南区8号楼" },
  { value: "south09", label: "南区9号楼" },
  { value: "south10", label: "南区10号楼/北楼" },
  { value: "south11", label: "南区11号楼" },
  { value: "south12", label: "南区12号楼" },
  { value: "south14", label: "南区14号楼" },
  { value: "south15", label: "南区15号楼" },
  { value: "south16", label: "南区16号楼" },
  { value: "south18", label: "南区18号楼" },
  { value: "south20", label: "南区20号楼" },
  { value: "south23", label: "南区23号楼" },
  { value: "south24", label: "南区24号楼" },
  { value: "south25", label: "南区25号楼" },
  { value: "south26", label: "南区26号楼" },
  { value: "south27", label: "南区27号楼" },
  { value: "south28", label: "南区28号楼" },
  { value: "south29", label: "南区29号楼" },
  { value: "south30", label: "南区30号楼" },
  { value: "south31", label: "南区31号楼" },
  { value: "south32", label: "南区32号楼" },
  { value: "south33", label: "南区33号楼" },
  { value: "south34", label: "南区34号楼" },
  { value: "south35", label: "南区35号楼" },
  { value: "south36", label: "南区36号楼" },
  { value: "south37", label: "南区37号楼" },
  { value: "south99", label: "南区综合楼" },
  { value: "building03", label: "3号院" },
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
