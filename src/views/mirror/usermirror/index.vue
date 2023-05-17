<template>
  <div class="system-menu-container layout-pd">
    <el-card shadow="hover">
      <div class="system-menu-search mb15">
        <el-button size="default" type="primary" class="ml10" @click="upload">
        导入镜像
        </el-button>
      </div>
      <el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" row-key="path">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="名称" show-overflow-tooltip width="250" align="center">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" show-overflow-tooltip width="500">
          <template #default="scope">
            <el-button type="primary" v-for="(tag, index) in scope.row.tags" :key="index" plain size="small">{{ tag }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="镜像大小" show-overflow-tooltip align="center" width="120">
          <template #default="scope">
            <span>{{ scope.row.size }}KB</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip width="120">
          <template #default="scope">
            <el-button size="small">{{ scope.row.state }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
					<template #default="scope" >
						<el-button type="primary" plain @click="" style="width: 50px;">
              <el-icon style="margin-left: 6px;"><ele-Document /></el-icon>
            </el-button>
						<el-button type="warning" plain @click="" style="width: 50px;">
              <el-icon style="margin-left: 6px;"><ele-Upload /></el-icon>
            </el-button>
						<el-button type="info" plain @click="" style="width: 50px;">
              <el-icon style="margin-left: 6px;"><ele-Share /></el-icon>
            </el-button>
            <el-button type="danger" plain @click="" style="width: 50px;">
              <el-icon style="margin-left: 6px;"><ele-Delete /></el-icon>
            </el-button>
					</template>
				</el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup name="systemMenu">
import { defineAsyncComponent, ref, onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '/@/stores/routesList';
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";

// 引入组件
const MenuDialog = defineAsyncComponent(() => import('/@/views/system/menu/dialog.vue'));

// 定义变量内容
const menuDialogRef = ref();
const state = reactive({
  tableData: {
    data: [],
    loading: true,
  },
});
// 导入镜像
function upload() {
}

// 获取路由数据，真实请从接口获取
const getTableData = () => {
  state.tableData.loading = true;
  state.tableData.data = [
    {
      name: 'kk',
      tags: ['tt'],
      size: '12.50',
      state: '私有'
    },
    {
      name: 'biubiubiu',
      tags: ['tag1', 'tag2'],
      size: '15',
      state: '已公开'
    },
  ];
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};
// 页面加载时
onMounted(() => {
  getTableData();
});
</script>
