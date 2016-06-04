DrinkDrive.CharacterSelect = function(game) {
	var leftArrow;
	var rightArrow;
	var footShadow;
	var charCount;
	var selectedChar;
	var dropOverlay;
	var charLLimb;
	var cloudGroup;
	var gameScript;
	var genderText;

	var swiping;
	var firstPointY;
	var firstPointX;
	var lastPointY;
	var lastPointX;

	var selectButton;
	var shadow;
};
DrinkDrive.CharacterSelect.prototype = {
	preload: function() {
		switch(DrinkDrive.GENDER) {
			case 'female':
				this.load.atlas('selectableChars', 'img/female_chars.png', 'img/female_chars.json');
				this.load.json('gameScript', 'json/female_dictionary.json');
				this.load.image('dropOverlay', 'img/female_drop_overlay.png');
				break;
			case 'male':
				this.load.atlas('selectableChars', 'img/male_chars.png', 'img/male_chars.json');
				this.load.json('gameScript', 'json/male_dictionary.json');
				this.load.image('dropOverlay', 'img/male_drop_overlay.png');
				break;
			default:
				this.load.atlas('selectableChars', 'img/female_chars.png', 'img/female_chars.json');
				this.load.json('gameScript', 'json/female_dictionary.json');
				break;
		}
		charCount = 1;

	},
	create: function() {
		swiping = false;
		gameScript = this.cache.getJSON('gameScript');
		gameScript = gameScript[0];

		this.createClouds();
		leftArrow = this.add.button(20,((GAME_HEIGHT)/2)-20, 'general', this.leftCharSelect, this);
		leftArrow.frameName = 'arrow_left';
		rightArrow = this.add.button((GAME_WIDTH)-112,((GAME_HEIGHT)/2)-20, 'general', this.rightCharSelect, this);
		rightArrow.frameName = 'arrow_right';

		this.loadCharacter(charCount);
		selectedChar.alpha = 0;

		

		var headerText = this.add.text(100,10, 'Select your character');

		//TO DO: Shrink this into one style object
		headerText.font = 'ChronicaPro-Heavy';
		headerText.fontSize = 75;
		headerText.lineSpacing = -20;
		headerText.align = "center";
		headerText.fill = "#ffffff";
		headerText.wordWrap = true;
		headerText.wordWrapWidth = 500;

		footShadow = this.add.sprite((GAME_WIDTH/2), 701.5, 'general');
		footShadow.frameName = 'char_select_shadow_full';
		footShadow.anchor.setTo(0.5, 0.5);

		this.loadCharacter(charCount);
		selectedChar.alpha = 0;

		if(DrinkDrive.GENDER == 'male') {
			rightShadow = this.add.sprite(319.503, 221, 'general');
			rightShadow.frameName = DrinkDrive.GENDER+'_char_shadow_right';
			leftShadow = this.add.sprite(203.77399999999975, 221, 'general');
			leftShadow.frameName = DrinkDrive.GENDER+'_char_shadow_left';
		}
		else {
			rightShadow = this.add.sprite((GAME_WIDTH/2), 200, 'general');
			rightShadow.frameName = DrinkDrive.GENDER+'_char_shadow_right';
			leftShadow = this.add.sprite((GAME_WIDTH/2)-(142*.82), 200, 'general');
			leftShadow.frameName = DrinkDrive.GENDER+'_char_shadow_left';
		}

		shadow = this.add.group();
		shadow.add(rightShadow);
		shadow.add(leftShadow);

		
		this.add.tween(selectedChar).to({alpha: 1}, 600, Phaser.Easing.Quadratic.None, false).start();
		this.time.events.add(200, function() {
			if(DrinkDrive.GENDER == 'female')
			{
				shadow.width += 2;
				shadow.x -= 3;				
			}
			this.add.tween(shadow).to({alpha: 0}, 800, Phaser.Easing.Quadratic.None, false).start().onComplete.add(function() {shadow.destroy();}, this);
		},this);
		
		dropOverlay = this.add.sprite(0, 698, 'dropOverlay');

		selectButton = this.add.button(((GAME_WIDTH)/2)-114.5, (GAME_HEIGHT)-164, 'general',this.selectCharacter, this);
		selectButton.frameName = 'pickme_btn';
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
	startNextScene: function() {
		DrinkDrive.CHOSEN_CHAR = charCount;
		this.state.start('BarScene');
	},
	startPrevScene: function() {
		this.state.start('GenderSelect');
	},
	leftCharSelect: function() {
		charCount--;
		if(charCount<1) {
			charCount = 3;
		}
		//Ragdoll character to the right
		//selectedChar.animations.play('ragdollOutRight');
		this.add.tween(selectedChar).to({x: GAME_WIDTH+100}, 550, Phaser.Easing.Exponential.In, false).start().onComplete.add(function() {
			//Bring new character in from the left
			leftCreateEv = this.time.events.add(500, function() {
				selectedChar.destroy();
				this.loadCharacter(charCount);
				selectedChar.x = -((GAME_WIDTH)/2)-50;
				//selectedChar.animations.play('ragdollInLeft');
				this.add.tween(selectedChar).to({x: 0}, 550, Phaser.Easing.Exponential.Out, false).start();
			}, this);
		}, this);		
	},
	rightCharSelect: function() {
		charCount++;
		if(charCount>3)
		{
			charCount=1;
		}

		//Ragdoll character to the left
		//selectedChar.animations.play('ragdollOutLeft');
		this.add.tween(selectedChar).to({x: -((GAME_WIDTH)/2)-200}, 550, Phaser.Easing.Exponential.In, false).start().onComplete.add(function() {

			//Bring new character in from the right
			this.time.events.add(500, function() {
				selectedChar.destroy();
				this.loadCharacter(charCount);
				selectedChar.x = GAME_WIDTH;
				//selectedChar.animations.play('ragdollInRight');
				this.add.tween(selectedChar).to({x: 0}, 550, Phaser.Easing.Exponential.Out, false).start();
			}, this);
		}, this);
	},
	selectCharacter: function() {
		selectButton.destroy();
		DrinkDrive.CHOSEN_CHAR = charCount;
		if(charCount == 3) {
			ga('send','selectPLPlater','game', 'click', 'P&L Plater Select');
		}
		else {
			ga('send','selectRegular','game', 'click', 'Regular Character Select');
		}

		var shrinkShadow = this.add.tween(footShadow.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Linear.None, false).start();
		shrinkShadow.onComplete.add(function() {
			footShadow.frameName = 'drophole';

			var growShadow = this.add.tween(footShadow.scale).to( { x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, false).start();
			growShadow.onComplete.add(function() {
				dropOverlay.bringToTop();
				
				var charDropTween = this.add.tween(selectedChar).to({ y: GAME_HEIGHT + 970 }, 2000).start();
				this.camera.bounds = null;
				var cameraPan = this.add.tween(this.camera).to({y: GAME_HEIGHT+500}, 2000).start();

				this.add.tween(cloudGroup).to({x: '+1200'}, 15000, Phaser.Easing.Linear.None, true, 100).start();
				this.time.events.add(5500, function() {this.loadInfoClouds();}, this);

				selectedChar.sendToBack(charLLimb);
				selectedChar.sendToBack(charRLimb);
				var charRArmUp = this.add.tween(charRLimb).to({angle:'-132', y: '+20'}, 300, Phaser.Easing.Linear.None, true, 100).start();
				charRArmUp.onComplete.add(function() { 
					var charBobbleRATween = this.add.tween(charRLimb).to({ angle:'-15', y: '+10'}, 400, Phaser.Easing.Linear.Quadratic, false, 0,  30, true ).start(); 
				}, this);

				var charLArmUp = this.add.tween(charLLimb).to({angle:'+132', y: '+20'}, 300, Phaser.Easing.Linear.None, true, 100).start();
				charLArmUp.onComplete.add(function() {
					var charBobbleLATween = this.add.tween(charLLimb).to({ angle:'+15', y: '+20'}, 450, Phaser.Easing.Linear.Quadratic, false, 0,  30, true ).start();
				}, this);

				this.add.tween(charRHand).to({angle:'-232', y: '+80', x: '+40'}, 300, Phaser.Easing.Linear.None, true, 100).start();
				this.add.tween(charLHand).to({angle:'+232', y: '+80', x:'-40' }, 300, Phaser.Easing.Linear.None, true, 100).start();

				mouth.frameName = 'mouth_8';
				mouth.y -= 10;

				charLBrow.pivot.x = charLBrow.width/2;
				charLBrow.x += charLBrow.width/2;

				charRBrow.pivot.x = charRBrow.width/2;
				charRBrow.x += charRBrow.width/2;

				this.add.tween(charLBrow).to({angle: -20, y: '+10', x: '-10'}, 300, Phaser.Easing.Linear.None, true, 100).start();
				this.add.tween(charRBrow).to({angle: 20, y: '+10', x: '+10'}, 300, Phaser.Easing.Linear.None, true, 100).start();

				var steeringWheel = this.add.sprite(GAME_WIDTH-300, GAME_HEIGHT+1800, 'general', 'steering_wheel');

				charDropTween.onComplete.add(function() {
					cameraPan.onComplete.add(function() {
						if(charCount==3) {
							genderText = this.add.text(100,GAME_HEIGHT+520, gameScript.pl_name+', you can have...');
						}
						else
						{
							genderText = this.add.text(100,GAME_HEIGHT+520, gameScript.gender_name+', you can have...');
						}
						
						//TO DO: Shrink this into one style object
						genderText.font = 'ChronicaPro-Heavy';
						genderText.fontSize = 75;
						genderText.lineSpacing = -20;
						genderText.align = "center";
						genderText.fill = "#ffffff";
						genderText.wordWrap = true;
						genderText.wordWrapWidth = 500;
					  this.time.events.add(500, function() {
					  	var moveWheel = this.add.tween(steeringWheel).to({y: GAME_HEIGHT + 870}, 1500, Phaser.Easing.Linear.None, true, 100).start();
					  	moveWheel.onComplete.add(function() { 
					  		charRLimb.remove(charRHand);
					  		var wheelGroup = this.add.group();
					  		wheelGroup.add(steeringWheel);
					  		wheelGroup.add(charRHand);
					  		charRHand.y = GAME_HEIGHT+920;
					  		charRHand.x = 480;
					  		charRHand.bringToTop();
					  		wheelGroup.pivot.x = steeringWheel.width/2;
					  		wheelGroup.x += (steeringWheel.width/2);

					  		wheelGroup.y += 50;
					  		wheelGroup.x += 30;
					  		this.add.tween(wheelGroup).to({ y: '+5'}, 400, Phaser.Easing.Linear.Quadratic, false, 0,  30, true ).start();
					  		this.add.tween(wheelGroup).to({ x: '-15'}, 300, Phaser.Easing.Linear.Quadratic, false, 0,  30, true ).start();
					  	}, this);

					  	var charBobbleXTween = this.add.tween(selectedChar).to({ x: '+15' }, 700, Phaser.Easing.Linear.Quadratic, false, 0,  15, true ).start();
					  	var charBobbleYTween = this.add.tween(selectedChar).to({ y: '+7' }, 450, Phaser.Easing.Linear.Quadratic, false, 0,  15, true ).start();
					  }, this);
					}, this);
				}, this);
			}, this);
		}, this);
	},
	loadCharacter: function(charCount) {
		selectedChar = this.add.group();
		selectedChar.x = 0;
		selectedChar.y = 400;
		
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
		charLLimb.x = 237;
		charLLimb.pivot.y = 47*.82;
		charLLimb.y = 33;
		

		//Right Arm
		charRLimb = this.add.group();
		charRLimb.add(charRArm);
		charRLimb.add(charRHand);
		selectedChar.add(charRLimb);
		charRLimb.pivot.x = GAME_WIDTH/2+83;
		charRLimb.x += GAME_WIDTH/2+83;
		charRLimb.pivot.y = 47*.82;
		charRLimb.y = 33;
		

		//Hands
		charLHand.pivot.x = charLHand.width/2;
		charLHand.x += charLHand.width/2;
		charLHand.pivot.y = -10;
		charLHand.y -= 10;
		charRHand.pivot.x = charRHand.width/2;
		charRHand.x += charRHand.width/2;
		charRHand.pivot.y = -10;
		charRHand.y -= 10;

		//Needs to be done after arms to make sure sits above arms
		if(charCount==3 && DrinkDrive.GENDER == 'male')
		{
			charGlasses = selectedChar.create(GAME_WIDTH/2-73, -90*.82, 'selectableChars', 'Glasses');
			
			charPPlate = selectedChar.create((GAME_WIDTH/2)-93,35*.82, 'selectableChars', 'P_L_chain');
		}
		if(charCount==3 && DrinkDrive.GENDER == 'female')
		{
			
			charPPlate = selectedChar.create((GAME_WIDTH/2)-93,35*.82, 'selectableChars', 'P_L_chain');
		}

	},
	createClouds: function() {
		cloudGroup = this.add.group();

		for( var ii = 1; ii <= 18; ii++)
		{
			var randHeight = Math.floor((Math.random() * (GAME_HEIGHT*2)+50 + GAME_HEIGHT+600));
			var randWidth =  Math.floor((Math.random() * GAME_WIDTH - GAME_WIDTH));
			var randCloud = Math.floor((Math.random() * 4 + 1));

			var randLine = Math.floor((Math.random() * 14 + 1));
			var cloudType;

			if (randLine == 7 && randCloud <= 2)
			{
				cloudType = 'cloudline';
			}
			else {
				cloudType = 'cloud';
			}

			cloudGroup.create(randWidth, randHeight, 'general', cloudType+randCloud);
		}

	},
	loadInfoClouds: function() {
		genderText.destroy();
		var charQty1, charQty2;
		var Cloud1 = this.add.sprite(-1000, GAME_HEIGHT+530, 'general', 'text_cloud_1');
		if(charCount==3){
			charQty1 = gameScript.p_qty;
			charQty2 = gameScript.p_qty;
			firstHourSize = 130;
			everyHourSize = 110;
			everyHourPosX = GAME_WIDTH-371;
		}
		else {
			charQty1 = gameScript.first_hour_qty;
			charQty2 = gameScript.every_hour_qty;
			firstHourSize = 130;
			everyHourSize = 110;
			everyHourPosX = GAME_WIDTH-351;
		}
		var firstHourQty = this.add.text(-950, GAME_HEIGHT+540, charQty1);
		firstHourQty.font = 'ChronicaPro-Heavy';
		firstHourQty.fontSize = firstHourSize;
		if(DrinkDrive.GENDER == 'male') {
			firstHourQty.fill = "#2980b9";
		}
		else {
			firstHourQty.fill = "#d441f2";
		}

		var textCloud1 = this.add.text(-900, GAME_HEIGHT+580, 'Standard');
		var textCloud2 = this.add.text(-900, GAME_HEIGHT+612, 'drinks in the first hour');
		textCloud1.font = 'ChronicaPro-Heavy';
		textCloud1.fontSize = 24;
		if(DrinkDrive.GENDER == 'male') {
			textCloud1.fill = "#2980b9";
		}
		else {
			textCloud1.fill = "#d441f2";
		}
		textCloud2.font = 'ChronicaPro-Heavy';
		textCloud2.fontSize = 24;
		if(DrinkDrive.GENDER == 'male') {
			textCloud2.fill = "#2980b9";
		}
		else {
			textCloud2.fill = "#d441f2";
		}
		textCloud2.wordWrap = true;
		textCloud2.wordWrapWidth = 250;
		textCloud2.lineSpacing = -10;

		this.add.tween(firstHourQty).to({x: 80}, 800, Phaser.Easing.Linear.None, true, 100).start();
		this.add.tween(textCloud1).to({x: 200}, 800, Phaser.Easing.Linear.None, true, 100).start();
		this.add.tween(textCloud2).to({x: 200}, 800, Phaser.Easing.Linear.None, true, 100).start();
		this.add.tween(Cloud1).to({x: 10}, 800, Phaser.Easing.Linear.None, true, 100).start();

		var Cloud2 = this.add.sprite(GAME_WIDTH+1000, (GAME_HEIGHT*2)+300, 'general', 'text_cloud_2');
		var everyHourQty = this.add.text(GAME_WIDTH+1000, (GAME_HEIGHT*2)+320, charQty2);
		var textCloud3 = this.add.text(GAME_WIDTH+1000, (GAME_HEIGHT*2)+340, 'Every');
		var textCloud4 = this.add.text(GAME_WIDTH+1000, (GAME_HEIGHT*2)+372, 'hour after');
		var textCloud5 = this.add.text(GAME_WIDTH+1000, (GAME_HEIGHT*2)+404, 'and still drive.');
		everyHourQty.font = 'ChronicaPro-Heavy';
		everyHourQty.fontSize = everyHourSize;
		if(DrinkDrive.GENDER == 'male') {
			everyHourQty.fill = "#2980b9";
		}
		else {
			everyHourQty.fill = "#d441f2";
		}
		textCloud3.font = 'ChronicaPro-Heavy';
		textCloud3.fontSize = 36*.82;
		if(DrinkDrive.GENDER == 'male') {
			textCloud3.fill = "#2980b9";
		}
		else {
			textCloud3.fill = "#d441f2";
		}
		textCloud4.font = 'ChronicaPro-Heavy';
		textCloud4.fontSize = 36*.82;
		if(DrinkDrive.GENDER == 'male') {
			textCloud4.fill = "#2980b9";
		}
		else {
			textCloud4.fill = "#d441f2";
		}
		textCloud5.font = 'ChronicaPro-Heavy';
		textCloud5.fontSize = 36*.82;
		if(DrinkDrive.GENDER == 'male') {
			textCloud5.fill = "#2980b9";
		}
		else {
			textCloud5.fill = "#d441f2";
		}

		this.add.tween(Cloud2).to({x:GAME_WIDTH-Cloud2.width-20}, 800, Phaser.Easing.Linear.None, true, 100).start();
		this.add.tween(everyHourQty).to({x:everyHourPosX}, 800, Phaser.Easing.Linear.None, true, 100).start();

		this.add.tween(textCloud3).to({x:GAME_WIDTH-270}, 800, Phaser.Easing.Linear.None, true, 100).start();
		this.add.tween(textCloud4).to({x:GAME_WIDTH-270}, 800, Phaser.Easing.Linear.None, true, 100).start();
		this.add.tween(textCloud5).to({x:GAME_WIDTH-270}, 800, Phaser.Easing.Linear.None, true, 100).start();

		this.time.events.add(5000, function() {
			var finalCameraPan = this.add.tween(this.camera).to({y: '+2000'}, 2000).start();
			finalCameraPan.onComplete.add(function(){ 
				ga('send','watchIntroScene','game', 'load', 'Watched Intro Scene');
				this.state.start('BarScene'); 
			}, this);
		}, this);

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
	}
}