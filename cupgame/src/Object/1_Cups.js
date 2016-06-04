
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
