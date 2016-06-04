DrinkDrive.Preloader = function(game) {
	DrinkDrive.GENDER = 'female';
	DrinkDrive.TEMP_GEN = 'female';
	DrinkDrive.CHOSEN_CHAR = 'character_1.png';
};

DrinkDrive.Preloader.prototype = {
	preload: function() {
		this.stage.backgroundColor = '#3eaaf5';
		
		var logoLoad = this.add.sprite(40, 50, 'logo');
		var preloadBar = this.add.sprite(110,logoLoad.y + logoLoad.height + 30, 'preloaderBar');

		this.load.setPreloadSprite(preloadBar);

		//Backgrounds
		this.load.image('blue-background', 'img/blue-background.png');
		this.load.image('pink-background', 'img/pink-background.png');

		//Spritesheets
		this.load.atlas('drinks', 'img/drinks.png', 'img/drinks.json');
		this.load.atlas('general', 'img/general.png', 'img/general.json');
		this.load.atlas('male_chars', 'img/male_chars.png', 'img/male_chars.json');
		this.load.atlas('cup_wizard', 'img/cup_wizard.png', 'img/cup_wizard.json');
		this.load.atlas('cup_wizard', 'assets/cup_game.png', 'assets/cup_game.json');

		this.load.image('guybeard', 'img/guybeard.png');
		this.load.image('toupe', 'img/toupe.png');
		this.load.image('uglybody', 'img/uglybody.png');

		this.load.image('sharebox', 'img/Sharebox_bg.png');
		this.load.image('facebook-share', 'img/facebook_btn.png');
		this.load.image('twitter-share', 'img/twitter_btn.png');
		this.load.image('email-share', 'img/email_btn.png');
		this.load.image('close-share', 'img/close_btn.png');

		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		this.load.image('final-lockup', 'img/final-lockup.png');
		this.load.image('orsLogo', 'img/ors-logo.png');



	},
	create: function() {
		this.state.start('MainMenu');
	}
};