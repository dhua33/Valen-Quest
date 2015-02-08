var preloader = function(game){};

preloader.prototype = {
		preload: function() {
				var loading = this.add.sprite(0, 0, 'loading');
				this.load.image('title', 'assets/title.png');
				this.load.image('start', 'assets/start.png');
		},
		create: function() {
				this.game.state.start('MainMenu');
		}
}
