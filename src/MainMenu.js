DrinkDrive.MainMenu = function(game) {};
DrinkDrive.MainMenu.prototype = {
	create: function() {
		this.add.sprite(40, 50, 'logo');
		var startButton = this.add.button((GAME_WIDTH/2)-106, 750, 'general', this.startGame, this);
		startButton.frameName = 'letsgo_btn';
	},
	startGame: function() {
		ga('send','startGame','game', 'click', 'Start Game');
		this.state.start('GenderSelect');
	}
};