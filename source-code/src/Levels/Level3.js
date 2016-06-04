
CupGame.Level3 = function (game) {

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
    
    this.blurX = null;
    this.blurY = null;
    
    this.background = null;
    
    this.randomSwap = 5;
    this.hasResizedDistaction = false;
    
};

CupGame.Level3.prototype = {
    
	create: function () {
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        cups.updateSwapSpeed(400);
        cups.createBall();
        
        cups.setWizard(wizard);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        
        scoreBoard.bloodySign.inputEnabled = true;
        scoreBoard.bloodySign.events.onInputDown.add(this.scoreBoard_tapped, this);
        
        scoreBoard.updateLevel('Level 3');
        scoreBoard.updateBloodLevel("0", "7");
        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("Distraction!");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        infoImage.create(3);
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        /*
        infoLabel = new CupGame.InfoLabel(this.game);
        infoLabel.create();
        
        infoLabel.updateLabel('Level 3');
        infoLabel.updateSubLabel('Too many in the first hour. Confidence has done nothing to improve your skills.');
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
        
        this.randomSwap = randomNumberWithMax(cups.totalSwaps);
        this.state.states.Share.setLevel(3);
	},
    
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
	update: function () {
        cups.update();  
        
        if(!wizard.hasBlurred && cups.totalSwapsIndex === 5)
        {
            wizard.blur(true);
            (function(object) { 
                setTimeout(function(){
                    wizard.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!cups.hasBlurred && cups.totalSwapsIndex === 5)
        {
            cups.blur(true);
            (function(object) { 
                setTimeout(function(){
                    cups.blur(false);
                }, 3000);
            })(this)
        }
        if(!this.hasResizedDistaction && this.randomSwap === cups.totalSwapsIndex)
        {
            this.hasResizedDistaction = true;
               
            if(randomNumberWithMax(2) == 1)
            {
                cups.scaleItems(true);
                wizard.scaleItems(true);
            }
            else
            {
                cups.scaleItems(false);
                wizard.scaleItems(false);
            }

        }
        
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
        
        if(this.blurX)
            this.blurX.destroy();
        
        if(this.blurY)
            this.blurY.destroy();
        
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
                object.state.start('Level4');
            });
        })(this)
    },
    
    shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    },  
        
    blurScene: function(shouldBlur)
    {
        if(shouldBlur)
        { 
        	this.blurX = this.game.add.filter('BlurX');
            this.blurY = this.game.add.filter('BlurY');

            wizard.body.filter = [this.blurX, this.blurY];
        }
        else
        {
            //wizard.body.filter = null;
            //wizard.desk.filter = null;
        }
    }

};
