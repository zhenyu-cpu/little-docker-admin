<template>
	<div class="cache-container layout-padding" v-loading="state.isloading">
		<el-row>
			<el-col :span="24" class="card-box">
				<el-card>
					<template #header>
						<span><i class="el-icon-monitor"></i> 基本信息</span>
					</template>
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<table cellspacing="0" style="width: 100%">
							<tbody>
								<tr>
									<td class="el-table__cell is-leaf"><div class="cell">Redis版本</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.redis_version }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">运行模式</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.redis_mode == 'standalone' ? '单机' : '集群' }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">端口</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.tcp_port }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">客户端数</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.connected_clients }}</div>
									</td>
								</tr>
								<tr>
									<td class="el-table__cell is-leaf"><div class="cell">运行时间(天)</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.uptime_in_days }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">使用内存</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.used_memory_human }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">使用CPU</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ parseFloat(state.cache.info.used_cpu_user_children).toFixed(2) }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">内存配置</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.maxmemory_human }}</div>
									</td>
								</tr>
								<tr>
									<td class="el-table__cell is-leaf"><div class="cell">AOF是否开启</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.aof_enabled == '0' ? '否' : '是' }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">RDB是否成功</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">{{ state.cache.info.rdb_last_bgsave_status }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">Key数量</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.dbSize">{{ state.cache.dbSize }}</div>
									</td>
									<td class="el-table__cell is-leaf"><div class="cell">网络入口/出口</div></td>
									<td class="el-table__cell is-leaf">
										<div class="cell" v-if="state.cache.info">
											{{ state.cache.info.instantaneous_input_kbps }}kps/{{ state.cache.info.instantaneous_output_kbps }}kps
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>

			<el-col :span="12" class="card-box">
				<el-card>
					<template #header>
						<span><i class="el-icon-pie-chart"></i> 命令统计</span>
					</template>
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<div ref="commandStats" style="height: 420px" />
					</div>
				</el-card>
			</el-col>

			<el-col :span="12" class="card-box">
				<el-card>
					<template #header>
						<span><i class="el-icon-odometer"></i> 内存信息</span>
					</template>
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<div ref="usedMemory" style="height: 420px" />
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup name="cache">
import { reactive, onMounted, ref } from 'vue';
import { getRedisCacheInfo } from '/@/api/monitor';
import * as echarts from 'echarts';

const commandStats = ref(null);
const usedMemory = ref(null);

const state = reactive({
	// 统计命令信息
	commandStatsChart: null,
	// 使用内存
	usedMemoryChart: null,
	// cache信息
	cache: [],
	isloading: true,
});

onMounted(() => {
	getList();
	openLoading();
});

/** 查缓存询信息 */
const getList = () => {
	getRedisCacheInfo().then((response) => {
		state.cache = response.data;
		state.isloading = false;

		state.commandStatsChart = echarts.init(commandStats.value, 'macarons');
		state.commandStatsChart.setOption({
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)',
			},
			series: [
				{
					name: '命令',
					type: 'pie',
					roseType: 'radius',
					radius: [15, 95],
					center: ['50%', '38%'],
					data: response.data.commandStats,
					animationEasing: 'cubicInOut',
					animationDuration: 1000,
				},
			],
		});

		state.usedMemoryChart = echarts.init(usedMemory.value, 'macarons');
		state.usedMemoryChart.setOption({
			tooltip: {
				formatter: '{b} <br/>{a} : ' + response.data.info.used_memory_human,
			},
			series: [
				{
					name: '峰值',
					type: 'gauge',
					min: 0,
					max: 1000,
					detail: {
						formatter: response.data.info.used_memory_human,
					},
					data: [
						{
							value: parseFloat(response.data.info.used_memory_human),
							name: '内存消耗',
						},
					],
				},
			],
		});
	});
};

// 打开加载层
const openLoading = () => {
	state.isloading = true;
};
</script>

<style lang="scss" scoped>
.cache-container {
	overflow-y: auto;
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
