var DrinkDrive = {
	orientated: false,
    score: 0
};
DrinkDrive.Boot = function(game) {};

DrinkDrive.Boot.prototype = {
	preload: function() {
        
        this.load.image('default_bg', 'assets/backgrounds/default.png');
        
		this.load.image('logo', 'img/logo.png');
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	init: function() {
		this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(320, 470, GAME_WIDTH, GAME_HEIGHT);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(320, 470, GAME_WIDTH*2, GAME_HEIGHT*2);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }



	    this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);

	    this.game.stateTransition.configure({
		  duration: 1200,
		  ease: Phaser.Easing.Exponential.InOut,
		  properties: {
		    alpha: 0.8
		  }
		});
	},
	create: function() {
		
	    this.state.start('Preloader');
	},
	gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        DrinkDrive.orientated = false;

        document.getElementById('orientation').style.display = 'none';

    },

    leaveIncorrectOrientation: function () {
        
        DrinkDrive.orientated = true;

        document.getElementById('orientation').style.display = 'block';

    }
};