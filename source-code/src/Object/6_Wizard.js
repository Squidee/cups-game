CupGame.Wizard = function (game) {
    this.game = game;		//	a reference to the currently running game
    
    this.body = null;
    this.desk = null;
    this.cups = null;
    this.blurX = null;
    this.blurY = null;
    this.hasBlurred = false;
    
    this.leftEye = false;
    this.rightEye = false;
    
    this.eyeDown = false;
};

CupGame.Wizard.prototype = {
    
    
	create: function () {
        
        //367  719  
        
        this.body = this.game.add.sprite(this.game.width/2, this.game.height-(719/2), 'cup_game', 'wizard.png');
        this.body.anchor.set(0.5);
        
        this.leftEye = this.game.add.sprite((this.game.width/2)-65, (this.game.height/2)+70, 'cup_game', 'wizard_eye.png');
        this.leftEye.anchor.set(0.5);
        
        this.rightEye = this.game.add.sprite((this.game.width/2)+65, (this.game.height/2)+70, 'cup_game', 'wizard_eye.png');
        this.rightEye.anchor.set(0.5);
        
        this.desk = new CupGame.Desk(this.game);
        this.desk.create();
        
        this.blurX = this.game.add.filter('BlurX');
	    this.blurY = this.game.add.filter('BlurY');
        
	},
    
	update: function () {
        
	},
    
    destroy: function()
    {
        this.body.destroy();
        
        this.desk.destroy();
        
        this.rightEye.destroy();
        this.leftEye.destroy();
        
        if(this.blurX!= null)
            this.blurX.destroy();
        
        if(this.blurY!= null)
            this.blurY.destroy();
        
    },
    
    move: function (aFunction) {
        
      this.animateSprite(this.body, 580.5, 380.5);
        
      this.animateSprite(this.rightEye, 540, 385);
      this.animateSprite(this.leftEye, 540, 385, aFunction);
        
    },
    
    startUp: function()
    {
        
    },
    
    animateEyesDown: function(speed, aFunction){
        this.animateEyeSprite(speed, this.leftEye, false);
        this.animateEyeSprite(speed, this.rightEye, false, aFunction);
        
    },
    
    animateEyesUp: function(speed, aFunction){
        this.animateEyeSprite(speed, this.leftEye, true);
        this.animateEyeSprite(speed, this.rightEye, true, aFunction);
    },
    
    toggleEyes: function(){
        (function(object) { 
            object.animateEyesUp(100, function(){
                object.animateEyesDown(1000, function(){
                    setTimeout(function(){
                        object.animateEyesUp(1000, function(){
                            object.animateEyesDown(100); 
                        });
                    }, 500);  
                }); 
            });
        })(this)

        
    },
    
    animateEyeSprite: function(speed, aSprite, switchVal, aFunction)
    {   
        var aTween = this.game.add.tween(aSprite);
        
        if (switchVal)
        {
            aTween.to( { y: '+20' }, speed, Phaser.Easing.Quadratic.InOut, true);
        }
        else
        {
            aTween.to( { y: '-20' }, speed, Phaser.Easing.Quadratic.OutIn, true);
        }
        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();    
    },
    
    animateSprite: function(aSprite, negativeAmount, positiveAmount, aFunction)
    {
        var speed = 1000;
        
        var aTween = this.game.add.tween(aSprite);
        
        if (aSprite.y === negativeAmount)
        {
            aTween.to( { y: '-200' }, speed, Phaser.Easing.Quadratic.InOut, true);
        }
        else if (aSprite.y === positiveAmount)
        {
            aTween.to( { y: '+200' }, speed, Phaser.Easing.Quadratic.OutIn, true);
        }
        
        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();    
    },
    
    wizard_tapped: function ()
    {
        //this.move();
    },
    
    blur: function(shouldBlur)
    {
        if(shouldBlur)
        {
           this.hasBlurred = true;
           
	       this.body.filters = [this.blurX, this.blurY];
           this.desk.sprite.filters = [this.blurX, this.blurY];
           
            this.leftEye.filters = [this.blurX, this.blurY];
            this.rightEye.filters = [this.blurX, this.blurY];
            
        }
        else
        {
            this.hasBlurred = false;
            this.body.filters = null;   
            this.desk.sprite.filters = null;
            this.leftEye.filters = null;
            this.rightEye.filters = null;
        }
        
    },
    
    scaleItems: function(scaleUp)
    {
        this.desk.scaleItems(scaleUp);
    }
    
};
