
CupGame.Cloud = function (game) {
    this.game = game;		//	a reference to the currently running game

    this.sprite = null;
    this.isFullScreen = false;
};

CupGame.Cloud.prototype = {

	create: function (isSmoke) {
        //598 × 628 
        if(isSmoke)
        {
            this.sprite = this.game.add.sprite((this.game.width*0.5), (this.game.height*0.5), 'cup_game', 'cloud.png');   
        }
        else
        {
            this.sprite = this.game.add.sprite((this.game.width*0.5), (this.game.height*0.5)-240, 'cup_game', 'cloud.png');
        }
        
        this.sprite.anchor.set(0.5);
        
	},
    
	update: function () {

		
	},
    
    destroy: function()
    {
        this.sprite.destroy(); 
    },
    
    fullScreen: function(){
        this.sprite.width = (798 * 1.45);
        this.sprite.height = (828 * 1.45);
        this.isFullScreen = true;
    },
    
    shrinkCloud: function(aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(this.sprite);
        this.sprite.alpha = 1.0;
        
        if(this.isFullScreen)
        {
            aTween.to( { width: '-798px', height:'-828px', alpha: 0.0, x: this.game.width*0.5, y: this.game.height*0.5 }, speed, Phaser.Easing.Linear.None, true);
        }
        else
        {
            aTween.to( { width: '-798px', height:'-828px', alpha: 0.0, x: this.game.width*0.5, y: this.game.height*0.5 }, speed, Phaser.Easing.Linear.None, true);
        }
        
        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    },
    
    growCloud: function(aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(this.sprite);
        this.sprite.alpha = 0;
        
        aTween.to( { width: '+798px', height:'+828px', alpha: 1.0, x: this.game.width*0.5, y: this.game.height*0.5 }, speed, Phaser.Easing.Linear.None, true);
        
        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    },
    
    fadeOut: function(aFunction)
    {
        var speed = 2000;
        
        var aTween = this.game.add.tween(this.sprite);
        aTween.to( { alpha: 0 }, speed, Phaser.Easing.Quadratic.InOut);
        
        if(aFunction)
        {
            aTween.onComplete.add(aFunction, this);
        }
        aTween.start();
        
    },
    
    bringToTop: function()
    {
        this.sprite.bringToTop();
    }

};
