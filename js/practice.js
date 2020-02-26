var vm = new Vue({
	el: '#practicing',
	data:{
		partone:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
		parttwo:[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75],
		partthree:[76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,],
		// 初始字体大小
		fs: 20,
		// 开始答题按钮的v-show值
		start: true,
		select:['A','B','C','D'],
		judge:['对','错'],
		//单选题题目的数组
		partoneque:[],
		//多选题题目的数组
		parttwoque:[],
		//判断题题目的数组
		partthreeque:[],
		//单选题题目的索引值
		i:0,
		// 多选题题目的索引值
		j: 0,
		//判断题题目的索引值
		z: 0,
		//单选题的选项数组
		oneQueOpt: [],
		options1:[],
		//多选题的选项数组
		twoQueOpt:[],
		options2:[],
		//判断题的选项数组
		threeQueOpt:[],
		//单选题的正确答案数组
		oneAnswer:[],
		//多选题的正确答案数组
		twoAnswer:[],
		//判断题的正确答案数组
		threeAnswer:[],
		selectAnswer:"",
		//分钟初始值
		minutes:40,
		//秒钟初始值
		seconds:0,
		//计时器
		time: "",
		//得分
		score: 0,
		//空题的个数
		emptyCheck: 0,
		ending: false,
		//记录错题的index
		mistake1:[],
		mistake2:[],
		mistake3:[],
	},
	methods:{
		//点击开始按钮时调用的函数
		clickStartBtn(){
			//拿到题目、选项和答案
			this.practiceque();
			this.setOptions();
			this.setAnswers();
			//第一次调用optionLists()
			this.optionLists();
			//开始倒计时
			this.countTime();
			//start值的设置，
			this.startpra();
		},





		//练习题的对接
		practiceque(){
			//调用getSomething();设置相关参数即可拿到str
			//1. 单选题题目
			var str1 = '["aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete"]';
			this.partoneque = eval(str1);
			
			//2.多选题题目
			var str2 = '["得蝴蝶瓦好的", "当年黑u我和我", "内科外科蝶舞hi复合物", "呢威威hi文化氛围户外", "那我呢我爸问我的", "得蝴蝶瓦好的", "当年黑u我和我", "内科外科蝶舞hi复合物", "呢威威hi文化氛围户外", "那我呢我爸问我的", "得蝴蝶瓦好的", "当年黑u我和我", "内科外科蝶舞hi复合物", "呢威威hi文化氛围户外", "那我呢我爸问我的"]';
			this.parttwoque = eval(str2);
			
			//3.判断题题目
			var str3 = '["cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8" ]';
			this.partthreeque = eval(str3);
		},
		
		//选项和答案的对接
		optionLists(){
			if(this.i <=59){
				var check1 = this.options1[this.i];
				this.oneQueOpt = eval(check1);
			} else if(this.i >59 && this.j <=14){
				var check2 = this.options2[this.j];
				this.twoQueOpt = eval(check2);
			} else if(this.i >59 && this.j >14 &&this.z <=25){
				this.threeQueOpt = ['对', '错']
			} else {
				console.log("这里出问题了")
			}
			
		},
		
		//根据后台返回的数据得到题目、选项和答案,需调用
		getSomething(randomdata, field){
			var output = [];
			for(var q = 0; q <randomdata.length; q++) {
				output.push(radomdata[q][field]);
			}
			return output; //获得选项组成的数组, 每个数据是单个题目选项的字符串数组
		},



		//设置与题目选项的数据
		setOptions(){
			//1. 单选题的选项
			//this.options1 = this.getSomething(radomDX60.data, "optionList");//数组里面是60个字符串数组
			this.options1 = ["['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", ];
			// 2.多选题的"optionList"
			// this.options2 = this.getSomething(radomDX15.data, "optionList");
			this.options2 = ["['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']" ];
					
		},
		//设置与答案相关的数据
		setAnswers(){
			//this.oneAnswer = this.getSomething(randomDX60.data, "result");
			this.oneAnswer = ['A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B',];
			//this.twoAnswer = this.getSomething(randomDX15, "result");
			this.twoAnswer = ['ABCD', 'ABC', 'BCD', 'AD', 'BC', 'ABD', 'CD', 'ABCD', 'ABC', 'BCD', 'AD', 'BC', 'ABD', 'CD', 'ABC'];
			//this.threeAnswer = this.getSomething(randomPD25, 'result');
			this.threeAnswer = ['Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y'];
		},




		//检查多个checkbox 是否被选中一个, 选中就表示题目做过了,加样式
		weatherCheck(){
			var checkval = this.$refs.answerSelect.getElementsByTagName("input");
			var checkValue = "";
			var noCheck = 0;
			for(var m = 0; m < checkval.length; m++){
				if(checkval[m].checked){
				this.checkChangeClassName();
				checkValue += checkval[m].value;
				//取消checkbox的选中状态，方便下一题的选择
				checkval[m].checked = false;
				}else{
					noCheck ++;
				}
			}
			this.getCheckValue(checkValue);
			//循环完之后检查是否空题，有则记录下来，无则不则    bug: 点击题号直接跳，不会记录
			if(noCheck > checkval.length){
				this.emptyCheck ++;
			}

		},




		//在这里可以返回所选值,进行校验,算出分数
		getCheckValue(theValue){
			if(this.i <= 59){
				if(this.oneAnswer[this.i-1] === theValue){
					this.score ++;
				}else{
					//添加错误题号的索引
					this.mistake1.push(this.i);
				}
			} else if(this.i >59 && this.j <=14){
				this.selectAnswer += theValue;
				//var tmp = ths.selectAnswer.join(',');
				if(this.twoAnswer[this.j-1] === theValue){
					this.score ++;
					this.selectAnswer = "";
				}else{
					//添加错误题号的索引
					this.mistake2.push(this.j);
				}
			} else if(this.i >59 && this.j >14 &&this.z <=25){
				if(this.threeAnswer[this.z-1] === theValue){
					this.score ++;
				}else{
					//添加错误题号的索引
					
					if(this.z == 25){
						this.mistake3.push(this.z-1);
					}else{
						this.mistake3.push(this.z);
					}
				}
			} else{
				console.log("z=25, 没有题目，没有选项，也没有答案")
			}
		},




		//做完题目加样式
		checkChangeClassName(){
			if(this.i <= 59){
				this.$refs.queNum1.getElementsByTagName("li")[this.i-1].className += " bli";
			} else if(this.i >59 && this.j <=14){
				this.$refs.queNum1.getElementsByTagName("li")[this.i-1].className += " bli";
				if(this.j == 0){
					this.selectAnswer="";
				}else{
					this.$refs.queNum2.getElementsByTagName("li")[this.j-1].className += " bli";
				}
				
			} else if(this.i >59 && this.j >14 &&this.z <=25){
				
				if(this.z == 0 && this.j == 15){
					this.$refs.queNum2.getElementsByTagName("li")[this.j-1].className += " bli";
					this.selectAnswer = "";
				}else{
					this.$refs.queNum3.getElementsByTagName("li")[this.z-1].className += " bli";
				}
			} else{
				console.log("做完题目没有加样式")
			}
		},
		
		startpra(){
			//开始按钮的相关值设定
			this.start = false;
		},
		
		// 改变字体大小
		fontsizeb(){
			this.fs += 2;
		},
		fontsizes(){
			this.fs -= 2;
		},
		// 标记样式显示
		mark(){
			if(this.i <= 59){
				this.$refs.queNum1.getElementsByTagName("li")[this.i].id = "cli";
			} else if(this.i >59 && this.j <=14){
				this.$refs.queNum2.getElementsByTagName("li")[this.j].id = "cli";
			} else if(this.i >59 && this.j >14 &&this.z <=24){
				this.$refs.queNum3.getElementsByTagName("li")[this.z].id = "cli";
			} else{
				console.log("没有标记")
			}
		},
		
		//点击答题卡回到相应相应的题目
		goToClickedQuestion(g, e){
			
			if (g == 1){
				this.i = e;
			} else if(g == 2){
				this.i = 60;
				this.j = e;
			} else{
				this.i = 60;
				this.j = 15;
				this.z = e;
			}
			this.theQuestion();
			this.optionLists();
		},
		
		//题目的内容设置  重点是参数i j z
		theQuestion(){
			if(this.i <= 59){
				this.$refs.queblockcont.innerText = this.partoneque[this.i];
			} else if(this.i >59 && this.j <=14){
				this.$refs.queblockcont.innerText = this.parttwoque[this.j];
			} else if(this.i >59 && this.j >14 && this.z <=24){
				this.$refs.queblockcont.innerText = this.partthreeque[this.z];
			} else{
				this.$refs.queblockcont.innerText = this.partthreeque[24];
			}
		},
		
		//下一题
		next(){
			if(this.i <= 59){
				this.i++;
			} else if(this.i >59 && this.j <=14 ){
				//当i=60时,说明单选题已经做完了,即可跳转到多选题
				this.j++;
			} else if(this.i >59 && this.j >14 &&this.z <= 24){
				this.z++;
				console.log(this.z)
			} else{
				if(this.emptyCheck > 0){
					this.ending = 1
				}else{
					this.ending = true;
					//弹出框是否提交
					//分数
				}
				
				//需要弹出框,加上按钮点击事件,点击确定则显示分数的页面,若是取消,则返回做题的页面.
			}
			this.theQuestion();	
			this.optionLists();	
			this.weatherCheck();
			
		},
		// 上一题
		before(){
			if(this.i == 0){
				alert("已经是第一题了")
			} else if(this.i <=59){
				this.i--;
			} else if(this.i >59 && this.j <=14){
				if (this.j == 0) {
					this.i--;
				} else{
					this.j--;
				}
			} else if(this.i >59 && this.j >14 && this.z <= 24){
				if (this.z == 0) {
					this.j--;
				} else{
					this.z--;
				}
			} else{
				console.log("有问题")
			}
			this.theQuestion();
			this.optionLists();	
		},
		
		// 倒计时90分钟
		countTime(){
				this.time = window.setInterval( ()=>{
				var _this = this;
				//预设秒钟的字符串型,方便<10时正规格式显示在页面上
				var s = "59";
				if (_this.seconds === 0 && _this.minutes !== 0) {
					_this.seconds = 59;
					_this.minutes -= 1;
				} else if (_this.minutes === 0 && _this.seconds === 0) {
					_this.seconds = 0;
					window.clearInterval(time);
				} else {
					_this.seconds -= 1;
					if (_this.seconds < 10) {
						s = "0" + _this.seconds;
					} else{
						s = _this.seconds;
					}
				}
				_this.$refs.retime.innerText = "剩余时间   " + _this.minutes + ":" + s;
			}, 1000);
			
		},
		
		clickCancel(){
			this.ending = false;
		},
		clickYes(){
			//点击确认说明提交答题卡
			//1.隐藏弹出框
			this.clickCancel();
			//2.显示有分数的界面
			this.start = 1;
			//3.改变答错题目答题卡题号的样式
			if(this.mistake1.length >0){
				for(let g = 0; g < this.mistake1.length; g++){
					let misLi = this.mistake1[g];
					this.$refs.queNum1.getElementsByTagName("li")[misLi].id = "mli";
				};
			}
			if(this.mistake2.length >0){
				for(let h = 0; h < this.mistake2.length; h++){
					let misLi = this.mistake2[h];
					this.$refs.queNum2.getElementsByTagName("li")[misLi].id = "mli";
				};
			}
			if(this.mistake3.length >0){
				for(let k = 0; k < this.mistake3.length; k++){
					let misLi = this.mistake3[k];
					this.$refs.queNum3.getElementsByTagName("li")[misLi].id = "mli";
				}
			}
			
		}
		
	},
})