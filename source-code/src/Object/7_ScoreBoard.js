CupGame.ScoreBoard = function (game) {
    this.game = game;		//	a reference to the currently running game
    
    
    this.levelLabel = null;
    this.bloodLabel1 = null;
    this.bloodLabel2 = null;
    this.bloodLabel3 = null;
    this.bloodySign = null;
    
    
};


CupGame.ScoreBoard.prototype = {
    
    
	create: function () {
        
        this.bloodySign = this.game.add.sprite(30, this.game.height-(127+20), 'cup_game', 'blood.png');
        
        var styleTwenty = CupGame.Style.defaultText("45px", this.game.width, "#FFFFFF");
        
        var styleTwentyBlack = CupGame.Style.defaultText("70px", this.game.width, "#FFFFFF");
        
        this.levelLabel = this.game.add.text(85, this.game.height-(127+85), '', styleTwenty);
        
        this.bloodLabel1 = this.game.add.text(65, this.game.height - (115), '', styleTwentyBlack);
        this.bloodLabel2 = this.game.add.text(155, this.game.height - (115), '', styleTwentyBlack);
        this.bloodLabel3 = this.game.add.text(220, this.game.height - (115), '', styleTwentyBlack);
        
	},
    
	update: function () {
        
	},
    
    destroy: function()
    {
        this.bloodySign.destroy();
        this.levelLabel.destroy();
        this.bloodLabel1.destroy();
        this.bloodLabel2.destroy();
        this.bloodLabel3.destroy();
    },
    
    updateLevel: function(textValue){
        
        this.levelLabel.text = textValue;
    },
    
    updateBloodLevel: function(firstValue, secondValue){
        
        this.bloodLabel1.text = "0";
        this.bloodLabel2.text = firstValue;
        this.bloodLabel3.text = secondValue;
        
    }
    
    
};
