DrinkDrive.ClubScene = function(game) {
	var clubScreen;
	var clubBg;
	var clubFloor;
	var discoBall;
	var leftLight;
	var rightLight;

	var bacCount;
	var leftArrow;
	var rightArrow;

	var infoSelectButton;
	var gameSelectButton;

	var swiping;
	var firstPointY;
	var firstPointX;
	var lastPointY;
	var lastPointX;

	var bacWhole;
	var bacDecimal;
	var point;

	var starGroup;
	var button;
	var dontTouch;
	var duck;
	var keys;
	var female;
	var femaleBeard;
	var vomit;
	var extraVom;
	var spilledBeer;
	var helpMe;
};

DrinkDrive.ClubScene.prototype = {
	preload: function() {
		switch(DrinkDrive.GENDER) {
			case 'female':
				if(DrinkDrive.CHOSEN_CHAR == 3) {
					this.load.json('drinkScript', 'json/pl_female_dictionary.json');
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
		this.load.atlas('nightclub', 'img/nightclub.png', 'img/nightclub.json');
	},
	create: function() {
		ga('send','startClubScene','game', 'load', 'Start Club Scene');
		swiping = false;

		clubBg = this.add.sprite(-1000, 500, 'general', 'club_bg');
		clubFloor = this.add.sprite(GAME_WIDTH, 684, 'general', 'club_floor');
		clubScreen = this.add.sprite(85,-1000, 'general', 'club_screen');

		this.time.events.add(200, function() {
			var clubFloorTween = this.add.tween(clubFloor).to({ x: 61 }, 350).start();;
			var clubBgTween = this.add.tween(clubBg).to({ x: 105 }, 400).start().onComplete.add(function() { 
				this.time.events.add(20, function() {
					this.add.tween(clubBg).to({y: '-215'}, 500, Phaser.Easing.Exponential.Out,false).start();
					this.add.tween(clubScreen).to({y: 20}, 500, Phaser.Easing.Exponential.Out,false).start().onComplete.add(function() {
						screenText = this.add.text(GAME_WIDTH/2-150, 100, 'How alcohol affects you');

						var clubScreenMidX = Math.floor(clubScreen.x + clubScreen.width / 2);
						var clubScreenMidY = Math.floor(clubScreen.y + clubScreen.height / 2);
						var clubScreenBottom = Math.floor(clubScreen.y + clubScreen.height);

						screenText.font = 'ChronicaPro-Heavy';
						screenText.fontSize = 56;
						screenText.lineSpacing = -10;
						screenText.align = "center";
						screenText.fill = "#ffffff";
						screenText.wordWrap = true;
						screenText.x = clubScreenMidX;
						screenText.y = clubScreenMidY;
						screenText.wordWrapWidth = clubScreen.width-60;
						screenText.anchor.set(0.5);

						bacCount = this.add.sprite(clubScreenMidX-227, clubScreenBottom-50, 'cup_wizard', 'blood_alcohol');
						discoBall = this.add.sprite(clubScreenMidX, clubScreenBottom-50, 'general', 'disco_ball');
						discoBall.anchor.setTo(0.5,0);

						leftLight = this.add.sprite(clubScreen.x - 24, clubScreen.y + clubScreen.height - 50, 'cup_wizard', 'left_light');
						rightLight = this.add.sprite(clubScreen.x + clubScreen.width - 118, clubScreen.y + clubScreen.height - 50, 'cup_wizard', 'right_light');

						this.loadCharacter(DrinkDrive.CHOSEN_CHAR);
						this.loadButtons();
						clubScreen.bringToTop();
						screenText.bringToTop();
						bacCount.bringToTop();

						bacWhole = this.add.text((bacCount.x + (bacCount.width/4) - 10), (bacCount.y + (bacCount.height/2)) + 10, "0");
						bacWhole.font = 'ChronicaPro-Heavy';
						bacWhole.fontSize = 56;
						bacWhole.lineSpacing = -10;
						bacWhole.align = "center";
						bacWhole.fill = "#ffffff";
						bacWhole.anchor.set(0.5);

						bacDecimal = this.add.text((bacCount.x + (bacCount.width/2) - 10), (bacCount.y + (bacCount.height/2)) + 10, "0 0");
						bacDecimal.font = 'ChronicaPro-Heavy';
						bacDecimal.fontSize = 56;
						bacDecimal.lineSpacing = -10;
						bacDecimal.align = "center";
						bacDecimal.fill = "#ffffff";
						bacDecimal.anchor.set(0,0.5);
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
		infoSelectButton = this.add.button((GAME_WIDTH/2)-10, 452, 'general', this.startInfo, this);
		infoSelectButton.frameName = 'your_body_booze_big_btn';

		gameSelectButton = this.add.button((GAME_WIDTH/2)-10, 612, 'general', this.startGame, this);
		gameSelectButton.frameName = 'cup_ball_game_big_btn';

		var nextSceneButton = this.add.button(GAME_WIDTH/2-254, 804, 'general', this.startNextScene, this);
		nextSceneButton.frameName = 'PrevScene_btn';

		var shareButton = this.add.button(GAME_WIDTH/2+115, 804, 'general', this.startShare, this);
		shareButton.frameName = 'share_me_btn';

		var swipeDownImg = this.add.sprite(GAME_WIDTH/2-17, 874, 'general', 'swipe_down_arrow');
		var swipeDownTxt = this.add.text((GAME_WIDTH/2)-45, 804, 'Next Scene');

		swipeDownTxt.font = 'ChronicaPro-Heavy';
		swipeDownTxt.fontSize = 30;
		swipeDownTxt.lineSpacing = -10;
		swipeDownTxt.align = "center";
		swipeDownTxt.fill = "#ffffff";
		swipeDownTxt.wordWrap = true;
		swipeDownTxt.wordWrapWidth = 50;
	},
	startGame: function() {
		this.state.start('CupPreloader');
	},
	startNextScene: function() {
		this.state.start('FinalLock');
	},
	startPrevScene: function() {
		this.state.start('BarScene');
	},
	startInfo: function() {
		ga('send','startClubInfoScene','game', 'load', 'Start Club Info Scene');
		infoSelectButton.kill();
		gameSelectButton.kill();
		// nextSceneButton.kill();

		var pubQuizButton = this.add.button(GAME_WIDTH/2-254, 804, 'general', this.restartState, this);
		pubQuizButton.frameName = 'StopGoBack_btn';
		button = this.add.sprite(317, clubFloor.y + 90, 'nightclub', 'button');
		button.alpha = 0;
		button.anchor.setTo(0, 1);

		this.time.events.add(200, function() {
			point = this.add.sprite(-1000, clubFloor.y, 'general', 'point');
			point.anchor.setTo(0.5,0);
			var pointTween = this.add.tween(point).to({x: GAME_WIDTH/2}, 500, Phaser.Easing.Exponential.Out,false).start().onComplete.add(function() {
				var jumpDistance, jumpBack, buttonDistance, buttonBack;
				if(DrinkDrive.GENDER == 'female') {
					jumpDistance = '+130';
					jumpBack = '-125';
					buttonDistance = button.x - button.width - 50;
					buttonBack = '-100';
				}
				else {
					jumpDistance = '+105';
					jumpBack = '-100';
					buttonDistance = button.x - button.width - 100;
					buttonBack = '-50';
				}
				charJump = this.add.tween(selectedChar).to({x: jumpDistance, y: '-63'}, 250, Phaser.Easing.Linear.None, false).start().onComplete.add(function() {
					legRotate = this.add.tween(charLLeg).to({angle: '+45', y: '-30'}, 100, Phaser.Easing.Linear.None, false).start();
					footFollow = this.add.tween(charLFoot).to({angle: '+45', y: '-75', x: '-78'}, 100, Phaser.Easing.Linear.None, false).start();
					var charRArmUp = this.add.tween(charRLimb).to({angle:'-91', y: '+20'}, 50, Phaser.Easing.Linear.None, true, 100).start();
					var charLArmUp = this.add.tween(charLLimb).to({angle:'+91', y: '+20'}, 50, Phaser.Easing.Linear.None, true, 100).start().onComplete.add(function() {
						var charBobbleLATween = this.add.tween(charLLimb).to({ angle:'+20'}, 600, Phaser.Easing.Linear.Quadratic, false, 0,  2, true ).start();
						var charBobbleRATween = this.add.tween(charRLimb).to({ angle:'+20'}, 600, Phaser.Easing.Linear.Quadratic, false, 0,  2, true ).start();
					},this);
					selectedChar.pivot.setTo(0.8,1);
					this.add.tween(selectedChar).to({ angle:'1', y: '-5'}, 400, Phaser.Easing.Linear.Quadratic, false, 0,  3, true ).start(); 

					this.time.events.add(3800,function() {
						var pointTween = this.add.tween(point).to({x: GAME_WIDTH+100}, 500, Phaser.Easing.Exponential.Out,false).start();
						this.add.tween(selectedChar).to({x: jumpBack, y: '+65'}, 250, Phaser.Easing.Linear.None, false).start();
						legRotate = this.add.tween(charLLeg).to({angle: '-45', y: '+30'}, 100, Phaser.Easing.Linear.None, false).start();
						footFollow = this.add.tween(charLFoot).to({angle: '-45', y: '+75', x: '+78'}, 100, Phaser.Easing.Linear.None, false).start();

						var armDancingDelay = 100 * Math.random();	
		
						var charRArmUp = this.add.tween(charRLimb).to({angle:'+91', y: '-18'}, 50, Phaser.Easing.Linear.None, true, 100).start()
						.onComplete.add(function() {
						var charBobbleRArm = this.add.tween(charRLimb).to({ y:'-10'}, 400, Phaser.Easing.Linear.Quadratic, false, 0,  1, true ).start()
						},this);

						var charLArmUp = this.add.tween(charLLimb).to({angle:'-91', y: '-20'}, 50, Phaser.Easing.Linear.None, true, 100).start()
						.onComplete.add(function() {
						var charBobbleLArm = this.add.tween(charLLimb).to({ y:'-10'}, 400, Phaser.Easing.Linear.Quadratic, false, 400,  1, true ).start()
						},this);
					
						mouth.frameName = 'mouth_5';
						mouth.x -= 18;
						mouth.y -= 5;
						screenText.text = gameScript.club_2;
						starGroup = this.add.group();
							
							/* Large Stars */
							var star1 = this.add.sprite(400,500, 'general', 'star');
							star1.scale.x = 1.2;
							star1.scale.y = 1.2;
							var star2 = this.add.sprite(350,400, 'general', 'star');
							star2.scale.x = 1.2;
							star2.scale.y = 1.2;
							var star3 = this.add.sprite(120,550, 'general', 'star');
							star3.scale.x = 1.2;
							star3.scale.y = 1.2;
							/* Medium Stars */
							var star4 = this.add.sprite(420,700, 'general', 'star');						
							star4.scale.x = .8;
							star4.scale.y = .8;
							var star5 = this.add.sprite(80,660, 'general', 'star');						
							star5.scale.x = .8;
							star5.scale.y = .8;
							var star6 = this.add.sprite(100,460, 'general', 'star');						
							star6.scale.x = .8;
							star6.scale.y = .8;
							/* Small Stars */
							var star7 = this.add.sprite(300,370, 'general', 'star');						
							star7.scale.x = .5;
							star7.scale.y = .5;
							var star8 = this.add.sprite(250,410, 'general', 'star');						
							star8.scale.x = .5;
							star8.scale.y = .5;
							var star9 = this.add.sprite(200,370, 'general', 'star');						
							star9.scale.x = .5;
							star9.scale.y = .5;
							var star10 = this.add.sprite(130,770, 'general', 'star');						
							star10.scale.x = .5;
							star10.scale.y = .5;
							var star11 = this.add.sprite(460,620, 'general', 'star');						
							star11.scale.x = .5;
							star11.scale.y = .5;
							var star12 = this.add.sprite(400,600, 'general', 'star');						
							star12.scale.x = .5;
							star12.scale.y = .5;
					
						starGroup.add(star1);
						starGroup.add(star2);
						starGroup.add(star3);
						starGroup.add(star4);
						starGroup.add(star5);
						starGroup.add(star6);
						starGroup.add(star7);
						starGroup.add(star8);
						starGroup.add(star9);
						starGroup.add(star10);
						starGroup.add(star11);
						starGroup.add(star12);
					
						starGroup.forEach( function (star) {
					
							var originalScaleX = star.scale.x;
							var originalScaleY = star.scale.y;
							star.scale.x = 0;
							star.scale.y = 0;							

							var delay = 200 * Math.random();	

							this.add.tween(star.scale).to({x: originalScaleX, y: originalScaleY}, 200, Phaser.Easing.Linear.None, true, delay, 0, false).start();																	
						
						}, this);
																
						bacDecimal.text = "0 5";
						selectedChar.add(starGroup);
						starGroup.y -= 560;
						starGroup.x = 50;
				},this);
			},this);
				this.time.events.add(5800,function() {
					screenText.text = gameScript.club_3;
					var charRArmUp = this.add.tween(charRLimb).to({angle:'-91', y: '+20'}, 50, Phaser.Easing.Linear.None, true, 100).start().onComplete.add(function() {
						this.add.tween(starGroup).to({y: GAME_HEIGHT}, 700, Phaser.Easing.Exponential.Out,false).start();
						charRHand.angle = 81;
							charRHand.x = 445;
							charRHand.y = 126;
						this.add.tween(charRHand).to({angle: 81}, 200, Phaser.Easing.Exponential.Out,false).start().onComplete.add(function() {
							NPCArm = selectedChar.create(GAME_WIDTH/3-113, 40*.82, 'selectableChars', 'Char_'+charCount+'_larm');
							NPCHand = selectedChar.create(GAME_WIDTH/3-118, 130*.82, 'selectableChars', 'Char_'+charCount+'_lhand');
							NPCLimb = this.add.group();
							NPCLimb.add(NPCArm);
							NPCLimb.add(NPCHand);
							NPCLimb.y = 450;
							NPCLimb.x = 1000; //This tweens to 700
							NPCLimb.angle = 90;
							NPCHand.angle = 81;
							NPCHand.x = 135;

							spilledBeer = this.add.sprite(GAME_WIDTH, 510, 'nightclub', 'beer_pint_small');
							spilledBeer.parent.sendToBack(spilledBeer);
							var spilledBeerTween = this.add.tween(spilledBeer).to({x: 535}, 200, Phaser.Easing.Linear.None, true, 100).start().onComplete.add(function() {
								spilledBeer.parent.bringToTop(spilledBeer);
								this.add.tween(spilledBeer).to({x:'-150', y: '+200'}, 350).start().onComplete.add(function() {
									spilledBeer.frameName = 'glass_smash';
								});
							}, this);

							var handPush = this.add.tween(NPCLimb).to({x: 700}, 200, Phaser.Easing.Linear.None, true, 100).start().onComplete.add(function() {
								mouth.frameName = 'mouth_7';
								mouth.x += 18;
							}, this);

						}, this);
						

					},this);	
					this.time.events.add(4800, function() {
						handPush = this.add.tween(NPCLimb).to({x: 1000}, 200, Phaser.Easing.Linear.None, true, 100).start().onComplete.add(function() {
								mouth.frameName = 'mouth_1';
								this.add.tween(charRLimb).to({angle: 0, y: '-20'}, 50, Phaser.Easing.Linear.None, true, 100).start();
								charRHand.angle = 0;
								charRHand.x = 415.5; 
								charRHand.y = 106.6;

								screenText.text = gameScript.club_4;
								starGroup.destroy();
								spilledBeer.destroy();
								button.alpha = 1;
								dontTouch = this.add.sprite(292, 449, 'general', 'do-not-touch');

								selectedChar.parent.bringToTop(selectedChar);
								bacDecimal.text = "0 6";
								this.add.tween(selectedChar).to({x: buttonDistance}, 3000, Phaser.Easing.Linear.None, true, 100).start().onComplete.add(function() {
									button.frameName = 'button_pressed';
									this.time.events.add(300, function() {
										this.add.tween(selectedChar).to({x: buttonBack}).start().onComplete.add(function() {
											button.frameName = 'button';
										}, this);
										this.add.tween(charLLeg).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();
										this.add.tween(charLFoot).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();
										this.time.events.add(75, function() {
											this.add.tween(charRLeg).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();	
											this.add.tween(charRFoot).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();	
										},this);
									}, this);
								}, this);

								this.add.tween(charLLeg).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  10, true ).start();
								this.add.tween(charLFoot).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  10, true ).start();
								this.time.events.add(75, function() {
									this.add.tween(charRLeg).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  10, true ).start();	
									this.add.tween(charRFoot).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  10, true ).start();	
								},this);
								this.time.events.add(3800, function() {
									screenText.text = gameScript.club_5;
									this.time.events.add(3800, function() {
										screenText.text = gameScript.club_6;
										duck = this.add.sprite(GAME_WIDTH, 550, 'general', 'duck');
										var duckSpot = selectedChar.x + 80;
										this.add.tween(duck).to({x: duckSpot, y: 510}, 150).start().onComplete.add(function(){
											this.add.tween(duck).to({y: clubFloor.y - 80, x: '-70'}, 150).start().onComplete.add(function() {
												this.time.events.add(150, function() {
													this.add.tween(duck).to({y: '-8'}, 70, Phaser.Easing.Linear.None, false, 0,  10, true ).start();
													this.add.tween(duck).to({ x: '-300'}, 500).start();
												},this);
											}, this);
										}, this);
										keys = this.add.sprite(125, clubFloor.y - 20, 'general', 'keys');
										this.add.tween(keys).to({y: clubFloor.y + 20}, 150).start();
										this.add.tween(selectedChar).to({angle: '-90', x: -400, y: '+40'},300).start();
										this.time.events.add(3800, function() { 
											this.add.tween(selectedChar).to({angle: '+90', x: -75, y: 520}, 100).start()
											duck.kill();
											keys.kill();
											button.kill();
											dontTouch.kill();
											screenText.text = gameScript.club_7;

											/** WORKING HERE **/

											console.log("npc appear here");
											switch ( DrinkDrive.GENDER )
											{
												case 'male':
													console.log(DrinkDrive.GENDER)
													female = this.add.sprite((clubFloor.x + clubFloor.width - 200) -80, clubScreen.y + clubScreen.height + 50, 'general', 'female');												
													break;											
												case 'female': 
													console.log(DrinkDrive.GENDER);
													female = this.add.sprite((clubFloor.x + clubFloor.width - 200) -80, clubScreen.y + clubScreen.height + 90, 'uglybody');
													female.scale.x = 0.9;
													female.scale.y = 0.9;
													toupe = this.add.sprite((clubFloor.x + clubFloor.width - 200) - 50 , clubScreen.y + clubScreen.height + 74, 'toupe');
													toupe.scale.x = 0.8;
													toupe.scale.y = 0.8;
													break;		
												default: 
													break;										
											}
											
											mouth.frameName = 'mouth_2';
											mouth.x += 3;
											mouth.y += 2;

																						
											bacDecimal.text = "0 8";
											this.time.events.add(3800, function() {
												screenText.text = gameScript.club_8;
												this.add.tween(charLLeg).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();
												this.add.tween(charLFoot).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();
												this.time.events.add(75, function() {
													this.add.tween(charRLeg).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();	
													this.add.tween(charRFoot).to({y: '-8'}, 150, Phaser.Easing.Linear.None, false, 0,  1, true ).start();	
												},this);
												var charSlide = this.add.tween(selectedChar).to({x: "+80"}, 350).start().onComplete.add(function() {
													charRLimb.angle = -90;
													charRHand.angle += 75;
													charRHand.y += female.width - 25;

													if( DrinkDrive.GENDER == 'male') {
														femaleBeard = this.add.sprite(female.x + female.width/2, female.y + female.height/3 + 15, 'general', 'beard');
														femaleBeard.scale.setTo(0,0);
														femaleBeard.anchor.setTo(0.5,0);
														this.time.events.add(2000, function() {
															this.add.tween(femaleBeard.scale).to({x: 1, y: 1}, 150, Phaser.Easing.Exponential.Out,false).start();
														}, this);
													}
													else 
													{
														femaleBeard = this.add.sprite(female.x + female.width/2, female.y + female.height/3 - 15, 'general', 'beard');
														femaleBeard.scale.setTo(0,0);
														femaleBeard.anchor.setTo(0.5,0);	
														this.time.events.add(2000, function() {
															toupe.kill();
														},this);
													}

													
												}, this);
												female.moveDown();
												this.time.events.add(3800, function() {
													screenText.text = gameScript.club_9;
													this.time.events.add(3800, function() {
														screenText.text = gameScript.club_10;
														this.time.events.add(3800, function() {
															female.kill();
															femaleBeard.kill();

															charRLimb.angle = 0;
															charRHand.angle -= 75;
															charRHand.y -= female.width -25;
															bacDecimal.text = "1  2";
															screenText.text = gameScript.club_11;
															this.add.tween(charLLimb).to({angle: '+140'}, 120).start();
															this.add.tween(charRLimb).to({angle: '-140'}, 120).start();
															this.add.tween(charRHand).to({x: '+10', y: '-15'}, 180, Phaser.Easing.Linear.None, false, 0,  3, true ).start();
															this.add.tween(charLHand).to({x: '-10', y: '-15'}, 180, Phaser.Easing.Linear.None, false, 0,  3, true ).start();
															this.time.events.add(1800, function() {
																screenText.text = gameScript.club_12;
																mouth.frameName = 'mouth_8';
																vomit = this.add.sprite(mouth.x+(mouth.width/2),mouth.y+5,'nightclub', 'vom1');
																var vomTween = this.add.tween(vomit).to({y: '+340'}, 600).start();
																this.time.events.add(120, function() {
																	vomit.frameName = 'vom2';
																	this.time.events.add(100, function() {
																		vomit.frameName = 'vom3';
																		this.time.events.add(120, function() {
																			vomit.frameName = 'vom4';
																			this.time.events.add(150, function() {
																				vomit.frameName = 'vom_splatter';
																				extraVom = this.add.sprite(vomit.x - 10, vomit.y + 5, 'nightclub', 'vom_splatter_extra');
																				selectedChar.add(extraVom);
																				extraVom.anchor.setTo(0.5);
																			}, this);
																		}, this);
																	}, this);
																},this);
																selectedChar.add(vomit);
																vomit.anchor.setTo(0.5);
																mouth.y -= 10;
																this.time.events.add(4800, function() {
																	screenText.text = gameScript.club_13;
																	vomit.destroy();
																	extraVom.destroy();
																	this.add.tween(selectedChar).to({angle: '90', x: GAME_WIDTH/2, y: 420}, 100).start();
																	this.time.events.add(3800, function() {
																		screenText.text = gameScript.club_14;
																		helpMe = this.add.sprite(selectedChar.x - selectedChar.width/2, 390, 'general', 'help-flag');
																		this.add.tween(helpMe).to({y: '-2', x: '+7'}, 75, Phaser.Easing.Linear.None, false, 0,  3, true ).start();
																		this.time.events.add(3800, function() {
																			ga('send','finishClubInfoScene','game', 'load', 'Finish Club Info Scene');
																			this.state.start('ClubScene');
																		}, this);
																	}, this);
																}, this);
															},this);
														}, this);
													}, this);
												}, this);
											}, this); 
										}, this);
									}, this);
								}, this);
						}, this);	
					}, this);
				}, this);
			screenText.text = gameScript.club_1;
			screenText.fontSize = 38;
		}, this);	
		}, this); 
	},
	restartState: function() {
		this.state.start(this.state.current);
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