
CupGame.Share = function (game) {

	this.playButton = null;
    this.message_text = null;
    this.load_text = null;
    this.desk = null;
    this.cups = null;
    this.smoke = null;
    
    this.background = null;
    this.currentLevel = 0;
};

CupGame.Share.prototype = {

	create: function () {
        
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //Display the background
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        //Display buttons and defines a callback
        
        this.cloud = this.game.add.sprite((this.game.width*0.5), (this.game.height/2)-240, 'cup_game', 'cloud.png');
        this.cloud.anchor.set(0.5);
        
        //Text
        var style = CupGame.Style.defaultText("45px", this.game.width*0.7, "#46a8ef");
        
        load_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.20), 'You reached level '+this.currentLevel+', Cup Wizard claims another drunk victim!', style);
        load_text.anchor.set(0.5);
        
        desk = new CupGame.Desk(this.game);
        desk.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create();
        
        cups.createBall();
        
        playButton = this.game.add.sprite((this.game.width*0.5-130), (this.game.height-85), 'cup_game', 'playAgain.png');
        playButton.anchor.set(0.5);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.play_button_tapped, this);
        
        shareButton = this.game.add.sprite((this.game.width*0.5), ((this.game.height*0.5)-85), 'cup_game', 'shareButton.png');
        shareButton.anchor.set(0.5);
        shareButton.inputEnabled = true;
        shareButton.events.onInputDown.add(this.share_button_tapped, this);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.shrinkCloud();
        
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
    cleanUp: function()
    {
        load_text.destroy();
        desk.destroy();
        cups.destroy();
        
        playButton.destroy();
        shareButton.destroy();
        exitButton.destroy();
        this.smoke.destroy();
        this.background.destroy();
    },
	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//	And start the actual game
		//this.state.start('Game');
        
	},
    
    share_button_tapped: function()
    {
        alert("Share Button Action - we don't have a score?");
    },
    
    play_button_tapped: function()
    {
        this.cleanUp();
        this.state.start('SecondMenu');
    },
    setLevel: function(level){
        this.currentLevel = level;
    }

};
