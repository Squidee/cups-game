
CupGame.Level2 = function (game) {

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
    
    this.lights = null;
    this.exitButton = null;
    this.wizard = null;
    this.cups = null;
    this.scoreBoard = null;
    
    this.infoLabel = null;
    this.smoke = null;
    
    this.background = null;
};

CupGame.Level2.prototype = {

	create: function () {
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        cups.updateSwapSpeed(350);
        cups.createBall();
        cups.setWizard(wizard);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        
        scoreBoard.bloodySign.inputEnabled = true;
        scoreBoard.bloodySign.events.onInputDown.add(this.scoreBoard_tapped, this);
        
        scoreBoard.updateLevel('Level 2');
        scoreBoard.updateBloodLevel("0", "5");
        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("Paying attention?");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        infoImage.create(2);
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        /*
        infoLabel = new CupGame.InfoLabel(this.game);
        infoLabel.create();
        
        infoLabel.updateLabel('Level 2');
        infoLabel.updateSubLabel('Under the limit. Keep your eyes on those balls.');
        */
        
        var delayFor = 3500;
        
        (function(object) {     
            setTimeout(function(){
                infoImage.fadeOut();
                object.smoke.shrinkCloud();
            }, delayFor);
        })(this);
        
        (function(object) {     
            setTimeout(function(){
                 wizard.move(function(){ 
                    cups.startUp();
                });
                
            }, delayFor*1.5);
        })(this);
        
        this.state.states.Share.setLevel(2);
	},
    
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
	update: function () {
        cups.update();  
        
        if(cups.moveToNextLevel)
        {
            cups.moveToNextLevel = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.nextLevel();
                }, 500);
            })(this)
        }
        
        if(cups.moveToShareScene)
        {
            cups.moveToShareScene = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.shareScene();
                }, 500);
            })(this)   
        }
	},
    
    cleanUp: function()
    {
        lights.destroy();
        wizard.destroy();
        cups.destroy();
        
        scoreBoard.destroy();
        
        exitButton.destroy();
        //infoLabel.destroy();
        distractionLabel.destroy();
        
        this.smoke.destroy();
        this.background.destroy();
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
           
	},
    
    scoreBoard_tapped: function(pointer){
        //this.nextLevel();
    },
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
    nextLevel: function()
    {
        (function(object) { 
            object.smoke.bringToTop();
            object.smoke.growCloud(function(){
                object.cleanUp();
                object.state.start('Level3');
            });
        })(this)
    },
    
    shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    }  

};
