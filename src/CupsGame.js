function RGBtoHEX(r, g, b) {    
    return r << 16 | g << 8 | b;    
}

function animateResizeGame(game, width, height, scale, completeFunction) {    
    var widthTo = width * scale;
    var heightTo = height * scale;
    
    var totalSteps = 60;
    var stepCount = 1;
    
    var differenceWidth = width - widthTo;
    var differenceHeight = height - heightTo;
    
    var grow = false;
    
    if(scale>=1)
    {
        grow = true;   
    }
    
    if(grow)
    {
        differenceWidth = width + widthTo;
        differenceHeight = height + heightTo;
        
        $("canvas").animate({
            'width': differenceWidth + "px",
            'height': differenceHeight + "px",
            'left': "-"+ (widthTo) + "px",
            'top': "-"+ (heightTo) + "px"
        }, 1000).animate({
            'width': width + "px",
            'height': height + "px",
            'left':  "0px",
            'top':  "0px"
        }, 1000);
    }
    else
    {    
        $("canvas").animate({
            'width': differenceWidth + "px",
            'height': differenceHeight + "px",
            'left': (differenceWidth) + "px",
            'top': (differenceHeight) + "px"
        }, 1000).animate({
            'width': width + "px",
            'height': height + "px",
            'left':  "0px",
            'top':  "0px"
        }, 1000);
    }
    
}

function randomNumberWithMax(itemSize)
{
    var returnRandom =  Math.floor(Math.random() * (itemSize)) + 1;
    
    return returnRandom;
}
        
function distractSize(game, scaleTo)
{
    (function(object) { 
        animateResizeGame(object, object.scale.width, object.scale.height, scaleTo, function(){
            
        });
    })(game)
}

function resetGameSizeWidth(object)
{
    if(object.device.desktop)
    {
        return DESKTOP_GAME_WIDTH;
    }
    else
    {
        return MOBILE_GAME_WIDTH;   
    }
}

function resetGameSizeHeight(object)
{
    if(object.device.desktop)
    {
        return DESKTOP_GAME_HEIGHT;
    }
    else
    {
        return MOBILE_GAME_HEIGHT;   
    }
}

(function( $ ){
   $.fn.pauseGame = function(game, statePause, aWidth, aHeight) {
       
       if(statePause)
       {
         //console.log(aWidth);  
         game.scale.width = aWidth;
         game.scale.height = aHeight;
         // Tell ScaleManager that we have changed sizes (updates canvas styles)
         game.scale.setSize();
       }
       else
       {
            game.scale.setMinMax(MIN_GAME_WIDTH, MIN_GAME_HEIGHT, resetGameSizeWidth(game), resetGameSizeHeight(game));
            game.scale.refresh();
       }
        
       
      
      return this;
   }; 
})( jQuery );


var GAME_WIDTH = 640; 
var GAME_HEIGHT = 940;

var MIN_GAME_WIDTH = 320; 
var MIN_GAME_HEIGHT = 470;

var DESKTOP_GAME_WIDTH = 420; 
var DESKTOP_GAME_HEIGHT = 570;

var MOBILE_GAME_WIDTH = 640; 
var MOBILE_GAME_HEIGHT = 940;


CupGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check CupGame.orientated in internal loops to know if it should pause or not */
    orientated: false
};

CupGame.Boot = function (game) {
};

CupGame.Boot.prototype = {

    init: function () {
        
        this.game.state.add('Preloader', CupGame.Preloader);
	    this.game.state.add('MainMenu', CupGame.MainMenu);
        this.game.state.add('SecondMenu', CupGame.SecondMenu);

        this.game.state.add('Level1', CupGame.Level1);
        this.game.state.add('Level2', CupGame.Level2);
        this.game.state.add('Level3', CupGame.Level3);
        this.game.state.add('Level4', CupGame.Level4);
        this.game.state.add('Level5', CupGame.Level5);
        this.game.state.add('Level6', CupGame.Level6);

        this.game.state.add('Share', CupGame.Share);
        
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(MIN_GAME_WIDTH, MIN_GAME_HEIGHT, DESKTOP_GAME_WIDTH, DESKTOP_GAME_HEIGHT);
            
            $("#game").addClass("desktop");
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(MIN_GAME_WIDTH, MIN_GAME_HEIGHT, MOBILE_GAME_WIDTH, MOBILE_GAME_HEIGHT);
            
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            $("#game").addClass("mobile");
        }

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        this.load.image('preloaderBar', 'images/preloader_bar.png');
        
        this.load.image('default_bg', 'assets/backgrounds/default.png');
        
    },

    create: function () {

        this.state.start('Preloader');
    },

    gameResized: function (width, height) {
        
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        CupGame.orientated = false;

        document.getElementById('orientation').style.display = 'none';

    },

    leaveIncorrectOrientation: function () {
        
        CupGame.orientated = true;

        document.getElementById('orientation').style.display = 'block';

    }
};

CupGame.Cups = function (game) {
    this.game = game;		//	a reference to the currently running game
    
    this.cup_1 = null;
    this.cup_2 = null;
    this.cup_3 = null;
    
    this.cup_1_blur = null;
    this.cup_2_blur = null;
    this.cup_3_blur = null;
    
    this.ball = null;
    
    this.leftHand = null;
    this.rightHand = null;
    
    this.hasHands = null;
    
    this.hasFinishedSwapping = false;
    
    this.cupsArray = null;
    
    this.currentSwapIndex = -1;
    this.totalSwapsIndex = -1;
    
    this.totalSwaps = 10;
    
    this.cupItemSwap_1 = true;
    this.cupItemSwap_2 = true;
    
    this.cupTapped = false;
    
    this.swapSpeed = 800;
    
    this.ballPositionIndex = null;
    
    this.currentBallPosition = null;
    
    this.moveToNextLevel = false;
    this.moveToShareScene = false; 
    this.hasBlurred = false;
    this.blurX = null;
    this.blurY = null;
    this.wizard = null;
};

CupGame.Cups.prototype = {
    
	create: function (withHands) {
        
        this.totalSwapsIndex = 0;
        var cupHeight = 400;
        
        this.hasHands = withHands
        
        this.cup_1 = this.game.add.sprite((this.game.width*0.5)-150, (this.game.height-cupHeight), 'cup_game', 'cup.png');
        this.cup_1.anchor.set(0.5);
        
        this.cup_2 = this.game.add.sprite((this.game.width*0.5), (this.game.height-(cupHeight-50)), 'cup_game', 'cup.png');
        this.cup_2.anchor.set(0.5);
        
        this.cup_3 = this.game.add.sprite((this.game.width*0.5)+150, (this.game.height-cupHeight), 'cup_game', 'cup.png');
        this.cup_3.anchor.set(0.5);
        
        
        this.cup_1_blur = this.game.add.sprite(this.cup_1.x, this.cup_1.y, 'cup_game', 'cup.png');
        this.cup_1_blur.anchor.set(0.5);
        
        this.cup_2_blur = this.game.add.sprite(this.cup_2.x, this.cup_2.y, 'cup_game', 'cup.png');
        this.cup_2_blur.anchor.set(0.5);
        
        this.cup_3_blur = this.game.add.sprite(this.cup_3.x, this.cup_3.y, 'cup_game', 'cup.png');
        this.cup_3_blur.anchor.set(0.5);
        
        
        this.cup_1_blur.alpha = 0;
        this.cup_2_blur.alpha = 0;
        this.cup_3_blur.alpha = 0;
        
        this.blurX = this.game.add.filter('BlurX');
        this.blurY = this.game.add.filter('BlurY');
        
        if(withHands)
        {
            /*
            this.cup_1.alpha = 0.5;
            this.cup_2.alpha = 0.5;
            this.cup_3.alpha = 0.5;
            */
            leftHand = this.game.add.sprite(this.game.width/2-185, this.game.height-((719/2) + 100), 'cup_game', 'leftHand.png');
            leftHand.anchor.set(0.5);
            leftHand.angle = 3;

            rightHand = this.game.add.sprite(this.game.width/2+185, this.game.height-((719/2) + 100), 'cup_game', 'rightHand.png');
            rightHand.anchor.set(0.5);
            rightHand.angle = -3;

            leftHand.bringToTop();
            rightHand.bringToTop();
            
            this.cup_1.events.onInputDown.add(this.left_cup_tapped, this);
            this.cup_2.events.onInputDown.add(this.middle_cup_tapped, this);
            this.cup_3.events.onInputDown.add(this.right_cup_tapped, this);
            
            this.enableInput(true);
        }
	},
    
    enableInput: function(switchValue){
        this.cup_1.inputEnabled = switchValue;
        this.cup_2.inputEnabled = switchValue;
        this.cup_3.inputEnabled = switchValue;  
    },
    
    setWizard: function(wizard) {
        this.wizard = wizard;
    },

    createBall: function()
    {
        ball = new CupGame.Ball(this.game);
        ball.create(this.hasHands);
        
        if(this.hasHands)
        {
            this.ballPositionIndex = 1;
            this.currentBallPosition = 1;
            
            this.bringToTop();
            
            leftHand.bringToTop();
            rightHand.bringToTop();
        }
    },
    
    enableDoubleVision: function(switchValue) {
        if(switchValue)
        {
            this.moveOut(this.cup_1_blur);
            this.moveOut(this.cup_2_blur);
            this.moveOut(this.cup_3_blur);
        }
        else
        {
            this.moveBack(this.cup_1_blur, function(){
                //this.cup_1_blur.alpha = 0;
            });
            
            this.moveBack(this.cup_2_blur, function(){
                //this.cup_2_blur.alpha = 0;
            });
            this.moveBack(this.cup_3_blur, function(){
                //this.cup_3_blur.alpha = 0;
            });
            
        }
    },
    
	update: function (distractionFunction) {
        
        if(this.currentSwapIndex != -1)
        {
            //We need to double swaps because there are two tweens also make sure we don't swap whilst a swap is happening as this updat function happens
            if(this.currentSwapIndex <= (this.totalSwaps * 2) && this.swapFinished())
            {
                this.doSwap(function(){
                    this.currentSwapIndex++;
                    
                    if(this.totalSwapsIndex == this.totalSwaps)
                    {
                        
                        leftHand.bringToTop();
                        rightHand.bringToTop();
                    
                        this.moveHandsIn(leftHand, rightHand, function(){
                            leftHand.bringToTop();
                            rightHand.bringToTop();
                            
                            this.hasFinishedSwapping = true;
                        });
                    }
                });
                this.totalSwapsIndex++;
            }
        }
	},
    
    bringToTop:function()
    {
        //Figure out which cup is at the front
        
        this.cup_1.bringToTop();
        this.cup_2.bringToTop();
        this.cup_3.bringToTop();
        
        leftHand.bringToTop();
        rightHand.bringToTop();
    },
    
    setAlpha: function(alphaValue)
    {
        leftHand.alpha = alphaValue;
        rightHand.alpha = alphaValue;
        
        this.cup_1.alpha = alphaValue;
        this.cup_2.alpha = alphaValue;
        this.cup_3.alpha = alphaValue;
        
    },
    destroy:function()
    {
        ball.destroy();
        
        this.cup_1.destroy();
        this.cup_2.destroy();
        this.cup_3.destroy();
        
        if(this.cup_1_blur)
        {
            this.cup_1_blur.destroy();
        }
        if(this.cup_2_blur)
        {
            this.cup_2_blur.destroy();
        }
        if(this.cup_3_blur)
        {
            this.cup_3_blur.destroy();
        }
        
        if(this.hasHands)
        {
            leftHand.destroy();
            rightHand.destroy();
        }
        if(this.blurX!= null)
            this.blurX.destroy();
        
        if(this.blurY!= null)
            this.blurY.destroy();
        
    },
    
    toggleCup: function(aCup, aFunction)
    {
        this.cupMoveUpDownToggle(aCup, aFunction);
    },
    
    toggleCup1: function(aFunction)
    {
        this.cupMoveUpDownToggle(this.cup_1, aFunction);
    },
    
    toggleCup2: function(aFunction)
    {
        this.cupMoveUpDownToggle(this.cup_2, aFunction);
    },
    
    toggleCup3: function(aFunction)
    {
        this.cupMoveUpDownToggle(this.cup_3, aFunction);
    },
    
    cupMoveUpDownToggle: function(cupSprite, aFunction)
    {   
        //We can pass whatever cup and it will toggle it
        var speed = 1000;
        var aTween = this.game.add.tween(cupSprite);
        
        if (cupSprite.y === 540)
        {
            aTween.to( { y: '-100' }, speed, Phaser.Easing.Quadratic.InOut, true);
        }
        else if (cupSprite.y === 440)
        {
            aTween.to( { y: '+100' }, speed, Phaser.Easing.Quadratic.OutIn, true);
        }
        
        if (cupSprite.y === 590)
        {
            aTween.to( { y: '-100' }, speed, Phaser.Easing.Quadratic.InOut, true);
        }
        else if (cupSprite.y === 490)
        {
            aTween.to( { y: '+100' }, speed, Phaser.Easing.Quadratic.OutIn, true);
        }
        
        if(aFunction)
        {
            aTween.onComplete.add(aFunction, this);
        }
        aTween.start();
    },
    
    randomInt: function(itemSize)
    {
        var returnRandom =  Math.floor(Math.random() * (itemSize)) + 1;
        
        return returnRandom;
    },
    
    doSwap: function(aFunctionOnComplete){
        
        var shouldSwapBallWithCup = this.randomInt(2);
        var swapWhichOne = this.randomInt(2);
        
        if(shouldSwapBallWithCup === 2)
        {
            if(swapWhichOne === 2)
            {
                this.cupSwap(this.swapSpeed, this.cup_1, this.cup_3, this.cup_2, aFunctionOnComplete);  
                //this.cupSwap(this.swapSpeed, this.cup_1_blur, this.cup_3_blur, this.cup_2_blur);  
                ball.moveToPosition(this.cup_3.x, this.cup_3.y);
                this.animateHandSwap(leftHand, rightHand);
            }
            else
            {
               this.cupSwap(this.swapSpeed, this.cup_1, this.cup_2, this.cup_3, aFunctionOnComplete);  
               //this.cupSwap(this.swapSpeed, this.cup_1_blur, this.cup_2_blur, this.cup_3_blur);  
               ball.moveToPosition(this.cup_2.x, this.cup_2.y);
               this.animateHandSwap(leftHand, rightHand);
            }
        }
        else
        {
            this.cupSwap(this.swapSpeed, this.cup_2, this.cup_3, this.cup_1, aFunctionOnComplete);
            //this.cupSwap(this.swapSpeed, this.cup_2_blur, this.cup_3_blur, this.cup_1_blur);
            this.animateHandSwap(leftHand, rightHand);
        }
    },
    
    cupSwap: function(speed, cupSprite1, cupSprite2, cupSprite3, aFunction)
    {   
        //We can pass whatever cup and it will toggle it
        this.cupItemSwap_1 = false;
        
        var middleCupYValue = 590;
        
        var aTween1 = this.game.add.tween(cupSprite1);
        
        aTween1.onStart.add(function(){
            if(cupSprite2.y === 540)
            {
                cupSprite3.bringToTop();   
            }
        }, this);
        
        aTween1.to( { x: cupSprite2.x, y:cupSprite2.y }, speed, Phaser.Easing.Quadratic.InOut, true);
        
        if(aFunction)
        {
            aTween1.onComplete.add(aFunction, this);
        }
        
        aTween1.onComplete.add(function(){
            this.cupItemSwap_1 = true;
        }, this);
        
        this.cupItemSwap_2 = false;
        var aTween2 = this.game.add.tween(cupSprite2);
        
        
        aTween2.onStart.add(function(){
            if(cupSprite1.y === 540)
            {
                cupSprite3.bringToTop();   
            }
        }, this);
        
        
        aTween2.to( { x: cupSprite1.x, y:cupSprite1.y }, speed, Phaser.Easing.Quadratic.InOut, true);
        
        if(aFunction)
        {
            aTween2.onComplete.add(aFunction, this);
        }
        
        aTween2.onComplete.add(function(){
            this.cupItemSwap_2 = true;
        }, this);
        
        aTween1.start();
        aTween2.start();
    },
       
    startUp: function(){
        this.toggleCup1();
        this.handMoveUpDownToggle(this.closestHand(1), function(){
            var object = this;
            setTimeout(function(){
                object.handMoveUpDownToggle(object.closestHand(1));  
                object.toggleCup1(function(){
                    object.beginGame();
                });     
            }, 500);
        });
    },
    
    beginGame: function(){
        var object = this;
        ball.toggleHidden();
        this.moveHandsOut(leftHand, rightHand, function(){
            object.currentSwapIndex = 1;    
        });
        
    },
    
    updateSwapSpeed: function(speed)
    {
        if(speed > 100)
            this.swapSpeed = speed;
        else
            this.swapSpeed = 100;
    },
    
    handMoveUpDownToggle: function(aHand, aFunction)
    {   
        var speed = 1000;
        var aTween = this.game.add.tween(aHand);
        
        if (aHand.y === 480.5)
        {
            aTween.to( { y: '-100' }, speed, Phaser.Easing.Quadratic.InOut);
        }
        else if (aHand.y === 380.5)
        {
            aTween.to( { y: '+100' }, speed, Phaser.Easing.Quadratic.OutIn);
        }
        
        if(aFunction)
        {
            aTween.onComplete.add(aFunction, this);
        }
        aTween.start();
    },
    
    animateHandSwap: function(aHand1, aHand2)
    {   
        var aTween1 = this.game.add.tween(aHand1);
        
        aTween1.to( { x: '-85px' }, this.swapSpeed*0.25, Phaser.Easing.Quadratic.OutIn);
        aTween1.yoyo(true, 0);
        
        aTween1.start();
        
        var aTween2 = this.game.add.tween(aHand2);
        
        aTween2.to( { x: '+85px' }, this.swapSpeed*0.25, Phaser.Easing.Quadratic.OutIn);
        aTween2.yoyo(true, 0);
        
        aTween2.start();
    },
    
    moveHandsOut: function(aHand1, aHand2, aFunction)
    {   
        var aTween1 = this.game.add.tween(aHand1);
        
        aTween1.to( { x: '-45px', y: '-25px' }, this.swapSpeed, Phaser.Easing.Quadratic.OutIn);
        
        
        aTween1.start();
        
        var aTween2 = this.game.add.tween(aHand2);
        
        aTween2.to( { x: '+45px', y: '-25px' }, this.swapSpeed, Phaser.Easing.Quadratic.OutIn);
        
        if(aFunction)
        {
            aTween2.onComplete.add(aFunction, this);
        }
        aTween2.start();
    },
    
    moveHandsIn: function(aHand1, aHand2, aFunction)
    {   
        var aTween1 = this.game.add.tween(aHand1);
        
        aTween1.to( { x: '+45px', y: '+25px' }, this.swapSpeed, Phaser.Easing.Quadratic.OutIn);
        
        
        aTween1.start();
        
        var aTween2 = this.game.add.tween(aHand2);
        
        aTween2.to( { x: '-45px', y: '+25px' }, this.swapSpeed, Phaser.Easing.Quadratic.OutIn);
        
        if(aFunction)
        {
            aTween2.onComplete.add(aFunction, this);
        }
        aTween2.start();
    },
    
    rotateHandToggle: function(aHand, aFunction)
    {   
        var speed = 500;
        
        var aTween = this.game.add.tween(aHand);
        
        if (aHand.angle === 3)
        {
            aTween.to( {  angle: '+90', x: '+35', y: '-20'  }, speed, Phaser.Easing.Quadratic.InOut);
        }
        else if (aHand.angle === 93)
        {
            aTween.to( { angle: '-90', x: '-35', y: '+20' }, speed, Phaser.Easing.Quadratic.OutIn);
        }
        else if (aHand.angle === -3)
        {
            aTween.to( {  angle: '-90', x: '-35', y: '-20'  }, speed, Phaser.Easing.Quadratic.InOut);
        }
        else if (aHand.angle === -93)
        {
            aTween.to( { angle: '+90', x: '+35', y: '+20' }, speed, Phaser.Easing.Quadratic.OutIn);
        }
        
        if(aFunction)
        {
            aTween.onComplete.add(aFunction, this);
        }
        aTween.start();  
    },
    
    handMoveToCup: function(aHand, aCup, aFunction)
    {   
        var speed = 500;
        
        var aTween = this.game.add.tween(aHand);
        
        if (aHand.angle === 3 || aHand.angle === -3)
        {
            aTween.to( { x: aCup.x -(aHand.width/2), y: (aCup.y - (aHand.height/2))  }, speed, Phaser.Easing.Quadratic.InOut);
        }
        else if (aHand.angle === 93 || aHand.angle === -93)
        {
            aTween.to( { x: aCup.x, y: (aCup.y - (aHand.height/2))  }, speed, Phaser.Easing.Quadratic.InOut);
        }
        
        if(aFunction)
        {
            aTween.onComplete.add(aFunction, this);
        }
        aTween.start();
    },
    
    swapFinished: function()
    {    
        if(this.cupItemSwap_1 && this.cupItemSwap_2)
        {
            return true;
        }
        else
        {
            return false;   
        }
    },
    
    hasTappedCup: function()
    {
        return this.cupTapped;
    },
    
    cupPosition: function(aCup)
    {
     /*
        aCup
            170
            540

        aCup
            320
            590

        aCup
            470
            540
     */
        if(aCup.y<589)
        {
            //We know its either a cup 1 or 2 as its to high
            if(aCup.x == 170)
            {
                return 1;
            }
            else
            {
                return 3;    
            }
        }
        else
        {
            return 2;
        }
        //return 1;
        
        //return 2;      
        //return 3;      
    },
    
    closestHand: function(cupNumber)
    {
        var xPos = 0;
        if(cupNumber === 1)
        {
            xPos = this.cup_1.x;
        }
        else if(cupNumber === 2)
        {
            xPos = this.cup_2.x;
        }
        else
        {
            xPos = this.cup_3.x;   
        }
        
        if(xPos <= 170)
        {
            return leftHand;         
        }
        else if(xPos >= 320)
        {
            return rightHand;        
        }
        else
        {
            //Middle cup
            return rightHand;        
        }
    },
    
    left_cup_tapped: function (aCup)
    {
        if(this.totalSwapsIndex == this.totalSwaps && !this.hasTappedCup() && this.hasFinishedSwapping && !this.hasBlurred)
        {
            this.bringToTop();
            ball.showBall();
            
            this.cupTapped = true;
            this.enableInput(false);
            var cupPosition = this.cupPosition(this.cup_1);
            
            if(cupPosition === 2)
            {
                this.wizard.toggleEyes();
                (function(object) { 
                    object.toggleCup1();  
                    setTimeout(function(){
                        object.toggleCup1(function(){
                           object.check_correct_cup(1); 
                        });    
                    }, 1500);
                })(this)
            }
            else
            {
                (function(object) { 
                object.toggleCup1();  
                object.handMoveUpDownToggle(object.closestHand(1), function(){
                    setTimeout(function(){
                        object.toggleCup1();
                        object.handMoveUpDownToggle(object.closestHand(1), function(){
                            object.check_correct_cup(1);
                        });     
                    }, 1500);
                });
                })(this)
            }
            
            
            
        }
    },
    
    middle_cup_tapped: function()
    {
        if(this.totalSwapsIndex == this.totalSwaps && !this.hasTappedCup() && this.hasFinishedSwapping && !this.hasBlurred)
        {
            this.bringToTop();
            ball.showBall();
            
            this.cupTapped = true;
            this.enableInput(false);
            
            var cupPosition = this.cupPosition(this.cup_2);
            
            if(cupPosition === 2)
            {
                this.wizard.toggleEyes();
                (function(object) { 
                    object.toggleCup2();  
                    setTimeout(function(){
                        object.toggleCup2(function(){
                           object.check_correct_cup(2); 
                        });       
                    }, 1500);
                })(this)
            }
            else
            {
                (function(object) { 
                object.toggleCup2();  
                object.handMoveUpDownToggle(object.closestHand(2), function(){
                    setTimeout(function(){
                        object.toggleCup2();
                        object.handMoveUpDownToggle(object.closestHand(2), function(){
                            object.check_correct_cup(2);
                        });     
                    }, 1500);
                });
                })(this)
            }
            
            
        }
    },
    
    right_cup_tapped: function ()
    {
        if(this.totalSwapsIndex == this.totalSwaps && !this.hasTappedCup() && this.hasFinishedSwapping && !this.hasBlurred)
        {
            this.bringToTop();
            ball.showBall();
            
            var cupPosition = this.cupPosition(this.cup_3);
            
            this.cupTapped = true;
            this.enableInput(false);
            
            if(cupPosition === 2)
            {
                this.wizard.toggleEyes();
                (function(object) { 
                    object.toggleCup3();  
                    setTimeout(function(){
                        object.toggleCup3(function(){
                           object.check_correct_cup(3); 
                        });   
                    }, 1500);
                })(this)
            }
            else
            {
                (function(object) { 
                object.toggleCup3();  
                object.handMoveUpDownToggle(object.closestHand(3), function(){
                    setTimeout(function(){
                        object.toggleCup3();
                        object.handMoveUpDownToggle(object.closestHand(3), function(){
                            object.check_correct_cup(3);
                        });     
                    }, 1500);
                });
                })(this)
            }
        }
    },
    
    
    check_correct_cup: function(tappedCup)
    {
        if(tappedCup === this.ballPositionIndex)
        {
            this.moveToNextLevel = true;
        }
        else
        {
            var correctCupPosition = this.cupPosition(this.cup_1);
            
            if(correctCupPosition === 2)
            {
                 this.wizard.toggleEyes();
                (function(object) { 
                    object.toggleCup1();  
                    setTimeout(function(){
                        object.toggleCup1(function(){
                           object.moveToShareScene = true;
                        });   
                    }, 1500);
                })(this)
            }
            else 
            {
                (function(object) { 
                    var aCupPosition = object.cupPosition(object.cup_1);
                    object.toggleCup1(); 
                    object.handMoveUpDownToggle(object.closestHand(aCupPosition), function(){
                        setTimeout(function(){
                            object.toggleCup1();
                            object.handMoveUpDownToggle(object.closestHand(aCupPosition), function(){
                                object.moveToShareScene = true;
                            });     
                        }, 1500);
                    });
                })(this)
            }
        }
    },
    
    blur: function(shouldBlur)
    {
        if(shouldBlur)
        {
            this.cup_1.alpha = 0.9;
            this.cup_2.alpha = 0.9;
            this.cup_3.alpha = 0.9;
            
            this.cup_1_blur.alpha = 0.9;
            this.cup_2_blur.alpha = 0.9;
            this.cup_3_blur.alpha = 0.9;
            
            this.hasBlurred = true;
           
            this.cup_1.filters = [this.blurX, this.blurY];
            this.cup_2.filters = [this.blurX, this.blurY];
            this.cup_3.filters = [this.blurX, this.blurY];
            
            this.cup_1_blur.filters = [this.blurX, this.blurY];
            this.cup_2_blur.filters = [this.blurX, this.blurY];
            this.cup_3_blur.filters = [this.blurX, this.blurY];
            
            leftHand.filters = [this.blurX, this.blurY];
            rightHand.filters = [this.blurX, this.blurY];
            
            
        }
        else
        {
            this.hasBlurred = false;
            
            this.cup_1.alpha = 1;
            this.cup_2.alpha = 1;
            this.cup_3.alpha = 1;
            
            this.cup_1.filters = null;
            this.cup_2.filters = null;
            this.cup_3.filters = null;
            
            this.cup_1_blur.filters = null;
            this.cup_2_blur.filters = null;
            this.cup_3_blur.filters = null;
            
            leftHand.filters = null;
            rightHand.filters = null;
        }
        
        this.enableDoubleVision(shouldBlur);
    },
    
    scaleItems: function(scaleUp)
    {
        if(scaleUp)
        {
            this.growSpriteCup(this.cup_1);
            this.growSpriteCup(this.cup_2);
            this.growSpriteCup(this.cup_3);
            
            this.growSpriteCup(this.cup_1_blur);
            this.growSpriteCup(this.cup_2_blur);
            this.growSpriteCup(this.cup_3_blur);
        }
        else
        {
            this.shrinkSpriteCup(this.cup_1);
            this.shrinkSpriteCup(this.cup_2);
            this.shrinkSpriteCup(this.cup_3);
            
            this.shrinkSpriteCup(this.cup_1_blur);
            this.shrinkSpriteCup(this.cup_2_blur);
            this.shrinkSpriteCup(this.cup_3_blur);
        }
    },
    
    shrinkSpriteCup: function(sprite, aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(sprite);
        aTween.to( { width: '-50px', height:'-50px'}, speed, Phaser.Easing.Linear.None, true);
        
        aTween.yoyo(true, 0);

        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    },
    
    growSpriteCup: function(sprite, aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(sprite);
        aTween.to( { width: '+50px', height:'+50px'}, speed, Phaser.Easing.Linear.None, true);
        
        aTween.yoyo(true, 0);

        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    },
    
    moveBack: function(sprite, aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(sprite);
        aTween.to( { x: '-50px', alpha: 0}, speed, Phaser.Easing.Linear.None, true);
        
        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    },
    
    moveOut: function(sprite, aFunction)
    {
        var speed = 1000;
        var aTween = this.game.add.tween(sprite);
        aTween.to( { x: '+50px', alpha: 1.0}, speed, Phaser.Easing.Linear.None, true);
        
        if(aFunction)
            aTween.onComplete.add(aFunction, this);
        
        aTween.start();   
    }
};


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


CupGame.Style = function (game) {
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.defaultText;
};

CupGame.Style.defaultText = function (fontSize, width)
{
    return this.defaultText(fontSize, width, "#46a8ef");
};

CupGame.Style.defaultText = function (fontSize, width, aColor)
{
    var style = { font: '', fontSize: fontSize, fill: aColor, wordWrap: true, wordWrapWidth: width, align: "center" };
    
    return style;
};

2
CupGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
    this.load_status = null;
	this.ready = false;

};

CupGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
        
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
        
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
        
        this.game.add.image(0, 0, 'default_bg');
        
        this.game.load.onFileComplete.add(this.loader_refresh, this);
        this.game.load.onLoadComplete.add(this.loader_next, this);
        
        //console.log(this.game.state.states.Game.defaultTextStyle());
        
        //Display th loading please wait text
        var style = CupGame.Style.defaultText("30px", this.game.width*0.7, "#FFFFFF");
        
        var load_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.5), 'Please wait loading game data...', style);
        load_text.anchor.set(0.5);
        
        //Display the status of file loading to inform the user that it's in progress
        load_status = this.game.add.text((this.game.width*0.5), (this.game.height*0.5)+load_text.height, 'Preloading data', style);
        load_status.anchor.set(0.5);
        
        this.loader_load();
	    this.game.load.start();
	},
    
	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
        
	},
    
    cleanUp: function()
    {
        
    },
    
    loader_load: function()
    {
        //this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	    this.game.load.atlasJSONHash('cup_game', 'assets/cup_game.png', 'assets/cup_game.json');     
        
        this.game.load.script('filterX', 'src/filters/BlurX.js');
        this.game.load.script('filterY', 'src/filters/BlurY.js');
        
        this.game.load.image('level1', 'assets/text/level1.png');
        this.game.load.image('level2', 'assets/text/level2.png');
        this.game.load.image('level3', 'assets/text/level3.png');
        this.game.load.image('level4', 'assets/text/level4.png');
        this.game.load.image('level5', 'assets/text/level5.png');
        this.game.load.image('level6', 'assets/text/level6.png');
        this.game.load.image('levelx', 'assets/text/levelx.png');
        this.game.load.image('startBtn', 'assets/start_btn.png');
    },
    
    loader_refresh: function(progress, cacheKey, success, totalLoaded, totalFiles)
    {
       load_status.setText("Loading... "+ progress+ "%");
    },
    
    loader_next: function()
    {
        this.cleanUp();
  		
        //this.state.start('Level1');        
        this.state.start('MainMenu');
    }
};


CupGame.MainMenu = function (game) {

	this.playButton = null;
    this.message_text = null;
    this.load_text = null;
    this.desk = null;
    this.cups = null;
    this.tapped = false;
};

CupGame.MainMenu.prototype = {

	create: function () {
        
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //Display the background
        this.game.add.image(0, 0, 'default_bg');
        
        //Display buttons and defines a callback
        
        this.cloud = this.game.add.sprite((this.game.width*0.5), (this.game.height/2)-240, 'cup_game', 'cloud.png');
        this.cloud.anchor.set(0.5);
        
        //Text
        var style = CupGame.Style.defaultText("60px", this.game.width*0.7, "#46a8ef");
        
        load_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.25), 'This will be the loosest cup & ball game you\'ve ever played.', style);
        load_text.anchor.set(0.5);
        
        desk = new CupGame.Desk(this.game);
        desk.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create();
        
        cups.createBall();
        
        
        playButton = this.game.add.sprite((this.game.width*0.5-130), (this.game.height-85), 'cup_game', 'letsgo.png');
        playButton.anchor.set(0.5);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.play_button_tapped, this);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        (function(object) { 
            object.game.input.keyboard.onDownCallback = function(e) {
                //if space bar or enter lets go
                if(e.keyCode == 13 || e.keyCode == 32)
                {
                    object.play_button_tapped();
                }
            };
        })(this)
        
        this.tapped = false;
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
    cleanUp: function()
    {
        desk.destroy();
        cups.destroy();
        
        playButton.destroy();
        
    },
	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//	And start the actual game
		//this.state.start('Game');
        
	},
    
    play_button_tapped: function()
    {
        if(!this.tapped)
        {
            this.tapped = true;
            
            this.cleanUp();
            this.state.start('SecondMenu');
        }
    }

};


CupGame.SecondMenu = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.desk = null;
    this.playButton = null;
    
    this.cups = null;
    this.cloud = null;
    this.smoke = null;
    this.message_text = null;
    this.tapped = false;
    this.infoImage = null;
};

CupGame.SecondMenu.prototype = {

	create: function () {
        
        this.game.add.image(0, 0, 'default_bg');
        
        this.desk = new CupGame.Desk(this.game);
        this.desk.create();
        
        this.cloud = new CupGame.Cloud(this.game);
        this.cloud.create();
        
        this.playButton = this.game.add.sprite((this.game.width*0.5), (this.game.height-100), 'startBtn');
        this.playButton.anchor.set(0.5);
        this.playButton.inputEnabled = true;
        this.playButton.events.onInputDown.add(this.play_button_tapped, this);
        
        this.cups = new CupGame.Cups(this.game);
        this.cups.create();
        
        this.cups.createBall();
        
        var style = CupGame.Style.defaultText("45px", (this.game.width*0.75), "#46a8ef");
        
        this.message_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.25), 'Watch what cup the ball goes under. Once the cups have stopped moving select the right cup.', style);
        this.message_text.anchor.set(0.5);
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(false);
        this.smoke.sprite.alpha = 0;
        
        (function(object) { 
            object.game.input.keyboard.onDownCallback = function(e) {
                //if space bar or enter lets go
                if(e.keyCode == 13 || e.keyCode == 32)
                {
                    object.play_button_tapped();
                }
            };
        })(this)
        
        this.tapped = false;
	},
   
	update: function () {

	},
    
    cleanUp: function()
    {
        this.desk.destroy();
        this.playButton.destroy();
        this.cups.destroy();
        this.message_text.destroy();
        
        this.cloud.destroy();
        this.smoke.destroy();
        
    },
    
    play_button_tapped: function()
    {
        if(!this.tapped)
        {
            this.tapped = true;
            
            (function(object) { 
                object.smoke.growCloud(function(){
                    object.state.start('Level1'); 
                    //object.cleanUp();
                });
            })(this)
            
        }
        
    },
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('SecondMenu');

	}

};


CupGame.Level1 = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.desk = null;
    
    this.lights = null;
    this.exitButton = null;
    this.wizard = null;
    this.cups = null;
    this.scoreBoard = null;
    this.smoke = null;
    this.background = null;
    this.hasResizedDistaction = false;
};

CupGame.Level1.prototype = {

	create: function () {
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        cups.updateSwapSpeed(700);
        cups.createBall();
        cups.setWizard(wizard);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        
        scoreBoard.bloodySign.inputEnabled = true;
        scoreBoard.bloodySign.events.onInputDown.add(this.scoreBoard_tapped, this);
        
        scoreBoard.updateLevel('Level 1');
        scoreBoard.updateBloodLevel("0", "0");
        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("BALLS!");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        infoImage.create(1);
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        /*
        infoLabel.updateLabel('Level 1');
        infoLabel.updateSubLabel('Sober but already handling balls');
        */
        
        var delayFor = 3500;
        
        (function(object) {     
            setTimeout(function(){
                infoImage.fadeOut();
                object.smoke.shrinkCloud();
            }, delayFor);
        })(this);
        
        (function(object) {     
            setTimeout(function(){
                 wizard.move(function(){ 
                    cups.startUp();
                });
                
            }, delayFor*1.5);
        })(this);
        
        this.state.states.Share.setLevel(1);
        this.randomSwap = randomNumberWithMax(cups.totalSwaps);
	},
    
	update: function () {
        
        cups.update();  
        
        if(cups.moveToNextLevel)
        {
            cups.moveToNextLevel = false;
            
            (function(object) {
                setTimeout(function(){
                    object.nextLevel();
                }, 500);
            })(this)
            
        }
        
        if(cups.moveToShareScene)
        {
            cups.moveToShareScene = false;
            (function(object) {
                setTimeout(function(){    
                    object.shareScene();
                }, 500);
            })(this)   
        }
	},
    
    cleanUp: function()
    {
        lights.destroy();
        wizard.destroy();
        cups.destroy();
        scoreBoard.destroy();
        exitButton.destroy();
        
        infoImage.destroy();
        distractionLabel.destroy();
        this.smoke.destroy();
        this.background.destroy();
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
           
	},
    
    scoreBoard_tapped: function(pointer){
        //this.nextLevel();
    },
    
    showDistraction: function(){
        //distractionLabel.showLabel();    
    },
    
    nextLevel: function()
    {
        (function(object) { 
            object.smoke.bringToTop();
            object.smoke.growCloud(function(){
                object.cleanUp();
                object.state.start('Level2');     
            });
        })(this)
    },
    
     shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    }  
};


CupGame.Level2 = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.desk = null;
    
    this.lights = null;
    this.exitButton = null;
    this.wizard = null;
    this.cups = null;
    this.scoreBoard = null;
    
    this.infoLabel = null;
    this.smoke = null;
    
    this.background = null;
};

CupGame.Level2.prototype = {

	create: function () {
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        cups.updateSwapSpeed(350);
        cups.createBall();
        cups.setWizard(wizard);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        
        scoreBoard.bloodySign.inputEnabled = true;
        scoreBoard.bloodySign.events.onInputDown.add(this.scoreBoard_tapped, this);
        
        scoreBoard.updateLevel('Level 2');
        scoreBoard.updateBloodLevel("0", "5");
        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("Paying attention?");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        infoImage.create(2);
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        /*
        infoLabel = new CupGame.InfoLabel(this.game);
        infoLabel.create();
        
        infoLabel.updateLabel('Level 2');
        infoLabel.updateSubLabel('Under the limit. Keep your eyes on those balls.');
        */
        
        var delayFor = 3500;
        
        (function(object) {     
            setTimeout(function(){
                infoImage.fadeOut();
                object.smoke.shrinkCloud();
            }, delayFor);
        })(this);
        
        (function(object) {     
            setTimeout(function(){
                 wizard.move(function(){ 
                    cups.startUp();
                });
                
            }, delayFor*1.5);
        })(this);
        
        this.state.states.Share.setLevel(2);
	},
    
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
	update: function () {
        cups.update();  
        
        if(cups.moveToNextLevel)
        {
            cups.moveToNextLevel = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.nextLevel();
                }, 500);
            })(this)
        }
        
        if(cups.moveToShareScene)
        {
            cups.moveToShareScene = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.shareScene();
                }, 500);
            })(this)   
        }
	},
    
    cleanUp: function()
    {
        lights.destroy();
        wizard.destroy();
        cups.destroy();
        
        scoreBoard.destroy();
        
        exitButton.destroy();
        //infoLabel.destroy();
        distractionLabel.destroy();
        
        this.smoke.destroy();
        this.background.destroy();
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
           
	},
    
    scoreBoard_tapped: function(pointer){
        //this.nextLevel();
    },
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
    nextLevel: function()
    {
        (function(object) { 
            object.smoke.bringToTop();
            object.smoke.growCloud(function(){
                object.cleanUp();
                object.state.start('Level3');
            });
        })(this)
    },
    
    shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    }  

};


CupGame.Level3 = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.desk = null;
    
    this.lights = null;
    this.exitButton = null;
    this.wizard = null;
    this.cups = null;
    this.scoreBoard = null;
    
    this.infoLabel = null;
    this.smoke = null;
    
    this.blurX = null;
    this.blurY = null;
    
    this.background = null;
    
    this.randomSwap = 5;
    this.hasResizedDistaction = false;
    
};

CupGame.Level3.prototype = {
    
	create: function () {
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        cups.updateSwapSpeed(400);
        cups.createBall();
        
        cups.setWizard(wizard);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        
        scoreBoard.bloodySign.inputEnabled = true;
        scoreBoard.bloodySign.events.onInputDown.add(this.scoreBoard_tapped, this);
        
        scoreBoard.updateLevel('Level 3');
        scoreBoard.updateBloodLevel("0", "7");
        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("Distraction!");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        infoImage.create(3);
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        /*
        infoLabel = new CupGame.InfoLabel(this.game);
        infoLabel.create();
        
        infoLabel.updateLabel('Level 3');
        infoLabel.updateSubLabel('Too many in the first hour. Confidence has done nothing to improve your skills.');
        */
        
        var delayFor = 3500;
        
        (function(object) {     
            setTimeout(function(){
                infoImage.fadeOut();
                object.smoke.shrinkCloud();
            }, delayFor);
        })(this);
        
        (function(object) {     
            setTimeout(function(){
                 wizard.move(function(){ 
                    cups.startUp();
                });
                
            }, delayFor*1.5);
        })(this);
        
        this.randomSwap = randomNumberWithMax(cups.totalSwaps);
        this.state.states.Share.setLevel(3);
	},
    
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
	update: function () {
        cups.update();  
        
        if(!wizard.hasBlurred && cups.totalSwapsIndex === 5)
        {
            wizard.blur(true);
            (function(object) { 
                setTimeout(function(){
                    wizard.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!cups.hasBlurred && cups.totalSwapsIndex === 5)
        {
            cups.blur(true);
            (function(object) { 
                setTimeout(function(){
                    cups.blur(false);
                }, 3000);
            })(this)
        }
        if(!this.hasResizedDistaction && this.randomSwap === cups.totalSwapsIndex)
        {
            this.hasResizedDistaction = true;
               
            if(randomNumberWithMax(2) == 1)
            {
                cups.scaleItems(true);
                wizard.scaleItems(true);
            }
            else
            {
                cups.scaleItems(false);
                wizard.scaleItems(false);
            }

        }
        
        if(cups.moveToNextLevel)
        {
            cups.moveToNextLevel = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.nextLevel();
                }, 500);
            })(this)
            
        }
        
        if(cups.moveToShareScene)
        {
            cups.moveToShareScene = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.shareScene();
                }, 500);
            })(this)   
        }
	},
    
    cleanUp: function()
    {
        lights.destroy();
        wizard.destroy();
        cups.destroy();
        
        scoreBoard.destroy();
        
        exitButton.destroy();
        //infoLabel.destroy();
        distractionLabel.destroy();
        
        if(this.blurX)
            this.blurX.destroy();
        
        if(this.blurY)
            this.blurY.destroy();
        
        this.smoke.destroy();
        this.background.destroy();
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
           
	},
    
    scoreBoard_tapped: function(pointer){
        //this.nextLevel();
    },
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
    nextLevel: function()
    {
        (function(object) { 
            object.smoke.bringToTop();
            object.smoke.growCloud(function(){
                object.cleanUp();
                object.state.start('Level4');
            });
        })(this)
    },
    
    shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    },  
        
    blurScene: function(shouldBlur)
    {
        if(shouldBlur)
        { 
        	this.blurX = this.game.add.filter('BlurX');
            this.blurY = this.game.add.filter('BlurY');

            wizard.body.filter = [this.blurX, this.blurY];
        }
        else
        {
            //wizard.body.filter = null;
            //wizard.desk.filter = null;
        }
    }

};


CupGame.Level4 = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatabre random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.desk = null;
    
    this.lights = null;
    this.exitButton = null;
    this.wizard = null;
    this.cups = null;
    this.scoreBoard = null;
    
    this.infoLabel = null;
    this.smoke = null;
    
    this.background = null;
    
    this.randomSwap = 5;
    this.hasResizedDistaction = false;
};

CupGame.Level4.prototype = {

	create: function () {
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        cups.updateSwapSpeed(175);
        cups.createBall();
        cups.setWizard(wizard);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        
        scoreBoard.bloodySign.inputEnabled = true;
        scoreBoard.bloodySign.events.onInputDown.add(this.scoreBoard_tapped, this);
        
        scoreBoard.updateLevel('Level 4');
        scoreBoard.updateBloodLevel("0", "8");
        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("YOU’RE DRUUUUUNNK!");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        infoImage.create(4);
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        /*
        infoLabel = new CupGame.InfoLabel(this.game);
        infoLabel.create();
        
        infoLabel.updateLabel('Level 4');
        infoLabel.updateSubLabel('You keep drinking without a break. Your fine motor skills aren’t very fine...or very skillful.');
        */
        
        var delayFor = 3500;
        
        (function(object) {     
            setTimeout(function(){
                infoImage.fadeOut();
                object.smoke.shrinkCloud();
            }, delayFor);
        })(this);
        
        (function(object) {     
            setTimeout(function(){
                 wizard.move(function(){ 
                    cups.startUp();
                });
                
            }, delayFor*1.5);
        })(this);
        
        this.state.states.Share.setLevel(4);
        this.randomSwap = randomNumberWithMax(cups.totalSwaps);
	},
    
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
	update: function () {
        cups.update();  
        
        if(!lights.hasFlashed && (cups.totalSwapsIndex === 2 || cups.totalSwapsIndex === 5 || cups.totalSwapsIndex === 7))
        {
            lights.hasFlashed = true;
            lights.toggleFlashLights();
        }
        
        
        if(!wizard.hasBlurred && cups.totalSwapsIndex === 5)
        {
            wizard.blur(true);
            (function(object) { 
                setTimeout(function(){
                    wizard.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!cups.hasBlurred && cups.totalSwapsIndex === 5)
        {
            cups.blur(true);
            (function(object) { 
                setTimeout(function(){
                    cups.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!this.hasResizedDistaction && this.randomSwap === cups.totalSwapsIndex)
        {
            this.hasResizedDistaction = true;
               
            if(randomNumberWithMax(2) == 1)
            {
                cups.scaleItems(true);
                wizard.scaleItems(true);
            }
            else
            {
                cups.scaleItems(false);
                wizard.scaleItems(false);
            }
        }
        
        if(cups.moveToNextLevel)
        {
            cups.moveToNextLevel = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.nextLevel();
                }, 500);
            })(this)
        }
        
        if(cups.moveToShareScene)
        {
            cups.moveToShareScene = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.shareScene();
                }, 500);
            })(this)   
        }
	},
    
    cleanUp: function()
    {
        lights.destroy();
        wizard.destroy();
        cups.destroy();
        
        scoreBoard.destroy();
        
        exitButton.destroy();
        //infoLabel.destroy();
        distractionLabel.destroy();
        this.smoke.destroy();
        this.background.destroy();
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
           
	},
    
    scoreBoard_tapped: function(pointer){
        //this.nextLevel();
    },
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
    nextLevel: function()
    {
        (function(object) { 
            object.smoke.bringToTop();
            object.smoke.growCloud(function(){
                object.cleanUp();
                object.state.start('Level5');
            });
        })(this)
    },
    
    shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    }  

};


CupGame.Level5 = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.desk = null;
    
    this.lights = null;
    this.exitButton = null;
    this.wizard = null;
    this.cups = null;
    this.scoreBoard = null;
    
    this.infoLabel = null;
    this.smoke = null;
    
    this.background = null;
    
    this.randomSwap = 5;
    this.hasResizedDistaction = false;
};

CupGame.Level5.prototype = {

	create: function () {
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        cups.updateSwapSpeed(250);
        cups.createBall();
        cups.setWizard(wizard);
        
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        /*
        infoLabel = new CupGame.InfoLabel(this.game);
        infoLabel.create();
        
        infoLabel.updateLabel('Level 5');
        infoLabel.updateSubLabel('Another couple and your definitely over the limit and almost under the table.');
        */
        scoreBoard.bloodySign.inputEnabled = true;
        scoreBoard.bloodySign.events.onInputDown.add(this.scoreBoard_tapped, this);
        
        scoreBoard.updateLevel('Level 5');
        scoreBoard.updateBloodLevel("1", "0");
        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("WRECKED! WRECKED! WRECKED!");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        infoImage.create(5);
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        var delayFor = 3500;
        
        (function(object) {     
            setTimeout(function(){
                infoImage.fadeOut();
                object.smoke.shrinkCloud();
            }, delayFor);
        })(this);
        
        (function(object) {     
            setTimeout(function(){
                 wizard.move(function(){ 
                    cups.startUp();
                });
                
            }, delayFor*1.5);
        })(this);
        
        this.state.states.Share.setLevel(5);
        this.randomSwap = randomNumberWithMax(cups.totalSwaps);
	},
    
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
	update: function () {
        cups.update();  
        
        if(!lights.hasFlashed && (cups.totalSwapsIndex === 2 || cups.totalSwapsIndex === 5 || cups.totalSwapsIndex === 7))
        {
            lights.hasFlashed = true;
            lights.toggleFlashLights();
        }
        
        if(!wizard.hasBlurred && cups.totalSwapsIndex === 5)
        {
            wizard.blur(true);
            (function(object) { 
                setTimeout(function(){
                    wizard.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!cups.hasBlurred && cups.totalSwapsIndex === 5)
        {
            cups.blur(true);
            (function(object) { 
                setTimeout(function(){
                    cups.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!this.hasResizedDistaction && this.randomSwap === cups.totalSwapsIndex)
        {
            this.hasResizedDistaction = true;
               
            if(randomNumberWithMax(2) == 1)
            {
                cups.scaleItems(true);
                wizard.scaleItems(true);
            }
            else
            {
                cups.scaleItems(false);
                wizard.scaleItems(false);
            }
        }
        
        if(cups.moveToNextLevel)
        {
            cups.moveToNextLevel = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.nextLevel();
                }, 500);
            })(this)
            
        }
        
        if(cups.moveToShareScene)
        {
            cups.moveToShareScene = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.shareScene();
                }, 500);
            })(this)   
        }
	},
    
    cleanUp: function()
    {
        lights.destroy();
        wizard.destroy();
        cups.destroy();
        
        scoreBoard.destroy();
        
        exitButton.destroy();
        //infoLabel.destroy();
        distractionLabel.destroy();
        this.smoke.destroy();
        this.background.destroy();
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
           
	},
    
    scoreBoard_tapped: function(pointer){
        //this.nextLevel();
    },
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
    nextLevel: function()
    {
        (function(object) { 
            object.smoke.bringToTop();
            object.smoke.growCloud(function(){
                object.cleanUp();
                object.state.start('Level6');
            });
        })(this)
    },
    
    shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    }  

};


CupGame.Level6 = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.lights = null;
    this.exitButton = null;
    this.wizard = null;
    this.cups = null;
    this.scoreBoard = null;
    
    this.infoLabel = null;
    this.smoke = null;
    
    this.background = null;
    
    this.blackout = null;
    
    this.randomSwap = 5;
    this.hasResizedDistaction = false;
    
    this.levelDisplay = 6;
};

CupGame.Level6.prototype = {

	create: function () {
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        lights = new CupGame.Lights(this.game);
        lights.create();
        
        wizard = new CupGame.Wizard(this.game);
        wizard.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create(true);
        
        cups.updateSwapSpeed(200 - (this.levelDisplay * 2));
        cups.createBall();
        cups.setWizard(wizard);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        scoreBoard = new CupGame.ScoreBoard(this.game);
        scoreBoard.create();
        
        scoreBoard.updateLevel('Level ' + this.levelDisplay);
        
        switch(this.levelDisplay)
        {
            case 6:
                scoreBoard.updateBloodLevel("1", "2");
            break;
            
            case 7:
                scoreBoard.updateBloodLevel("1", "4");
            break;
                
            case 8:
                scoreBoard.updateBloodLevel("1", "6");
            break;
                
            case 9:
                scoreBoard.updateBloodLevel("1", "8");
            break;
                
            case 10:
                scoreBoard.updateBloodLevel("2", "0");
            break;
        }

        
        distractionLabel = new CupGame.DistractionLabel(this.game);
        distractionLabel.create();
        distractionLabel.updateLabel("YOU’RE A DISGRACE!");
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.fullScreen();
        
        infoImage = new CupGame.InfoImage(this.game);
        
        infoImage.create(this.levelDisplay);
        
        infoImage.sprite.alpha = 0;
        infoImage.fadeIn();
        
        this.blackout = this.add.sprite(0, 0, 'preloaderBackground');
        
        this.blackout.width = this.game.width;
        this.blackout.height = this.game.height;
        
        this.blackOutShouldBe(false);
        
        var delayFor = 3500;
        
        (function(object) {     
            setTimeout(function(){
                infoImage.fadeOut();
                object.smoke.shrinkCloud();
            }, delayFor);
        })(this);
        
        (function(object) {     
            setTimeout(function(){
                 wizard.move(function(){ 
                    cups.startUp();
                });
                
            }, delayFor*1.5);
        })(this);
        
        this.state.states.Share.setLevel(this.levelDisplay);
        this.randomSwap = randomNumberWithMax(cups.totalSwaps-2);
	},
    
    blackOutShouldBe: function(display){
        this.blackout.bringToTop();
        if(display)
        {
            var speed = 500;
            var aTween = this.game.add.tween(this.blackout);
            aTween.to( { alpha: 1 }, speed, Phaser.Easing.Quadratic.InOut);
            
            aTween.onComplete.add(function(){
                cups.setAlpha(0);
                (function(object) {     
                    setTimeout(function(){
                        var aTween2 = object.game.add.tween(object.blackout);
                        aTween2.to( { alpha: 0 }, 500, Phaser.Easing.Quadratic.InOut);
                        aTween2.onComplete.add(function(){
                            cups.setAlpha(1); 
                        });
                        aTween2.start();
                    }, 750);
                })(this);
                
            }, this);
            aTween.start();
        }
        else
        {
            cups.setAlpha(1);
            this.blackout.alpha = 0;
        }
    },
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
	update: function () {
        
        cups.update();  
        this.blackout.bringToTop();
        if(cups.totalSwapsIndex === 2)
        {
            this.blackOutShouldBe(true);
        }else if(cups.totalSwapsIndex === 6)
        {
            this.blackOutShouldBe(false);   
        }
        
        if(!wizard.hasBlurred && cups.totalSwapsIndex === 1)
        {
            wizard.blur(true);
            (function(object) { 
                setTimeout(function(){
                    wizard.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!cups.hasBlurred && cups.totalSwapsIndex === 1)
        {
            cups.blur(true);
            (function(object) { 
                setTimeout(function(){
                    cups.blur(false);
                }, 3000);
            })(this)
        }
        
        if(!this.hasResizedDistaction && this.randomSwap === cups.totalSwapsIndex)
        {
            this.hasResizedDistaction = true;
               
            if(randomNumberWithMax(2) == 1)
            {
                cups.scaleItems(true);
                wizard.scaleItems(true);
            }
            else
            {
                cups.scaleItems(false);
                wizard.scaleItems(false);
            }
        }
        
        if(cups.moveToNextLevel)
        {
            cups.moveToNextLevel = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.nextLevel();
                }, 500);
            })(this)
            
        }
        
        if(cups.moveToShareScene)
        {
            cups.moveToShareScene = false;
            
            (function(object) { 
                setTimeout(function(){
                    object.shareScene();
                }, 500);
            })(this)   
        }
	},
    
    cleanUp: function()
    {
        lights.destroy();
        wizard.destroy();
        cups.destroy();
        
        scoreBoard.destroy();
        
        exitButton.destroy();
        //infoLabel.destroy();
        distractionLabel.destroy();
        this.smoke.destroy();
        this.background.destroy();
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.cleanUp();
		//	Then let's go back to the main menu.
		this.state.start('MainMenu');
           
	},
    
    scoreBoard_tapped: function(pointer){
        //this.nextLevel();
    },
    
    showDistraction: function(){
        distractionLabel.showLabel();    
    },
    
    nextLevel: function()
    {
        (function(object) { 
            object.smoke.bringToTop();
            object.smoke.growCloud(function(){
                object.cleanUp();
                object.state.start('Level6');
                object.levelDisplay++;
            });
        })(this)
    },
    
    shareScene: function()
    {
        this.smoke.bringToTop();
        this.smoke.growCloud();
        this.cleanUp();
        this.state.start('Share');
    }  

};


CupGame.Share = function (game) {

	this.playButton = null;
    this.message_text = null;
    this.load_text = null;
    this.desk = null;
    this.cups = null;
    this.smoke = null;
    
    this.background = null;
    this.currentLevel = 0;
};

CupGame.Share.prototype = {

	create: function () {
        
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //Display the background
        
        this.game.stage.backgroundColor = '#FFFFFF';
        this.background = this.game.add.image(0, 0, 'default_bg');
        
        //Display buttons and defines a callback
        
        this.cloud = this.game.add.sprite((this.game.width*0.5), (this.game.height/2)-240, 'cup_game', 'cloud.png');
        this.cloud.anchor.set(0.5);
        
        //Text
        var style = CupGame.Style.defaultText("45px", this.game.width*0.7, "#46a8ef");
        
        load_text = this.game.add.text((this.game.width*0.5), (this.game.height*0.20), 'You reached level '+this.currentLevel+', Cup Wizard claims another drunk victim!', style);
        load_text.anchor.set(0.5);
        
        desk = new CupGame.Desk(this.game);
        desk.create();
        
        cups = new CupGame.Cups(this.game);
        cups.create();
        
        cups.createBall();
        
        playButton = this.game.add.sprite((this.game.width*0.5-130), (this.game.height-85), 'cup_game', 'playAgain.png');
        playButton.anchor.set(0.5);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.play_button_tapped, this);
        
        shareButton = this.game.add.sprite((this.game.width*0.5), ((this.game.height*0.5)-85), 'cup_game', 'shareButton.png');
        shareButton.anchor.set(0.5);
        shareButton.inputEnabled = true;
        shareButton.events.onInputDown.add(this.share_button_tapped, this);
        
        exitButton = new CupGame.ExitButton(this.game);
        exitButton.create();
        
        this.smoke = new CupGame.Cloud(this.game);
        this.smoke.create(true);
        this.smoke.sprite.alpha = 1.0;
        this.smoke.shrinkCloud();
        
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
    cleanUp: function()
    {
        load_text.destroy();
        desk.destroy();
        cups.destroy();
        
        playButton.destroy();
        shareButton.destroy();
        exitButton.destroy();
        this.smoke.destroy();
        this.background.destroy();
    },
	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//	And start the actual game
		//this.state.start('Game');
        
	},
    
    share_button_tapped: function()
    {
        alert("Share Button Action - we don't have a score?");
    },
    
    play_button_tapped: function()
    {
        this.cleanUp();
        this.state.start('SecondMenu');
    },
    setLevel: function(level){
        this.currentLevel = level;
    }

};


