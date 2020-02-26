var vm = new Vue({
	el: '#regestweb',
	data:{
		Across: true,
		Acrossa: false,
		//两次输入的密码双向绑定
		pwd1: "",
		pwd2: "",
		imgUrl: '',
		email: "",
		emailAlert: "",
		time: 60,
		num: null,

	},
	methods:{
		changecross(){
			this.Across = !this.Across;
			this.Acrossa = !this.Acrossa;
		},
		goindex(){
			this.$router.replace('/index.html')
		},
		registered(){
			//两次输入的密码是否一致
			if(this.pwd1 === this.pwd2){
				console.log("两次输入的密码一致")
			}else{
				//显示“密码不一致！”
				this.$refs.pwdTip.style.display = "block";
			}	
		},
		//头像图片预览
		uploadImg(e){
			let file = e.target.files[0];
			let filename = file.name;
			let fileSize = file.size;
			//判断是否是图片
			if(!/image\/\w+/.test(file.type)){
        		alert('上传的不是图片');
        		return false;
        	}else{
        		//限制图片的大小
				if(fileSize>3*1024*1024){
				alert('上传的图片的大于3M,请重新选择');
        		}else{
					let url = '';
					var reader = new FileReader();
					reader.readAsDataURL(file);
					let that = this;
					reader.onload = function(e){
						url = this.result.substring(this.result.indexOf(',')+1);
						that.imgUrl = 'data:img/png;base64,'+url;
						that.$refs.accountImg.setAttribute('src', that.imgUrl);
				
					}
					let filevalue = this.$refs.getfilename.value
					filevalue = filename;
					console.log(filename);
					this.$refs.setfilename.innerText = filename;
        		}
        	}
        	
			
		},
		//输入的邮箱验证，邮箱格式正确即可发送验证码
		sendEmail(){
			var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(this.email==''){
					this.emailAlert = "请输入邮箱";
					this.$refs.emailAlert.style.display = "block";
				}else if(!regEmail.test(this.email)){
					this.emailAlert = "邮箱格式不正确";
					this.$refs.emailAlert.style.display = "block";
				}else{
					//定时器
					if(this.time == 60){
						this.timer();
					}else{
						alert("请耐心等待");
					}
				}
		 },
		 //定时器
		 timer(){
		 	if (this.time > 0) {
				this.time--;
				this.$refs.getCode.value=this.time+"s后重试";
				console.log(this.$refs.getCode.value);
				setTimeout(this.timer, 1000);
			} else{
				this.time=60;
				this.$refs.getCode.value="获取验证码";
			}
		 },
		 getNum(){
		 	this.num = Math.ceil(Math.random()*10);//0-10随机数
		 	var randomImg = "./img/regest/img"+this.num+".jpg";
		 	this.$refs.accountImg.setAttribute('src', randomImg);
		 	let filevalue = this.$refs.getfilename.value;
		 	let filename = "img"+this.num+".jpg";
		 	filevalue = filename;
		 	this.$refs.setfilename.innerText = filename;
		 },
	
	}



})