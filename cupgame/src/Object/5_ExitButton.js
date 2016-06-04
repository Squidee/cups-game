CupGame.ExitButton = function (game) {
    this.game = game;		//	a reference to the currently running game

    this.aButton = null;
    
};

CupGame.ExitButton.prototype = {
    
	create: function () {
        
        aButton = this.game.add.sprite((this.game.width*0.8), (this.game.height-((113)/2)-30), 'cup_game', 'exit.png');
        aButton.anchor.set(0.5);
        aButton.inputEnabled = true;
        aButton.events.onInputDown.add(this.exit_button_tapped, this);
        aButton.events.onInputUp.add(this.exit_button_upped, this);
        
	},
    
	update: function () {
        
	},
    
    exit_button_upped: function ()
    {
        this.alpha = 1.0;
    },
    
    exit_button_tapped:function (aFunction)
    {
        //this.alpha
        //this.alpha = 0.2;
        //this.destroy();
        alert("Exit Button Action - Not sure where this goes");
    },
    
    destroy:function()
    {
        aButton.destroy(); 
    }
};
