
CupGame.Desk = function (game) {
    this.game = game;		//	a reference to the currently running game

    this.sprite = null;
    
};

CupGame.Desk.prototype = {

	create: function () {
        
        this.sprite = this.game.add.sprite((this.game.width*0.5), (this.game.height-100), 'cup_game', 'desk.png');
        this.sprite.anchor.set(0.5);
        
	},
    
	update: function () {

		
	},
    
    scaleItems: function(scaleUp){
        if(scaleUp)
        {
            this.growSprite(this.sprite);
        }
        else
        {
            this.shrinkSprite(this.sprite);
        }
    },
    
    shrinkSprite: function(sprite, aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(sprite);
        aTween.to( { width: '-200px'}, speed, Phaser.Easing.Linear.None, true);
        
        aTween.yoyo(true, 0);

        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    },
    
    growSprite: function(sprite, aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(sprite);
        aTween.to( { width: '+200px'}, speed, Phaser.Easing.Linear.None, true);
        
        aTween.yoyo(true, 0);

        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    },
    
    destroy: function()
    {
        this.sprite.destroy(); 
    }
    
    
};
