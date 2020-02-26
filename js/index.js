var vm = new Vue({
	el:"#index",
	data:{
		show: false,
		logining:false,
		Across: true,
		Acrossa: false,
	},
	methods:{
		goToDetail(){
			document.getElementById("component").scrollIntoView({ block: 'start', behavior: 'smooth' });
		},
		gologin(){
			this.logining = !this.login;
		},
		changecross(){
			this.Across = !this.Across;
			this.Acrossa = !this.Acrossa;
		},
		nologin(){
			this.logining = false
		}
	}
})