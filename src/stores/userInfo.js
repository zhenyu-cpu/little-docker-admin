import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { Session } from '/@/utils/storage';
import {info} from '/@/api/auth'

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: () => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos = await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},
		// 模拟接口数据
		// https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
		async getApiUserInfo() {
			return new Promise((resolve) => {
				setTimeout(async () => {
					const response = await info();
					// 获取
					const username = Cookies.get('username');
					// 用户信息模拟数据
					const userInfos = {
						username: response.data.username,
						photo: response.data.avatarUrl,
						time: new Date().getTime(),
						roles: response.data.roles ? response.data.roles : ['admin','common'],
						authBtnList: [],
					};
					Session.set('userInfo', userInfos);
					resolve(userInfos);
				}, 0);
			});
		},
	},
});
