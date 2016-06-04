CupGame.InfoLabel = function (game) {
    this.game = game;		//	a reference to the currently running game
    
};


CupGame.InfoLabel.prototype = {
    
	create: function () {
        
        var styleTwenty = CupGame.Style.defaultText("40px", this.game.width, "#FFFFFF");
        var styleTwentyBlack = CupGame.Style.defaultText("30px", (this.game.width * 0.75), "#FFFFFF");
        
        levelLabel = this.game.add.text((this.game.width/2), 50, '', styleTwenty);
        levelLabel.anchor.set(0.5);
        
        subLevelLabel = this.game.add.text((this.game.width/2), 135, '', styleTwentyBlack);
        subLevelLabel.anchor.set(0.5);
          
	},
    
	update: function () {
        
	},
    
    destroy: function()
    {
        levelLabel.destroy();
        subLevelLabel.destroy();
    },
    
    updateLabel: function(textValue){
        
        levelLabel.text = textValue;
    },
    
    updateSubLabel: function(textValue){
        
        subLevelLabel.text = textValue;
    },
    
    fadeOut: function(aFunction)
    {
        var speed = 250;
        
        var aTween = this.game.add.tween(levelLabel);
        aTween.to( { alpha: 0 }, speed, Phaser.Easing.Quadratic.InOut);
        
        aTween.start();
        
        var aTween2 = this.game.add.tween(subLevelLabel);
        aTween2.to( { alpha: 0 }, speed, Phaser.Easing.Quadratic.InOut);
        
        if(aFunction)
        {
            aTween2.onComplete.add(aFunction, this);
        }
        aTween2.start();
    }
    
    
};
