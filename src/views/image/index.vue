<template>
	<div class="image-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="image-search mb15">
				<el-input size="default" placeholder="输入关键字" style="max-width: 180px"></el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					搜索
				</el-button>
				<el-button type="success" class="ml10" size="default">刷新</el-button>
				<el-button type="success" class="ml10" size="default">拉取镜像</el-button>
				<el-button type="success" class="ml10" size="default">导入镜像</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column type="id" label="镜像ID" width="100" />
				<el-table-column prop="tag" label="镜像TAG" show-overflow-tooltip></el-table-column>
				<el-table-column prop="size" label="镜像大小" show-overflow-tooltip></el-table-column>
				<el-table-column prop="repository" label="镜像名称(repository)" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary" @click=""
							>详情</el-button
						>
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary" @click="">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change=""
				@current-change=""
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="state.tableData.param.pageNum"
				background
				v-model:page-size="state.tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"
			>
			</el-pagination>
		</el-card>
	</div>
</template>
<script setup name="image">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
const userDialogRef = ref();
const state = reactive({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		},
	},
});
</script>
<style lang="scss">
.image-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;
		.el-table {
			flex: 1;
		}
	}
}
</style>
