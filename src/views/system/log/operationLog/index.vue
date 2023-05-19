<template>
	<div class="system-operation-log-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-operation-log-search mb15">
				<el-input size="default" placeholder="请输入系统模块" style="max-width: 180px"></el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column type="id" label="日志编号" width="100" />
				<el-table-column prop="opation" label="操作类型" show-overflow-tooltip></el-table-column>
				<el-table-column prop="method" label="操作方法" show-overflow-tooltip></el-table-column>
				<el-table-column prop="params" label="操作参数" show-overflow-tooltip></el-table-column>
				<el-table-column prop="time_consuming" label="操作耗时" show-overflow-tooltip></el-table-column>
				<el-table-column prop="ipAddress" label="操作ip" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="操作时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary" @click=""
							>查看详情</el-button
						>
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
<script setup name="operationLog">
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
.system-operation-log-container {
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
