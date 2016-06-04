CupGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check CupGame.orientated in internal loops to know if it should pause or not */
    orientated: false
};

CupGame.Boot = function (game) {
};

CupGame.Boot.prototype = {

    init: function () {
        
        this.game.state.add('Preloader', CupGame.Preloader);
	    this.game.state.add('MainMenu', CupGame.MainMenu);
        this.game.state.add('SecondMenu', CupGame.SecondMenu);

        this.game.state.add('Level1', CupGame.Level1);
        this.game.state.add('Level2', CupGame.Level2);
        this.game.state.add('Level3', CupGame.Level3);
        this.game.state.add('Level4', CupGame.Level4);
        this.game.state.add('Level5', CupGame.Level5);
        this.game.state.add('Level6', CupGame.Level6);

        this.game.state.add('Share', CupGame.Share);
        
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(MIN_GAME_WIDTH, MIN_GAME_HEIGHT, DESKTOP_GAME_WIDTH, DESKTOP_GAME_HEIGHT);
            
            $("#game").addClass("desktop");
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(MIN_GAME_WIDTH, MIN_GAME_HEIGHT, MOBILE_GAME_WIDTH, MOBILE_GAME_HEIGHT);
            
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            $("#game").addClass("mobile");
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        this.load.image('preloaderBar', 'images/preloader_bar.png');
        
        this.load.image('default_bg', 'assets/backgrounds/default.png');
        
    },

    create: function () {

        this.state.start('Preloader');
    },

    gameResized: function (width, height) {
        
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        CupGame.orientated = false;

        document.getElementById('orientation').style.display = 'none';

    },

    leaveIncorrectOrientation: function () {
        
        CupGame.orientated = true;

        document.getElementById('orientation').style.display = 'block';

    }
};