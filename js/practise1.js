var vm = new Vue({
	el: '#practicing',
	data:{
		partone:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
		parttwo:[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75],
		partthree:[76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,],
		// 初始字体大小
		fs: 20,
		// 开始答题按钮的v-show值
		startBtn: 0,
		//选题题目的数组
		questions:[],
		
		//题目的索引值
		i:0,
		options:[],
		//单选题的选项数组
		oneQueOpt: [],
		
		//多选题的选项数组
		twoQueOpt:[],
		
		//判断题的选项数组
		threeQueOpt:[],

		//正确答案数组
		answers:[],
		
		checkValue:"",
		//分钟初始值
		minutes:40,
		//秒钟初始值
		seconds:0,
		//计时器
		time: "",
		//得分
		score: 0,
		//空题的个数
		ending: 0,
		//记录错题的index
		mistakes:[],
		//“上下一题”按钮的显示与隐藏的值
		previous: false,
		nextBtn: true,
		//用户选项的存放数组
		checkOptions: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	},
	methods:{
		startBtnValue(){
			//开始按钮的相关值设定
			this.startBtn = 1;
		},
		
		//点击开始按钮时调用的函数
		clickStartBtn(){
			//让“开始答题”按钮隐藏
			this.startBtnValue();
			//开始倒计时
			this.countTime();
			//从后台拿到题目、选项和答案
			this.setQuestions();
			this.setOptions();
			this.setAnswers();
			//第一次调用optionLists()
			this.optionLists();
			
			
		},


		//根据后台返回的数据得到题目、选项和答案,需调用
		getSomething(randomdata, field){
			var output = [];
			for(var q = 0; q <randomdata.length; q++) {
				output.push(radomdata[q][field]);
			}
			return output; 
		},




		//练习题数据的上传到data
		setQuestions(){
			//调用getSomething();设置相关参数即可拿到str
			//1. 单选题题目
			var str1 = '["aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete", "aaaaaaaa", "bbbbbbbb", "ccccccc", "ddddddd", "eeeeeee", "fffffffff","gggggggg", "hhhhhhhhh", "asaaw", "assvete"]';
			var partoneque = eval(str1);
			
			//2.多选题题目
			var str2 = '["得蝴蝶瓦好的", "当年黑u我和我", "内科外科蝶舞hi复合物", "呢威威hi文化氛围户外", "那我呢我爸问我的", "得蝴蝶瓦好的", "当年黑u我和我", "内科外科蝶舞hi复合物", "呢威威hi文化氛围户外", "那我呢我爸问我的", "得蝴蝶瓦好的", "当年黑u我和我", "内科外科蝶舞hi复合物", "呢威威hi文化氛围户外", "那我呢我爸问我的"]';
			var parttwoque = eval(str2);
			
			//3.判断题题目
			var str3 = '["cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8", "cnskdhfiiwe", "dewhiwcbw", "djehrwnycrnq3", "dercwrwncwhwo", "djicmrwocr3n8" ]';
			var partthreeque = eval(str3);

			//三个数组合并，存储数据在questions
			this.questions = partoneque.concat(parttwoque, partthreeque);
		},

		//页面上题目的内容设置  重点是参数i,需要调用
		theQuestion(){
			if(this.i <= 99){
				this.$refs.queblockcont.innerText = this.questions[this.i];
			}else{
				this.$refs.queblockcont.innerText = "";
			}
		},
		

		//题目选项的数据上传到data
		setOptions(){
			//1. 单选题的选项
			// var options1 = this.getSomething(radomDX60.data, "optionList");//数组里面是60个字符串数组
			var options1 = ["['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['sdsfwefe', 'dfewfewfe', 'deffgtrhtth', 'dsdsgrhtrtgrhreh']", "['fsrgeeg', 'regerey', 'feeere', 'feeeweyew']", "['hdsghh', 'aaqrwhyj', 'gdyuyjufdgd', 'sewawqewrrth4resfe']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", ];
			// 2.多选题的"optionList"
			// var options2 = this.getSomething(radomDX15.data, "optionList");
			var options2 = ["['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']", "['sefreigrgb', 'bufewfuefbe', 'niewfigvdjfk', 'chegwfygwefuewf']", "['fgththt', 'dewrrrrrrrrssr', 'gfegreyt', 'kujfgswqref']" ];
			//数组合并，存放数据在options
			this.options = options1.concat(options2);	
		},

		//把某一题的选项值单独拿出来
		optionLists(){
			if(this.i <=59){
				//单选
				var check1 = this.options[this.i];
				this.oneQueOpt = eval(check1);
			} else if(this.i >59 && this.i <=74){
				//多选
				var check2 = this.options[this.i];
				this.twoQueOpt = eval(check2);
			} else if(this.i >74 && this.i <=99){
				//判断
				this.threeQueOpt = ['对', '错'];
			} else {
				console.log("i=100超出了题目的索引，这是optionLists()")
			}
			
		},
		
		

		//把100个题的全部答案存放在data的answer数组里
		setAnswers(){
			//var oneAnswer = this.getSomething(randomDX60.data, "result");
			var oneAnswer = ['A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B','A','D','C','A','C','D','A','B','B','B',];
			//var twoAnswer = this.getSomething(randomDX15, "result");
			var twoAnswer = ['ABCD', 'ABC', 'BCD', 'AD', 'BC', 'ABD', 'CD', 'ABCD', 'ABC', 'BCD', 'AD', 'BC', 'ABD', 'CD', 'ABC'];
			//var threeAnswer = this.getSomething(randomPD25, 'result');
			var threeAnswer = ['Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y'];
			//合并三个数组，存放数据在Answers
			this.answers = oneAnswer.concat(twoAnswer, threeAnswer);
		},




		//清空input:check
		deleteChecked(w){
			for(let g = 0; g < w.length; g++){
				w[g].checked = false;
			}

		},

		//单选题和判断获取用户的选择，并且存放在checkOptions数组内
		getCheckOption(e){
			var checkval = this.$refs.answerSelect.getElementsByTagName("input");
			this.checkChangeClassName();
			for(let v =0; v<checkval.length; v++){
				if(v != e){
					checkval[v].checked = false;
				}else{
					//把用户输入的选项单独拿出来存放
					this.checkValue = checkval[v].value;
					this.checkOptions[this.i] = this.checkValue;
					this.checkValue = "";
				}
			}

		},
		//多选题获取用户的选择，并且存放在checkOptions数组内
		getCheckOptionMul(){
			var checkval = this.$refs.answerSelect.getElementsByTagName("input");
			this.checkChangeClassName();
			for(let r = 0; r < checkval.length; r++){
				if(checkval[r].checked){
					this.checkValue += checkval[r].value;
				}
			}
			this.checkOptions[this.i] = this.checkValue;
			this.checkValue = "";
		},


		//对比正确答案,算出分数
		getSore(){
			for(let n = 0; n < this.checkOptions.length; n++){
				if(this.checkOptions[n]===this.answers[n]){
					this.score +=1;
				}else{
					//mistakes数组里添加错题的索引值
					this.mistakes.push(n);
				}
			}
			
		},


		//做完题目加样式
		checkChangeClassName(){
			this.$refs.queNum.getElementsByTagName("li")[this.i].className += " bli";
			
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
			this.$refs.queNum1.getElementsByTagName("li")[this.i].id = "cli";
		},
		
		//点击答题卡回到相应相应的题目
		goToClickedQuestion(g, e){
			if (g == 1){
				this.i = e;
			} else if(g == 2){
				this.i = 60 + e;
				
			} else{
				this.i = 75 + e;
				
			}
			//遍历并重置input
			var checkval = this.$refs.answerSelect.getElementsByTagName("input");
			this.deleteChecked(checkval);
			//如果点击下一题是在之前已经做过的，在checkOptions数组里有数据，直接拿到之前做过的选项,选项不清空
			var checkedOpt = this.checkOptions[this.i];
			if(checkedOpt != ""){
				//取出之前的选择，令checked = true;
				this.checkOpts(checkedOpt, checkval);
			}
			this.theQuestion();
			this.optionLists();
		},
		
		checkOpts(z, x){
			for(var q = 0; q < z.length; q++){
				console.log(q);
				let t = z.substr(q, 1);
				console.log(t);
				if(t === 'A'){
					x[0].checked = true;
				}else if(t === 'B'){
					x[1].checked = true; 
				}else if(t === 'C'){
					x[2].checked = true;
				}else if(t === 'D'){
					x[3].checked = true;
				}else if(t ==='Y'){
					x[0].checked = true;
				}else if(t === 'N'){
					x[1].checked = true;
				}else{
					console.log("hhhh");
				}

			}
			
		},
		
		//下一题
		next(){
			if(this.i <= 99){
				this.i += 1;
				if (this.i >= 1) {
					this.previous = true;
				}
				//遍历并重置input
				var checkval = this.$refs.answerSelect.getElementsByTagName("input");
				this.deleteChecked(checkval);
				//如果点击下一题是在之前已经做过的，在checkOptions数组里有数据，直接拿到之前做过的选项,选项不清空
				var checkedOpt = this.checkOptions[this.i];
				if(checkedOpt != ""){
					//取出之前的选择，令checked = true;
					this.checkOpts(checkedOpt, checkval);
				}
				this.checkValue = "";
				
			} else{
				//当i ==100是，“上一题”按钮还在，“下一题”按钮隐藏“提交”按钮显示
				this.previous = true;
				this.nextBtn = false;
				
			}
			this.theQuestion();	
			this.optionLists();	
			//this.weatherCheck();
			
		},
		// 上一题
		before(){
			this.i -=1;
			//清空input:checked
			var checkval = this.$refs.answerSelect.getElementsByTagName("input");
			this.deleteChecked(checkval);
			if(this.i <=99){
				//让“上一题”按钮消失
				if(this.i == 0){
					this.previous = false;
				}
				//如果点击上一题是在之前已经做过的，直接拿到之前做过的选项,选项不清空,
				var  checkedOpt = this.checkOptions[this.i];
				console.log(checkedOpt.length);
				if(checkedOpt != ""){
					//取出之前的选择，令checked = true;
					this.checkOpts(checkedOpt, checkval);
				}

			} else{
				console.log("i不在0-99之间")
			}
			//题目和选项值的重新设置
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
		submit(){
			//需要弹出框,加上按钮点击事件,点击确定则显示分数的页面,若是取消,则返回做题的页面.
			this.ending = 1;
		},
		clickCancel(e){
			this.ending = e;
		},
		clickYes(){
			//点击确认说明提交答题卡
			//1.隐藏弹出框
			this.clickCancel();
			//2.获得分数
			this.getSore();
			//3.显示有分数的界面
			this.startBtn = 2;
			//4.改变答错题目答题卡题号的样式
			if(this.mistakes.length >0){
				for(let t = 0; t < this.mistakes.length; t++){
					let misLi = this.mistakes[t];
					this.$refs.queNum.getElementsByTagName("li")[misLi].id = "mli";
				};
			}
			
		}
		
	},
})