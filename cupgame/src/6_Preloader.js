2
CupGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
    this.load_status = null;
	this.ready = false;

};

CupGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
        
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
        
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
        
        this.game.add.image(0, 0, 'default_bg');
        
        this.game.load.onFileComplete.add(this.loader_refresh, this);
        this.game.load.onLoadComplete.add(this.loader_next, this);
        
        //console.log(this.game.state.states.Game.defaultTextStyle());
        
        //Display th loading please wait text
        var style = CupGame.Style.defaultText("30px", this.game.width*0.7, "#FFFFFF");
        
        var load_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.5), 'Please wait loading game data...', style);
        load_text.anchor.set(0.5);
        
        //Display the status of file loading to inform the user that it's in progress
        load_status = this.game.add.text((this.game.width*0.5), (this.game.height*0.5)+load_text.height, 'Preloading data', style);
        load_status.anchor.set(0.5);
        
        this.loader_load();
	    this.game.load.start();
	},
    
	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
        
	},
    
    cleanUp: function()
    {
        
    },
    
    loader_load: function()
    {
        //this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	    this.game.load.atlasJSONHash('cup_game', 'assets/cup_game.png', 'assets/cup_game.json');     
        
        this.game.load.script('filterX', 'src/filters/BlurX.js');
        this.game.load.script('filterY', 'src/filters/BlurY.js');
        
        this.game.load.image('level1', 'assets/text/level1.png');
        this.game.load.image('level2', 'assets/text/level2.png');
        this.game.load.image('level3', 'assets/text/level3.png');
        this.game.load.image('level4', 'assets/text/level4.png');
        this.game.load.image('level5', 'assets/text/level5.png');
        this.game.load.image('level6', 'assets/text/level6.png');
        this.game.load.image('levelx', 'assets/text/levelx.png');
        this.game.load.image('startBtn', 'assets/start_btn.png');
    },
    
    loader_refresh: function(progress, cacheKey, success, totalLoaded, totalFiles)
    {
       load_status.setText("Loading... "+ progress+ "%");
    },
    
    loader_next: function()
    {
        this.cleanUp();
  		
        //this.state.start('Level1');        
        this.state.start('MainMenu');
    }
};
