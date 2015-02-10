var main = function(game) {
		// images
		var female;
		var male;
		var win;
		var back;
		var shopmenu;
		var background;
		var die;
		// shopkeeper
		var shopGold;
		var shopGreet;
		var shopNo;
		var shopThank;
		// sprites & associated parameters
		var mon1;
		var mon1HP;
		var mon1Att;
		var mon2;
		var mon2HP;
		var mon2Att;
		var mon3;
		var mon3HP;
		var mon3Att;
		var slashFX;
		var player;
		var playerHP;
		var playerAtt;
		var playerGold;
		var playerPots;
		// buttons
		var attack;
		var potion;
		var run;
		var counter;
		var shopBut;
		var battleBut1;
		var battleBut2;
		var battleBut3;
		var maleBut;
		var femaleBut;
		var backTown;
		// shop buttons
		var buySword;
		var buySpear;
		var buyAxe;
		var buyIron;
		var buySteel;
		var buyPlate;
		var buyPot;
		var buyRing;
		// audio
		var attackSFX;
		var damageSFX;
		var victorySFX;
		var townMusic;
		var shopMusic;
		var battle1Music;
		var battle2Music;
		var endingMusic;
		// text
		var style;
    var topText
    var rightText;
    var actionText;
    
    var randomNum;
};

main.prototype = {
		create: function() {
				// set initial button positions, visibility, and functions
				back = this.add.sprite(0, 0, 'back');
				//back.visible = false;
				style = {font: "16px Verdana", fill: "#ffffff", align: "left" };
				topText = this.add.text(200, 35, "", style);
				rightText = this.add.text(550, 35, "", style);
				actionText = this.add.text(635, 515, "None", style);
				
				// action buttons
				backTown = this.add.button(625, 508, 'backTown', this.backTown);
				// gender select buttons
				
				this.allVisible();
				// begin selection
				topText.setText("\n                    Are you a Boy or a Girl?");
				
				// testing random numbers
				randomNum = this.time.now % 2;
				topText.setText("" + randomNum + "\na\nb");
		},
		allVisible: function() { // sets all buttons to be invisible and resets text
				backTown.visible = false;
				actionText.visible = false;
				topText.setText("");
				rightText.setText("");
		},
		backTown: function() { // for the back to town button
				
		}
}
