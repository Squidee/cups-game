CupGame.DistractionLabel = function (game) {
    this.game = game;		//	a reference to the currently running game
    
};


CupGame.DistractionLabel.prototype = {
    
	create: function () {
        
        var styleTwenty = CupGame.Style.defaultText("70px", this.game.width, "#FFFFFF");
        
        mainLabel = this.game.add.text((this.game.width/2), 120, '', styleTwenty);
        mainLabel.anchor.set(0.5);
        mainLabel.alpha = 0.0;
	},
    
	update: function () {
        
	},
    
    destroy: function()
    {
        mainLabel.destroy();
    },
    
    updateLabel: function(textValue){
        
        mainLabel.text = textValue;
    },
    
    showLabel:function ()
    {
        mainLabel.alpha = 1.0;   
    }
    
    
    
};
