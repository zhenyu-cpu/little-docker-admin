<template>
  <div class="system-menu-container layout-pd">
    <el-card shadow="hover">
      <div class="system-menu-search mb15">
        <el-select style="marginRight: 10px" v-model="value" class="m-2" placeholder="所有状态" size="default">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-input size="default" placeholder="请输入容器名称" style="max-width: 180px" v-model="keyWord"> </el-input>
        <el-button size="default" type="primary" class="ml10" @click="search">
          <el-icon>
            <ele-Search />
          </el-icon>
          搜索
        </el-button>
      </div>
      <div>
        <el-button type="success">
          <el-icon>
            <ele-CircleCheck />
          </el-icon>
          start
        </el-button>
        <el-button type="info">
          <el-icon>
            <ele-CircleCheck />
          </el-icon>
          pause
        </el-button>
        <el-button color="rgb(200,201,204)" style="color: white;">
          <el-icon>
            <ele-CircleCheck />
          </el-icon>
          recover
        </el-button>
        <el-button type="warning">
          <el-icon>
            <ele-CircleClose />
          </el-icon>
          stop
        </el-button>
        <el-button type="warning">
          <el-icon>
            <ele-Warning />
          </el-icon>
          kill
        </el-button>
        <el-button type="primary">
          <el-icon>
            <ele-CircleCheck />
          </el-icon>
          restart
        </el-button>
        <el-button color="rgb(250,182,182)" style="color: white;">
          <el-icon>
            <ele-CircleCheck />
          </el-icon>
          delete
        </el-button>
      </div>
      <el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%" row-key="path">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="容器名称" show-overflow-tooltip width="250" align="center">
          <template #default="scope">
            <span>{{ scope.row.dockerName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="监控" show-overflow-tooltip width="100" align="center">
          <template #default="scope">
            <el-icon size="large">
              <ele-View v-if="scope.row.isSee" @click="scope.row.isSee = false" />
              <ele-Hide v-else @click="scope.row.isSee = true"/>
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="容器状态" show-overflow-tooltip align="center">
          <template #default="scope">
            <el-button :type="scope.row.dockerState ? 'success' : 'danger'" plain size="small">{{ scope.row.dockerState ?
              '容器运行' : '容器关闭' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="用户" show-overflow-tooltip align="center" width="250">
          <template #default="scope">
            {{ scope.row.dockerUser }}
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
// 下拉选择框
const value = ref('all')
const options = [
  {
    value: 'all',
    label: '所有状态',
  },
  {
    value: 'run',
    label: '运行状态',
  },
  {
    value: 'close',
    label: '关闭状态',
  }
]
// 输入框
const keyWord = ref('')
// 搜索
function search() {
  getTableData()
  state.tableData.data = state.tableData.data.filter(item => {
    console.log(value.value, keyWord.value)
    if(value.value == 'all') {
      if(item.dockerName.indexOf(keyWord.value) !== -1) {
        return true
      } else {
        return false
      }
    } else if(value.value == 'run') {
      if(item.dockerName.indexOf(keyWord.value) !== -1 && item.dockerState) {
        return true
      } else {
        return false
      }
    } else if(value.value == 'close') {
      if(item.dockerName.indexOf(keyWord.value) !== -1 && item.dockerState == false) {
        return true
      } else {
        return false
      }
    }
  })
}

// 获取路由数据，真实请从接口获取
const getTableData = () => {
  state.tableData.loading = true;
  state.tableData.data = [
    {
      isSelect: false,
      dockerName: "yii",
      isSee: true,
      dockerState: true,
      dockerUser: "sya"
    },
    {
      isSelect: false,
      dockerName: "demo-nginx",
      isSee: true,
      dockerState: false,
      dockerUser: "sya"
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
