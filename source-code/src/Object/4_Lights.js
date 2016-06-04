CupGame.Lights = function (game) {
    this.game = game;		//	a reference to the currently running game
    
    
    this.lightState = false;
    this.lightFlashState = false;
    
    this.shineRightTween = null;
    this.shineLeftTween = null;
    
    this.hasFlashed = false;
};


CupGame.Lights.prototype = {
    
    
	create: function () {
        
        //925  770 
        shineRight = this.game.add.sprite(-340, 50, 'cup_game', 'lightRightShine.png');
        shineRight.alpha = 0;
        
        shineLeft = this.game.add.sprite(65, 50, 'cup_game', 'lightLeftShine.png');        
        shineLeft.alpha = 0;
        
        this.setWhiteLights();
        
        light_left = this.game.add.sprite((165/2)/2, 0, 'cup_game', 'lightLeft.png');
        light_left.anchor.set(0.5);
        
        light_right = this.game.add.sprite((this.game.width)-((165/2)/2), 0, 'cup_game', 'lightRight.png');
        light_right.anchor.set(0.5);
        
        light_left.inputEnabled = true;
        light_left.events.onInputDown.add(this.lights_tapped, this);
        
        light_right.inputEnabled = true;
        light_right.events.onInputDown.add(this.flash_lights_tapped, this);
	},
    
    setWhiteLights: function()
    {
        shineLeft.tint = RGBtoHEX(255, 255, 255);
        shineRight.tint = RGBtoHEX(255, 255, 255);
    },
    
	update: function () {
        
	},

    destroy:function()
    {
        shineRight.destroy(); 
        shineLeft.destroy();
        
        light_left.destroy();
        light_right.destroy();
        
        
    },
    
    switchLeftLight: function(enableLight)
    {
	    if(enableLight)
	       shineLeft.alpha = 0.2;
        else
           shineLeft.alpha = 0;
    },
    
    switchRightLight: function(enableLight)
    {
        if(enableLight)
	       shineRight.alpha = 0.2;
        else
           shineRight.alpha = 0;    
    },
    
    flashyLights: function(switchVal)
    {
        if(switchVal)
        {
            this.shineRightTween = this.colorSwitch(shineRight, RGBtoHEX(255, 0, 0), RGBtoHEX(69, 220, 121), 500);
            this.shineLeftTween = this.colorSwitch(shineLeft, RGBtoHEX(69, 220, 121), RGBtoHEX(255, 0, 0), 500);
        }
        else
        {
            if(this.shineRightTween!=null)
                this.shineRightTween.stop();
            
            if(this.shineLeftTween!=null)
                this.shineLeftTween.stop();
        }
    },
    
    colorSwitch: function(obj, startColor, endColor, time) {
        // create an object to tween with our step value at 0
        var colorBlend = {step: 0};

        // create the tween on this object and tween its step property to 100
        var colorTween = this.game.add.tween(colorBlend).to({step: 5}, time);
        // run the interpolateColor function every time the tween updates, feeding it the
        // updated value of our tween each time, and set the result as our tint
        colorTween.onUpdateCallback(function() {
            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 2, colorBlend.step);   
        });
        
        // set the object to the start color straight away
        obj.tint = startColor;    
        
        colorTween.repeatAll(5);
        
        colorTween.onComplete.add(function(){
            this.turnLights(false); 
            this.lightFlashState = false; 
        }, this);
        
        // start the tween
        colorTween.start();
        
        return colorTween;
    },
    
    turnLights: function(switchVal)
    {
        this.switchLeftLight(switchVal);
        this.switchRightLight(switchVal);
        
        this.lightState = switchVal;
    },
    
    lights_tapped: function ()
    {
        /*
        this.turnLights(this.lightState);   
        
        if(!this.lightState)
            this.setWhiteLights();  
        */
    },
    
    flash_lights_tapped: function()
    {
        /*
        this.toggleFlashLights();
        */
    },
    
    toggleFlashLights: function(){
        if(!this.lightState)
        {
            this.lights_tapped();
        }
        
        this.lightFlashState = !this.lightFlashState 
        
        this.flashyLights(this.lightFlashState);   
        this.turnLights(this.lightFlashState);      
    }
    

    
};

