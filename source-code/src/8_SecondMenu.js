
CupGame.SecondMenu = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.desk = null;
    this.playButton = null;
    
    this.cups = null;
    this.cloud = null;
    this.smoke = null;
    this.message_text = null;
    this.tapped = false;
    this.infoImage = null;
};

CupGame.SecondMenu.prototype = {

	create: function () {
        
        this.game.add.image(0, 0, 'default_bg');
        
        this.desk = new CupGame.Desk(this.game);
        this.desk.create();
        
        this.cloud = new CupGame.Cloud(this.game);
        this.cloud.create();
        
        this.playButton = this.game.add.sprite((this.game.width*0.5), (this.game.height-100), 'startBtn');
        this.playButton.anchor.set(0.5);
        this.playButton.inputEnabled = true;
        this.playButton.events.onInputDown.add(this.play_button_tapped, this);
        
        this.cups = new CupGame.Cups(this.game);
        this.cups.create();
        
        this.cups.createBall();
        
        var style = CupGame.Style.defaultText("45px", (this.game.width*0.75), "#46a8ef");
        
        this.message_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.25), 'Watch what cup the ball goes under. Once the cups have stopped moving select the right cup.', style);
        this.message_text.anchor.set(0.5);
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(false);
        this.smoke.sprite.alpha = 0;
        
        (function(object) { 
            object.game.input.keyboard.onDownCallback = function(e) {
                //if space bar or enter lets go
                if(e.keyCode == 13 || e.keyCode == 32)
                {
                    object.play_button_tapped();
                }
            };
        })(this)
        
        this.tapped = false;
	},
   
	update: function () {

	},
    
    cleanUp: function()
    {
        this.desk.destroy();
        this.playButton.destroy();
        this.cups.destroy();
        this.message_text.destroy();
        
        this.cloud.destroy();
        this.smoke.destroy();
        
    },
    
    play_button_tapped: function()
    {
        if(!this.tapped)
        {
            this.tapped = true;
            
            (function(object) { 
                object.smoke.growCloud(function(){
                    object.state.start('Level1'); 
                    //object.cleanUp();
                });
            })(this)
            
        }
        
    },
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('SecondMenu');

	}

};
