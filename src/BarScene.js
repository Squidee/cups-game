DrinkDrive.BarScene = function(game) {
	var barBlackboard;
	var barDrinks;
	var barTop;
	var barFloor;

	var drinkSelectButton;
	var quizSelectButton;

	var blackboardText;
	var selectedChar;

	var swiping;
	var firstPointY;
	var firstPointX;
	var lastPointY;
	var lastPointX;

	var drinkCount;
	var endCount;
	var leftArrow;
	var rightArrow;
	var selectedDrink;
	var selectedDrinkLabel;
	var stdDrinkNo;
	var stdDrinkTxt;
	var stdDrinkSub;

	//Quiz Variables
	var quizScore;
	var microphone;
	var quizQuestions

	var nextSceneButton;
	var stdDrinkNoTxt;
	var stdDrinkNoTxtSub;

	var drinkInfoScreen;
	var quizStartButton;
	var quizByLine;
	var currentQ;
	var highlightShadow;

	var sharebox;
	var facebookShareButton;
	var twitterShareButton;
	var emailShareButton;
	var closeShareButton;

	var timeoutVar;

	var finalPrize;
};
DrinkDrive.BarScene.prototype = {
	preload: function() {
		switch(DrinkDrive.GENDER) {
			case 'female':
				if(DrinkDrive.CHOSEN_CHAR == 3) {
					this.load.json('drinkScript', 'json/pl_female_dictionary-rename.json');
				}
				else {
					this.load.json('drinkScript', 'json/female_dictionary.json');
				}
				break;
			case 'male':
				if(DrinkDrive.CHOSEN_CHAR == 3) {
					this.load.json('drinkScript', 'json/pl_male_dictionary.json');
				}
				else {
					this.load.json('drinkScript', 'json/male_dictionary.json');
				}
				break;
			default:
				this.load.json('drinkScript', 'json/female_dictionary.json');
				break;
		}
		this.load.json('quizQuestions', 'json/quiz_questions.json');
	},
	create: function() {
		ga('send','startBarScene','game', 'load', 'Start Bar Scene');
		timeoutVar = setTimeout(function() { 1+1; }, 10);
		drinkCount = Math.floor((Math.random() * 5 ));
		endCount = drinkCount-1;
		sharebox = this.add.sprite(75,200,'sharebox');
		sharebox.kill();
		if(endCount == -1)
		{
			endCount = 5;
		}
		swiping = false;
		firstTime = 1;
		barBlackboard = this.add.sprite(GAME_WIDTH/2-233.5,-1000, 'general', 'bar_blackboard');
		barDrinks = this.add.sprite(-1000, 514, 'general', 'bar_drinks');
		barTop = this.add.sprite(-1000, 442, 'general', 'bar_bartop');
		barFloor = this.add.sprite(GAME_WIDTH, 724, 'general', 'bar_floor');
		this.time.events.add(200, function() {
			var barFloorTween = this.add.tween(barFloor).to({ x: GAME_WIDTH/2-254 }, 350).start();
			var barTopTween = this.add.tween(barTop).to({ x: GAME_WIDTH/2-228 }, 400).start();
			var barDrinksTween = this.add.tween(barDrinks).to({ x: GAME_WIDTH/2-206.5 }, 400).start().onComplete.add(function() { 
				this.time.events.add(20, function() {
					this.add.tween(barDrinks).to({y: '-215'}, 500, Phaser.Easing.Exponential.Out,false).start();
					this.add.tween(barBlackboard).to({y: 20}, 500, Phaser.Easing.Exponential.Out,false).start().onComplete.add(function() {
						blackboardText = this.add.text(GAME_WIDTH/2-150, 100, 'Know your drinks');

						blackboardText.font = 'ChronicaPro-Heavy';
						blackboardText.fontSize = 56;
						blackboardText.lineSpacing = -10;
						blackboardText.align = "center";
						blackboardText.fill = "#ffffff";
						blackboardText.wordWrap = true;
						blackboardText.x = Math.floor(barBlackboard.x + barBlackboard.width / 2);
						blackboardText.y = Math.floor(barBlackboard.y + barBlackboard.height / 2)-15;
						blackboardText.wordWrapWidth = barBlackboard.width-60;
						blackboardText.anchor.set(0.5);

						this.loadCharacter(DrinkDrive.CHOSEN_CHAR);
						this.loadButtons();
					}, this);
				}, this); 
			}, this);
		}, this);
	},
	loadCharacter: function(charCount) {
		selectedChar = this.add.group();
		selectedChar.x = -75;
		selectedChar.y = -300;
		
		switch(DrinkDrive.GENDER)
		{
			case 'male':
				charBody = selectedChar.create((GAME_WIDTH/2),221*.82, 'selectableChars', 'Char_'+charCount+'_body');
				charBody.anchor.setTo(0.5,1);

				charLEye = selectedChar.create((GAME_WIDTH/2)-50,-83*.82, 'selectableChars', 'Char_'+charCount+'_eye');
				charREye = selectedChar.create((GAME_WIDTH/2)+22,-83*.82, 'selectableChars', 'Char_'+charCount+'_eye');
				charLBrow = selectedChar.create(GAME_WIDTH/2-70, -112*.82, 'selectableChars', 'Char_'+charCount+'_eyebrow');
				charRBrow = selectedChar.create(GAME_WIDTH/2+4, -112*.82, 'selectableChars', 'Char_'+charCount+'_eyebrow');
				charLArm = selectedChar.create(GAME_WIDTH/2-113, 41*.82, 'selectableChars', 'Char_'+charCount+'_larm');
				charLHand = selectedChar.create(GAME_WIDTH/2-118, 130*.82, 'selectableChars', 'Char_'+charCount+'_lhand');
				charRArm = selectedChar.create(GAME_WIDTH/2+83, 40*.82, 'selectableChars', 'Char_'+charCount+'_rarm');
				charRHand = selectedChar.create(GAME_WIDTH/2+73, 130*.82, 'selectableChars', 'Char_'+charCount+'_rhand');
				charLLeg = selectedChar.create(GAME_WIDTH/2-83,200*.82, 'selectableChars', 'Char_'+charCount+'_lleg');
				selectedChar.sendToBack(charLLeg);
				charRLeg = selectedChar.create(GAME_WIDTH/2+21, 200*.82,'selectableChars', 'Char_'+charCount+'_rleg');
				selectedChar.sendToBack(charRLeg);
				charLFoot = selectedChar.create(GAME_WIDTH/2-95,335*.82, 'selectableChars', 'Char_'+charCount+'_lfoot');
				charRFoot = selectedChar.create(GAME_WIDTH/2+47,335*.82, 'selectableChars', 'Char_'+charCount+'_rfoot');

				mouth = selectedChar.create(285, 0, 'selectableChars', 'mouth_1');

				if(charCount==2)
				{
					charLFoot.x = 238;
					charRFoot.x = 357;
					charLLeg.x = 234;
					charRLeg.x = 351;
				}

				break;
			case 'female':
				charBody = selectedChar.create((GAME_WIDTH/2),230, 'selectableChars', 'Char_'+charCount+'_body');
				charBody.anchor.setTo(0.5,1);

				charLEye = selectedChar.create((GAME_WIDTH/2)-50,-70, 'selectableChars', 'Char_'+charCount+'_eye');
				charREye = selectedChar.create((GAME_WIDTH/2)+22,-70, 'selectableChars', 'Char_'+charCount+'_eye');
				charLBrow = selectedChar.create(GAME_WIDTH/2-70, -104, 'selectableChars', 'Char_'+charCount+'_eyebrow');
				charRBrow = selectedChar.create(GAME_WIDTH/2+4, -104, 'selectableChars', 'Char_'+charCount+'_eyebrow');
				charLArm = selectedChar.create(GAME_WIDTH/2-113, 41*.82, 'selectableChars', 'Char_'+charCount+'_larm');
				charLHand = selectedChar.create(GAME_WIDTH/2-118, 130*.82, 'selectableChars', 'Char_'+charCount+'_lhand');
				charRArm = selectedChar.create(GAME_WIDTH/2+83, 40*.82, 'selectableChars', 'Char_'+charCount+'_rarm');
				charRHand = selectedChar.create(GAME_WIDTH/2+73, 130*.82, 'selectableChars', 'Char_'+charCount+'_rhand');
				charLLeg = selectedChar.create(267,174, 'selectableChars', 'Char_'+charCount+'_lleg');
				selectedChar.sendToBack(charLLeg);
				charRLeg = selectedChar.create(339, 174,'selectableChars', 'Char_'+charCount+'_rleg');
				selectedChar.sendToBack(charRLeg);
				charLFoot = selectedChar.create(260,335*.82, 'selectableChars', 'Char_'+charCount+'_lfoot');
				charRFoot = selectedChar.create(332,335*.82, 'selectableChars', 'Char_'+charCount+'_rfoot');

				mouth = selectedChar.create(285, 0, 'selectableChars', 'mouth_1');

				if(charCount==1 || charCount==3)
				{
					charBody.y = 210;
					charLLeg.x = 274;
					charLLeg.y = 170;
					charRLeg.y = 170;
					charRLeg.x = 345;
					charLFoot.x = 263;
					charRFoot.x = 334;
					charRFoot.y = 265.7;
					charLFoot.y = 265.7;
					selectedChar.y = 394;
				}
				break;
			default:
				break;
		}

		//Group seperate parts and set pivot points

//Left Arm
		charLLimb = this.add.group();
		charLLimb.add(charLArm);
		charLLimb.add(charLHand);
		selectedChar.add(charLLimb);
		charLLimb.pivot.x = (GAME_WIDTH/2-113+charLArm.width);
		charLLimb.x += (GAME_WIDTH/2-113+charLArm.width);
		charLLimb.pivot.y = 47*.82;
		charLLimb.y += 47*.82;
		

		//Right Arm
		charRLimb = this.add.group();
		charRLimb.add(charRArm);
		charRLimb.add(charRHand);
		selectedChar.add(charRLimb);
		charRLimb.pivot.x = GAME_WIDTH/2+83;
		charRLimb.x += GAME_WIDTH/2+83;
		charRLimb.pivot.y = 47*.82;
		charRLimb.y += 47*.82;
		

		//Hands
		charLHand.pivot.x = charLHand.width/2;
		charLHand.x += charLHand.width/2;
		charRHand.pivot.x = charRHand.width/2;
		charRHand.x += charRHand.width/2;

		selectedChar.scale.setTo(0.75,0.75);

		if(charCount==3 && DrinkDrive.GENDER == 'male')
		{
			charGlasses = selectedChar.create(GAME_WIDTH/2-73, -90*.82, 'selectableChars', 'Glasses');
	
			charPPlate = selectedChar.create((GAME_WIDTH/2)-93,35*.82, 'selectableChars', 'P_L_chain');
		}
		if(charCount==3 && DrinkDrive.GENDER == 'female')
		{
			
			charPPlate = selectedChar.create((GAME_WIDTH/2)-93,35*.82, 'selectableChars', 'P_L_chain');
		}

		charLLimb.parent.sendToBack(charLLimb);
		charRLimb.parent.sendToBack(charRLimb);


		mouth.frameName = 'mouth_8';
		mouth.y -= 10;

		var charRArmUp = this.add.tween(charRLimb).to({angle:'-132', y: '+20'}, 50, Phaser.Easing.Linear.None, true, 100).start();
				charRArmUp.onComplete.add(function() { 
					var charBobbleRATween = this.add.tween(charRLimb).to({ angle:'-15', y: '+10'}, 400).start(); 
				}, this);

				var charLArmUp = this.add.tween(charLLimb).to({angle:'+132', y: '+20'}, 50, Phaser.Easing.Linear.None, true, 100).start();
				charLArmUp.onComplete.add(function() {
					var charBobbleLATween = this.add.tween(charLLimb).to({ angle:'+15', y: '+20'}, 400).start();
				}, this);
		var charEntryTween = this.add.tween(selectedChar).to({ y: 520 }, 600, Phaser.Easing.Bounce.Out).start().onComplete.add(function() {
			charLLimb.y -= 40;
			charRLimb.y -= 30;
			charLLimb.angle = 0;
			charRLimb.angle = 0;
			mouth.frameName = 'mouth_1';
			mouth.y += 10;
		}, this);
	},
	update: function() {
		this.onSwipe();
		if (swiping) {
			swiping = false;
			if(firstPointY > lastPointY) {
				this.startNextScene();
			}
			else if(firstPointY < lastPointY) {
				this.startPrevScene();
			}
		}	
	},
	loadButtons: function() {
		drinkSelectButton = this.add.button((GAME_WIDTH/2)-10, 452, 'general', this.startDrinks, this);
		drinkSelectButton.frameName = 'grab_a_drink_big_btn';

		quizSelectButton = this.add.button((GAME_WIDTH/2)-10, 612, 'general', this.startQuiz, this);
		quizSelectButton.frameName = 'pub_quiz_big_btn';

		nextSceneButton = this.add.button(GAME_WIDTH/2-254, 804, 'general', this.startNextScene, this);
		nextSceneButton.frameName = 'next_scene_btn';

		var shareButton = this.add.button(GAME_WIDTH/2+115, 804, 'general', this.startShare, this);
		shareButton.frameName = 'share_me_btn';

		var swipeDownImg = this.add.sprite(GAME_WIDTH/2-17, 874, 'general', 'swipe_down_arrow');
		var swipeDownTxt = this.add.text((GAME_WIDTH/2)-45, 804, 'Swipe down');

		swipeDownTxt.font = 'ChronicaPro-Heavy';
		swipeDownTxt.fontSize = 30;
		swipeDownTxt.lineSpacing = -10;
		swipeDownTxt.align = "center";
		swipeDownTxt.fill = "#ffffff";
		swipeDownTxt.wordWrap = true;
		swipeDownTxt.wordWrapWidth = 50;
	},
	startDrinks: function() {
		ga('send','startDrinksScene','game', 'click', 'Start Drinks Scene');
		blackboardText.text = gameScript.bar_intro;
		blackboardText.fontSize = 50*.82;
		drinkSelectButton.kill();
		quizSelectButton.kill();
		nextSceneButton.kill();
		var pubQuizButton = this.add.button(GAME_WIDTH/2-254, 804, 'general', this.restartState, this);
		pubQuizButton.frameName = 'StopGoBack_btn';

		this.time.events.add(2000, function() {
			this.loadDrink(drinkCount, 1);
			leftArrow = this.add.button(20,((GAME_HEIGHT)/2)-20, 'general', this.leftDrinkSelect, this);
			leftArrow.frameName = 'arrow_left';
			rightArrow = this.add.button((GAME_WIDTH)-112,((GAME_HEIGHT)/2)-20, 'general', this.rightDrinkSelect, this);
			rightArrow.frameName = 'arrow_right';
		}, this);

	},
	restartState: function() {
		this.stopAllTimeouts();
		this.state.start(this.state.current);
	},
	loadDrink: function(drinkCount, firstTime) {

		drinkInfoScreen = 1;
		selectedDrink = this.add.sprite(GAME_WIDTH+200, 920*.82, 'drinks', drinkCount+'_container');

		switch(drinkCount) {
			case 0:
			selectedDrinkLabel = this.add.sprite(400, 850*.82, 'drinks', drinkCount+'_label');
			break;

			case 1:
			selectedDrinkLabel = this.add.sprite(400, 900*.82, 'drinks', drinkCount+'_label');
			break;

			case 2:
			selectedDrinkLabel = this.add.sprite(400, 850*.82, 'drinks', drinkCount+'_label');
			break;

			case 3:
			selectedDrinkLabel = this.add.sprite(400, 925*.82, 'drinks', drinkCount+'_label');
			break;

			case 4:
			selectedDrinkLabel = this.add.sprite(400, 725*.82, 'drinks', drinkCount+'_label');
			break;

			case 5:
			selectedDrinkLabel = this.add.sprite(400, 925*.82, 'drinks', drinkCount+'_label');
			break;

			default:
			selectedDrinkLabel = this.add.sprite(400, 925*.82, 'drinks', drinkCount+'_label');
			break;
		}
		
		selectedDrink.anchor.setTo(0.5, 1);
		selectedDrinkLabel.anchor.setTo(0.5, 1);
		selectedDrinkLabel.scale = {x: 0, y: 0};

		if(firstTime == 1)
		{
			this.time.events.add(800, function() {
				this.add.tween(selectedDrink).to({x: 400}, 200, Phaser.Easing.Linear.Out, false).start().onComplete.add(function() {
					this.add.tween(selectedDrinkLabel.scale).to({x: 1.1, y:1.1}, 180, Phaser.Easing.Linear.None, false).start().onComplete.add(function() {
						this.add.tween(selectedDrinkLabel.scale).to({x: 1, y:1}, 70, Phaser.Easing.Linear.None, false).start();
					},this);
				}, this);

				
				this.loadDrinkText(drinkCount, firstTime);

				leftArrow.bringToTop();
				rightArrow.bringToTop();
			}, this);
		}
		else
		{
			this.add.tween(selectedDrink).to({x: 400}, 200, Phaser.Easing.Linear.Out, false).start().onComplete.add(function() {
					this.add.tween(selectedDrinkLabel.scale).to({x: 1.1, y:1.1}, 180, Phaser.Easing.Linear.None, false).start().onComplete.add(function() {
						this.add.tween(selectedDrinkLabel.scale).to({x: 1, y:1}, 70, Phaser.Easing.Linear.None, false).start();
					},this);
				}, this);
			
			this.loadDrinkText(drinkCount);

			leftArrow.bringToTop();
			rightArrow.bringToTop();

		}

		selectedDrink.inputEnabled = true;
		selectedDrinkLabel.inputEnabled = true;
		selectedDrink.events.onInputDown.add(function(){
			this.stopAllTimeouts();
			drinkInfoScreen++;
	        this.addDrinkText(firstTime);
		}, this);
		selectedDrinkLabel.events.onInputDown.add(function(){
			this.stopAllTimeouts();
			drinkInfoScreen++;
	        this.addDrinkText(firstTime);
		}, this);
		if(sharebox.exists==true)
		{
			sharebox.bringToTop();
			facebookShareButton.bringToTop();
			twitterShareButton.bringToTop();
			emailShareButton.bringToTop();	
			closeShareButton.bringToTop();
		}
	},
	leftDrinkSelect: function() {
		this.stopAllTimeouts();
		drinkCount--;
		if(drinkCount<0) {
			drinkCount = 5;
		}
		selectedDrinkLabel.kill();
		this.add.tween(selectedDrink).to({alpha: 0}, 400, Phaser.Easing.Quadratic.None, false).start();
		selectedDrink.kill();

		stdDrinkNo.kill();
		stdDrinkTxt.kill();
		stdDrinkSub.kill();
		stdDrinkNoTxt.kill();
		stdDrinkNoTxtSub.kill();

		this.loadDrink(drinkCount, 0);
	},
	rightDrinkSelect: function() {
		this.stopAllTimeouts();
		drinkCount++;
		if(drinkCount > 5){
			drinkCount = 0;
		}
		selectedDrinkLabel.kill();
		this.add.tween(selectedDrink).to({alpha: 0}, 400, Phaser.Easing.Quadratic.None, false).start();
		selectedDrink.kill();

		stdDrinkNo.kill();
		stdDrinkTxt.kill();
		stdDrinkSub.kill();
		stdDrinkNoTxt.kill();
		stdDrinkNoTxtSub.kill();

		this.loadDrink(drinkCount, 0);
	},
	loadDrinkText: function(drinkCount, firstTime) {
		drinkScript = this.cache.getJSON('drinkScript');
		drinkScript = drinkScript[drinkCount+1];

		this.addDrinkText(firstTime);
	},
	addDrinkText: function(firstTime) {
		switch(drinkInfoScreen) {
			case 1:
				blackboardText.fontSize = 41;
				blackboardText.y = Math.floor(barBlackboard.y + barBlackboard.height / 2)-15;

				stdDrinkNo = this.add.sprite(barBlackboard.x+120, (barBlackboard.height/2)+32, 'general', drinkScript.drink_id+"_standard_number");
				stdDrinkNo.anchor.set(0.5);

				stdDrinkTxt = this.add.text((barBlackboard.width/2)+85, (barBlackboard.height/2)+30, "Standard");
			
				stdDrinkTxt.anchor.set(0,1);
				stdDrinkTxt.font = 'ChronicaPro-Heavy';
				stdDrinkTxt.fontSize = 38;
				stdDrinkTxt.fill = "#ffffff";

				if(drinkScript.drink_id == 'spirits') {
					stdDrinkSub = this.add.text((barBlackboard.width/2)+85, (barBlackboard.height/2)+65, "DRINK");
					stdDrinkSub.fontSize = 55;
				}
				else {
					stdDrinkSub = this.add.text((barBlackboard.width/2)+85, (barBlackboard.height/2)+65, "DRINKS");
					stdDrinkSub.fontSize = 47;
				}
				stdDrinkSub.anchor.set(0,0.5);
				stdDrinkSub.font = 'ChronicaPro-Heavy';
				stdDrinkSub.fill = "#ffffff";

				stdDrinkNoTxt = this.add.text(stdDrinkNo.x, stdDrinkNo.y - 10 , drinkScript.time);
				stdDrinkNoTxt.anchor.setTo(0.5);
				stdDrinkNoTxt.font = 'ChronicaPro-Heavy';
				stdDrinkNoTxt.fontSize = 48;
				stdDrinkNoTxt.fill = "#ffffff";

				stdDrinkNoTxtSub = this.add.text(stdDrinkNo.x, stdDrinkNo.y + 25 , 'mins');
				stdDrinkNoTxtSub.anchor.setTo(0.5);
				stdDrinkNoTxtSub.font = 'ChronicaPro-Heavy';
				stdDrinkNoTxtSub.fontSize = 28;
				stdDrinkNoTxtSub.fill = "#ffffff";

				stdDrinkNo.alpha = 0;
				stdDrinkTxt.alpha = 0;
				stdDrinkSub.alpha = 0;
				stdDrinkNoTxt.alpha = 0;
				stdDrinkNoTxtSub.alpha = 0;

				blackboardText.text = drinkScript.tag_line;
				 (function(object) { 
	                timeoutVar = setTimeout(function(){
	                    drinkInfoScreen++;
	                    object.addDrinkText(firstTime);
	                }, 3200);
	            })(this)   
			break;
			case 2:
				blackboardText.text = "A "+drinkScript.container_name+" of "+drinkScript.drink_name+" is...";
				blackboardText.fontSize = 31;
				blackboardText.y = barBlackboard.height/4;

				stdDrinkNo.alpha = 1;
				stdDrinkTxt.alpha = 1;
				stdDrinkSub.alpha = 1;

				(function(object) { 
	                timeoutVar = setTimeout(function(){
	                    drinkInfoScreen++;
	                    object.addDrinkText(firstTime);
	                }, 4200);
	            })(this) 
			break;
			case 3:
				blackboardText.text = "That means you can...";
				if(charCount!=3)
				{
					stdDrinkNo.frameName = drinkScript.drink_id+"_clock_blackboard";
					
					stdDrinkTxt.fontSize = 26;
					stdDrinkTxt.wordWrapWidth = 200;
					

					stdDrinkNoTxt.alpha = 1;
					stdDrinkNoTxtSub.alpha = 1;
					stdDrinkTxt.anchor.set(0,0.5);
				}
				else {
					stdDrinkNo.alpha = 0;
					stdDrinkTxt.x = Math.floor(barBlackboard.x + barBlackboard.width / 2);
					stdDrinkTxt.wordWrapWidth = barBlackboard.width - 60;
					stdDrinkTxt.fontSize = 30;
					stdDrinkTxt.align = "center";
					stdDrinkTxt.anchor.setTo(0.5);
				}
				
				stdDrinkTxt.text = drinkScript.first_line;
				stdDrinkTxt.wordWrap = true;
				
				stdDrinkSub.alpha = 0;

				(function(object) { 
	                timeoutVar = setTimeout(function(){
	                    drinkInfoScreen++;
	                    object.addDrinkText(firstTime);
	                }, 4400);
	            })(this) 
			break;
			case 4:
				selectedDrink.inputEnabled = false;
				selectedDrinkLabel.inputEnabled = false;
				blackboardText.text = "And you can have...";
				stdDrinkTxt.text = drinkScript.every_line;

				if(drinkCount == endCount){ //If all drinks have been seen offer to play quiz. Currently changes scene
					(function(object) { 
	                setTimeout(function(){
	                    object.restartState();
	                }, 4400);
	            })(this) 
				}
				else {
					drinkInfoScreen = 1;
					(function(object) { 
	                setTimeout(function(){
	                    object.rightDrinkSelect();
	                }, 4400);
	            })(this) 
				}
			break;
			default:
				console.log("This should not be happening, this should throw an error");
			break;
		}
	},
	startNextScene: function() {
		this.stopAllTimeouts();
		this.state.start('ClubScene');
	},
	startPrevScene: function() {
		this.state.start('CharacterSelect');
	},
	startQuiz: function() {
		ga('send','loadQuizScene','game', 'click', 'Load Quiz Scene');
		if(typeof selectedDrink !== 'undefined')
		{
			if (selectedDrink.visible == true) {
			selectedDrink.kill();
			selectedDrinkLabel.kill();
			leftArrow.kill();
			rightArrow.kill();
			}
		}
		blackboardText.text = "Do you know your drinks?";
		blackboardText.fontSize = 50*.82;
		drinkSelectButton.kill();
		quizSelectButton.kill();
		nextSceneButton.kill();
		var pubQuizButton = this.add.button(GAME_WIDTH/2-254, 804, 'general', this.restartState, this);
		pubQuizButton.frameName = 'StopGoBack_btn';

		microphone = this.add.sprite(GAME_WIDTH, barFloor.y + 50, 'general', 'microphone');

		var quizStartCharSlide = this.add.tween(selectedChar).to({ x: '+145' }, 600).start().onComplete.add(function() {
			highlightShadow = this.add.sprite(GAME_WIDTH/2, barDrinks.y, 'general', 'highlight_shadow');
			highlightShadow.anchor.setTo(0.5,0);
			microphone.anchor.setTo(0.5, 1);
			this.add.tween(microphone).to({ x: GAME_WIDTH/2 + 200 }, 600).start().onComplete.add(function() {
				quizStartButton = this.add.button(GAME_WIDTH/2, 3*(GAME_HEIGHT/4), 'general', this.beginQuiz, this);
				quizStartButton.frameName = 'try_me';
				quizStartButton.anchor.setTo(0.5);
			}, this);
		}, this);		
	},
	beginQuiz: function() {
		ga('send','startQuizScene','game', 'click', 'Start Quiz Scene');
		quizStartButton.kill();
		blackboardText.text = "How to play."
		blackboardText.y = barBlackboard.y + 70;
		quizByLine = this.add.text(Math.floor(barBlackboard.x + barBlackboard.width / 2), blackboardText.y + 50, "It's simple.");
		quizByLine.font = 'ChronicaPro-Heavy';
		quizByLine.fontSize = 36;
		quizByLine.lineSpacing = -10;
		quizByLine.align = "center";
		quizByLine.fill = "#ffffff";
		quizByLine.anchor.setTo(0.5);

		wrong = this.add.sprite(blackboardText.x - (blackboardText.width/2), quizByLine.y + 40, 'general', 'false_cross');
		wrong.scale.setTo(0.5);

		correct = this.add.sprite(quizByLine.x + (quizByLine.width/2) - 40, quizByLine.y + 40, 'general', 'truetick');
		correct.scale.setTo(0.5);

		falseTxt = this.add.text(wrong.x + (wrong.width/2), wrong.y + 100, '=false');
		falseTxt.font = 'ChronicaPro-Heavy';
		falseTxt.fontSize = 36;
		falseTxt.lineSpacing = -10;
		falseTxt.align = "center";
		falseTxt.fill = "#ffffff";
		falseTxt.anchor.setTo(0.5);

		trueTxt = this.add.text(correct.x + (correct.width/2), wrong.y + 100, '=true');
		trueTxt.font = 'ChronicaPro-Heavy';
		trueTxt.fontSize = 36;
		trueTxt.lineSpacing = -10;
		trueTxt.align = "center";
		trueTxt.fill = "#ffffff";
		trueTxt.anchor.setTo(0.5);
		console.log("Loading Questions")
		this.time.events.add(3800, this.loadQuestions, this);
	},
	loadQuestions: function() {
		quizQuestions = this.cache.getJSON('quizQuestions');
		quizByLine.kill();
		wrong.scale.setTo(0.75);
		correct.scale.setTo(0.75);
		wrong.y = barFloor.y - wrong.height;
		wrong.x -= 25;
		correct.y = barFloor.y - correct.height;
		falseTxt.kill();
		trueTxt.kill();
		blackboardText.y = barBlackboard.y + barBlackboard.height/2 - 10;
		blackboardText.fontSize = 38;
		quizScore = 0;
		questionArray = [];
		for(ii = 0; ii<10; ii++) {
			var answered = false;
			var randNum = Math.floor(Math.random()* 13);
			while(questionArray.indexOf(randNum) > -1) {
				randNum = Math.floor(Math.random()* 13);
			}
			questionArray.push(randNum);
		}

		currentQ = questionArray.pop();
		blackboardText.text = quizQuestions[currentQ].question;

		correct.inputEnabled = true;
		correct.events.onInputDown.add(function(){this.checkAnswer("true", currentQ)}, this);
		wrong.inputEnabled = true;
		wrong.events.onInputDown.add(function(){this.checkAnswer("false", currentQ)}, this);

		charLBrow.pivot.x = charLBrow.width/2;
			charLBrow.x += charLBrow.width/2;

			charRBrow.pivot.x = charRBrow.width/2;
			charRBrow.x += charRBrow.width/2;
	},
	checkAnswer: function(answer, currentQ) {
		correct.events.destroy();
		wrong.events.destroy();
		if (quizQuestions[currentQ].answer == answer) {
			quizScore++;
			blackboardText.text = quizQuestions[currentQ].correct_response;
			mouth.frameName = 'mouth_4';
			mouth.x -= 20;
			this.time.events.add(1800, function() {
				mouth.x += 20;
			}, this);
		}
		else {
			blackboardText.text = quizQuestions[currentQ].incorrect_response;

			this.add.tween(charLBrow).to({angle: 20}, 300, Phaser.Easing.Linear.None, true, 100).start();
			this.add.tween(charRBrow).to({angle: -20}, 300, Phaser.Easing.Linear.None, true, 100).start().onComplete.add(function() {
				this.time.events.add(1800, function() {
					this.add.tween(charLBrow).to({angle: 0}, 300, Phaser.Easing.Linear.None, true, 100).start();
					this.add.tween(charRBrow).to({angle: 0}, 300, Phaser.Easing.Linear.None, true, 100).start();
				},this);
			},this);
		}

		if(questionArray.length > 0) {	
			this.time.events.add(2400, function() {
				
				mouth.frameName = 'mouth_1';
				currentQ = questionArray.pop();
				blackboardText.text = quizQuestions[currentQ].question;
				correct.events.onInputDown.add(function(){this.checkAnswer("true", currentQ)}, this);
				wrong.events.onInputDown.add(function(){this.checkAnswer("false", currentQ)}, this);
			},this);	
		}
		else {
			this.time.events.add(2400, function() {
				mouth.frameName = 'mouth_1';
				this.showResults();
			}, this);

			
		}
	},
	showResults: function() {
		ga('send','finishedQuiz','game', 'load', 'Finished Quiz Scene');
		if(quizScore == 10) {
			prize = 'meat_tray';
		}
		else if(quizScore <= 9 && quizScore >= 5) {
			prize = 'ethel_jam';
		}
		else if(quizScore <= 4 && quizScore >= 2) {
			prize = 'daas_dregs';
		}
		else if(quizScore <= 3) {
			prize = 'fresh_squid';
		}
		blackboardText.text = 'You scored '+quizScore+'/10 collect your prize...';
		correct.destroy();
		wrong.destroy();
		this.add.tween(selectedChar).to({ x: '-145' }, 600).start().onComplete.add(function() {
			this.add.tween(microphone).to({ x: GAME_WIDTH + 200 }, 600).start().onComplete.add(function() {
				this.add.tween(highlightShadow).to({ x: '+90' }, 600).start().onComplete.add(function() {
					finalPrize = this.add.sprite(420, 620, 'general', prize);
					if(prize=='ethel_jam'){
						finalPrize.x -= 15;
					}
					finalPrize.anchor.setTo(0.5);
					finalPrize.scale.setTo(0.8);
				}, this);
			},this);
		},this);
	},
	onSwipe: function() {
	if (Phaser.Point.distance(this.input.activePointer.position, this.input.activePointer.positionDown) > 150 && this.input.activePointer.duration > 100 && this.input.activePointer.duration < 250)
		{
			firstPointX = this.input.activePointer.positionDown.x;
			firstPointY = this.input.activePointer.positionDown.y;
			
			lastPointX = this.input.activePointer.position.x;
			lastPointY = this.input.activePointer.position.y;
			
			swiping = true;
		}
	},
	stopAllTimeouts: function() {
	    var id = window.setTimeout(null,0);
	    while (id--) 
	    {
	        window.clearTimeout(id);
	    }
	},














	startShare: function() {

	/*
	var reg = {};
	
	reg.modal = new gameModal(DrinkDrive);	

	reg.modal.createModal({
            type:"modal1",
            includeBackground: true,
            modalCloseOnInput: true,
            itemsArr: [
                {
                    type: "text",
                    content: "Simple Text with Modal background, \n nothing fancy here...",
                    fontFamily: "Luckiest Guy",
                    fontSize: 38,
                    color: "0xFEFF49",
                    offsetY: -50,
                    stroke: "0x000000",
                    strokeThickness: 5
                }
            ]
        });


		var sprite;
		var mask;

	

		//	A mask is a Graphics object
    	mask = game.add.graphics(0, 0);

    	//	Shapes drawn to the Graphics object must be filled.
    	mask.beginFill(0xffffff);

    	//	Here we'll draw a circle
    	mask.drawCircle(100, 100, 100);

    	//	And apply it to the Sprite
    	sprite.mask = mask;
    */

    		//var shareboxGroup = this.add.group();

			sharebox = this.add.sprite(75,200,'sharebox');
			facebookShareButton = this.add.button(174,375, 'facebook-share', this.facebookShare, this);
			twitterShareButton = this.add.button(174,467, 'twitter-share', this.twitterShare, this);
			emailShareButton = this.add.button(174,565, 'email-share', this.emailShare, this);		
			closeShareButton = this.add.button(500,185, 'close-share', this.closeShare, this);

	},

	closeShare: function () {
			sharebox.kill();
			facebookShareButton.kill();
			twitterShareButton.kill();
			emailShareButton.kill();
			closeShareButton.kill();
	},

	facebookShare: function() {
		FB.ui(
 		{
  		method: 'share',
  		href: 'http://perth.303lowe.agency/ORS/test/'
		}, function(response){});
	},

	twitterShare: function() {
		var url = "https://twitter.com/intent/tweet?text=I played the Drink Stupid, Drive Stupid game. Play the game now. Choose your character and play the pub quiz. drinkstupiddrivestupid.com";
		twitterWindow = window.open(url, "", "width=700, height=500");
		twitterWindow.focus();
	},

	emailShare: function() {
		var yourMessage = "I played the game Drink Stupid, Drive Stupid. Play the game now. Choose your character, grab a drink, and play the pub quiz. http://drinkstupiddrivestupid.com";
    	var subject = "Check out this game";
    	document.location.href = "mailto:?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(yourMessage);
	}

}