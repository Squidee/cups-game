CupGame.InfoImage = function (game) {
    this.game = game;		//	a reference to the currently running game
    this.sprite = null;
};


CupGame.InfoImage.prototype = {
    
	create: function (level) {
        if(level<=6)
        {
            this.sprite = this.game.add.sprite((this.game.width*0.5), (this.game.height*0.5), "level"+level);   
        }else{
            this.sprite = this.game.add.sprite((this.game.width*0.5), (this.game.height*0.5), "levelx");   
        }
        this.sprite.anchor.set(0.5);
	},
    
	update: function () {
        
	},
    
    destroy: function()
    {
        this.sprite.destroy();
    },
    
    fadeIn: function(aFunction)
    {
        var speed = 250;
        
        var aTween = this.game.add.tween(this.sprite);
        aTween.to( { alpha: 1 }, speed, Phaser.Easing.Quadratic.InOut);
        
        if(aFunction)
        {
            aTween.onComplete.add(aFunction, this);
        }
        aTween.start();
        
    },
    
    fadeOut: function(aFunction)
    {
        var speed = 150;
        
        var aTween = this.game.add.tween(this.sprite);
        aTween.to( { alpha: 0 }, speed, Phaser.Easing.Quadratic.InOut);
        
        if(aFunction)
        {
            aTween2.onComplete.add(aFunction, this);
        }
        aTween.start();
        
    }
    
    
};
