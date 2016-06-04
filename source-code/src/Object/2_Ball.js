
CupGame.Ball = function (game) {
    this.game = game;		//	a reference to the currently running game

    this.sprite = null;
    this.toggleDisplay = false;
    
    this.cupHeight = 400;
    
};

CupGame.Ball.prototype = {

	create: function (withHands) {
        
        if(withHands)
        {
            this.sprite = this.game.add.sprite((this.game.width*0.5) - 150, (this.game.height-(this.cupHeight-50)), 'cup_game', 'ball.png');
        }
        else
        {
            this.sprite = this.game.add.sprite((this.game.width*0.5) + 120, (this.game.height-(this.cupHeight-80)), 'cup_game', 'ball.png');
        }
        
        this.sprite.anchor.set(0.5);
        
	},
    
	update: function () {

		
	},
    
    showBall: function()
    {
        this.sprite.alpha = 1;
        this.toggleDisplay = true;
        
    },
    
    toggleHidden: function()
    {
        if(!this.toggleDisplay)
        {
            this.sprite.alpha = 0;    
        }
        else
        {
            this.sprite.alpha = 1;
        }
        
        this.toggleDisplay = !this.toggleDisplay;
        
    },
    
    destroy:function()
    {
        this.sprite.destroy(); 
    },
    
    moveToPosition: function(positionX, positionY)
    {
        
        this.sprite.x = positionX;
        this.sprite.y = (positionY + 40);
    }
    
    
};
