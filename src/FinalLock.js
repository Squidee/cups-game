DrinkDrive.FinalLock = function(game) {
	var finalLock;
	var orsLogo;
};
DrinkDrive.FinalLock.prototype = {
	create: function() {
		ga('send','startFinalLockup','game', 'load', 'Start Final Lockup');
		console.log(DrinkDrive.GENDER);
		switch(DrinkDrive.GENDER) 
		{
			case 'male':
			this.background = this.game.add.image(0, 0, 'blue-background');
			this.background = this.game.add.image(320, 0, 'blue-background');
			break;
			case 'female':
			this.background = this.game.add.image(0, 0, 'pink-background');
			this.background = this.game.add.image(320, 0, 'pink-background');
			break;
			default:
			break;
		}

		finalLock = this.add.sprite(30, 160, 'final-lockup');
		orsLogo = this.add.sprite(GAME_WIDTH/2, GAME_HEIGHT-170, 'orsLogo');
		orsLogo.anchor.setTo(0.5);

	},
	onSwipe: function() {
		if (Phaser.Point.distance(this.input.activePointer.position, this.input.activePointer.positionDown) > 150 && this.input.activePointer.duration > 100 && this.input.activePointer.duration < 250)
		{
			firstPointX = this.input.activePointer.positionDown.x;
			firstPointY = this.input.activePointer.positionDown.y;
			
			lastPointX = this.input.activePointer.position.x;
			lastPointY = this.input.activePointer.position.y;
			
			swiping = true;
		}
	},
	startNextScene: function() {
		//this.state.start('Boot');
		location.reload();
	},
	
	startPrevScene: function() {
		//this.state.start('ClubScene');
		location.reload();
	},
	
	update: function() {
		this.onSwipe();
		if (swiping) {
			swiping = false;
			if(firstPointY > lastPointY) {
				this.startNextScene();
			}
			else if(firstPointY < lastPointY) {
				this.startPrevScene();
			}
		}	
	}
};