var lg = new Vue({
	el: '#loginweb',
	data:{
		Across: true,
		Acrossa: false
	},
	methods:{
		changecross(){
			this.Across = !this.Across;
			this.Acrossa = !this.Acrossa;
		}
		
	}



})