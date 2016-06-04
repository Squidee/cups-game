
CupGame.MainMenu = function (game) {

	this.playButton = null;
    this.message_text = null;
    this.load_text = null;
    this.desk = null;
    this.cups = null;
    this.tapped = false;
};

CupGame.MainMenu.prototype = {

	create: function () {
        
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //Display the background
        this.game.add.image(0, 0, 'default_bg');
        
        //Display buttons and defines a callback
        
        this.cloud = this.game.add.sprite((this.game.width*0.5), (this.game.height/2)-240, 'cup_game', 'cloud.png');
        this.cloud.anchor.set(0.5);
        
        //Text
        var style = CupGame.Style.defaultText("60px", this.game.width*0.7, "#46a8ef");
        
        load_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.25), 'This will be the loosest cup & ball game you\'ve ever played.', style);
        load_text.anchor.set(0.5);
        
        desk = new CupGame.Desk(this.game);
        desk.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create();
        
        cups.createBall();
        
        
        playButton = this.game.add.sprite((this.game.width*0.5-130), (this.game.height-85), 'cup_game', 'letsgo.png');
        playButton.anchor.set(0.5);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.play_button_tapped, this);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
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

		//	Do some nice funky main menu effect here

	},
    cleanUp: function()
    {
        desk.destroy();
        cups.destroy();
        
        playButton.destroy();
        
    },
	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//	And start the actual game
		//this.state.start('Game');
        
	},
    
    play_button_tapped: function()
    {
        if(!this.tapped)
        {
            this.tapped = true;
            
            this.cleanUp();
            this.state.start('SecondMenu');
        }
    }

};
