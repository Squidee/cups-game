DrinkDrive.GenderSelect = function(game) {
	var btnGroup;
	var rightMaleShadow;
	var lefttMaleShadow;
	var rightFemaleShadow;
	var leftFemaleShadow;
	var femaleButton;
	var maleButton;
	var blueBG;
	var pinkBG;
	var headerText;
	var leftFootShadow;
	var rightFootShadow;

	var swiping;
	var firstPointY;
	var firstPointX;
	var lastPointY;
	var lastPointX;
};
DrinkDrive.GenderSelect.prototype = {
	create: function() {
		rightMaleShadow = this.add.sprite((GAME_WIDTH/2), 221, 'general');
		rightMaleShadow.frameName = 'male_char_shadow_right';

		leftFemaleShadow = this.add.sprite((GAME_WIDTH/2)-(142*.82), 200, 'general');
		leftFemaleShadow.frameName = 'female_char_shadow_left';
	
		blueBG = this.add.sprite(0,0, 'blue-background');
		pinkBG = this.add.sprite(GAME_WIDTH/2, 0, 'pink-background');

		leftFootShadow = this.add.sprite((GAME_WIDTH/2)-(130*.82), 680, 'general');
		leftFootShadow.frameName = 'char_select_shadow_left';
		leftMaleShadow = this.add.sprite((GAME_WIDTH/2)-(142*.82)+2, 221, 'general');
		leftMaleShadow.frameName = 'male_char_shadow_left';

		rightFootShadow = this.add.sprite((GAME_WIDTH/2), 680, 'general');
		rightFootShadow.frameName = 'char_select_shadow_right';
		rightFemaleShadow = this.add.sprite((GAME_WIDTH/2), 200, 'general');
		rightFemaleShadow.frameName = 'female_char_shadow_right';

		femaleButton = this.add.button(GAME_WIDTH-250, GAME_HEIGHT-200, 'general', this.femaleSelect, this);
		femaleButton.frameName = 'girl_btn';
		maleButton = this.add.button(70, GAME_HEIGHT-200, 'general', this.maleSelect, this);
		maleButton.frameName = 'guy_btn';

		btnGroup = this.add.group();
		btnGroup.add(femaleButton);
		btnGroup.add(maleButton);

		headerText = this.add.text(100,10, 'Are you a guy or girl?');

		//TO DO: Shrink this into one style object
		headerText.font = 'ChronicaPro-Heavy';
		headerText.fontSize = 80;
		headerText.lineSpacing = -20;
		headerText.align = "center";
		headerText.fill = "#ffffff";
		headerText.wordWrap = true;
		headerText.wordWrapWidth = 500;
		
	},
	maleSelect: function() {
		ga('send','selectMale','game', 'click', 'Male Select');
		DrinkDrive.GENDER = 'male';
		this.stage.backgroundColor = '#3eaaf5';
		btnGroup.destroy();

		var femaleGroup = this.add.group();
		femaleGroup.addChild(pinkBG);
		femaleGroup.addChild(rightFemaleShadow);
		leftFemaleShadow.destroy();

		rightMaleShadow.moveUp();


		var pinkTween = this.add.tween(femaleGroup).to({x:GAME_WIDTH}, 1500, Phaser.Easing.Exponential.In,false).start();
		this.add.tween(blueBG).to({alpha: 0}, 1500, Phaser.Easing.Exponential.In,false).start();


		pinkTween.onComplete.add(function() {
		  this.time.events.add(150, function() {
		    this.state.start('CharacterSelect');
		  }, this);
		}, this);

		headerText.destroy();

	},
	femaleSelect: function() {
		ga('send','selectFemale','game', 'click', 'Female Select');
		DrinkDrive.GENDER = 'female';
		this.stage.backgroundColor = '#d441f2';
		btnGroup.destroy();

		var maleGroup = this.add.group();
		maleGroup.add(blueBG);
		maleGroup.add(leftMaleShadow);
		rightMaleShadow.destroy();

		rightFemaleShadow.moveUp();
		

		var blueTween = this.add.tween(maleGroup).to({x:-(GAME_WIDTH)}, 1500, Phaser.Easing.Exponential.In,false).start();
		this.add.tween(pinkBG).to({alpha: 0}, 1500, Phaser.Easing.Exponential.In,false).start();


		blueTween.onComplete.add(function() {
		  this.time.events.add(150, function() {
		    this.state.start('CharacterSelect');
		  }, this);
		}, this);

		headerText.destroy();

		
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