var vm = new Vue({
	el: "#board",
	data: {
		inputMsg: "",
		
	},
	methods:{
		//点击取消,删除输入框里的内容
		cancel(){
			this.inputMsg = "";
		},
		
		//留言的json数据包括 1.用户头像的文件 2.用户名 3.提交的留言内容  4.点击提交按钮时的时间(有固定格式) 5.点赞数  6.踩数
		//公告的json数据包括  1.标题  2.简单介绍 3.时间
	}
})