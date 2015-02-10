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
		var townimg;
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
		var currentMonHP;
		var currentMonAtt;
		var monGold;
		var slashFX;
		var player;
		var playerHP;
		var playerMaxHP;
		var playerAtt;
		var playerGold;
		var playerPots;
		var playerText;
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
		var cost;
		var hasStat;
		// audio
		var attackSFX;
		var damageSFX;
		var victorySFX;
		var townMusic;
		var shopMusic;
		var battle1Music;
		var battle2Music;
		var endingMusic;
		var buySFX;
		var errorSFX;
		// text
		var style;
    var topText
    var rightText;
    var actionText;
    
    // variables for battle
    var randomNum;
    var battleNum;
};

main.prototype = {
		create: function() {
				// set initial parameters
				playerHP = 5;
				playerMaxHP = 5;
				playerAtt = 4;
				playerGold = 0;
				playerPots = 1;
				mon1HP = 10;
				mon1Att = 3;
				mon2HP = 40;
				mon2Att = 10; // min 4
				mon3HP = 200;
				mon3Att = 41; // min 20
				
				// set initial button positions, visibility, and functions
				back = this.add.sprite(0, 0, 'back');
				back.visible = false;
				style = {font: "16px Verdana", fill: "#ffffff", align: "left" };
				var style2 = {font: "22px Verdana", fill: "#ffffff", align: "left" }
				topText = this.add.text(200, 35, "", style);
				rightText = this.add.text(550, 35, "", style);
				actionText = this.add.text(635, 515, "None", style);
				playerText = this.add.text(150, 477, " " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                    " + playerPots, style2);
				playerText.visible = false;
				// backgrounds
				shopmenu = this.add.sprite(0, 150, 'shopmenu');
				background = this.add.sprite(0, 150, 'background');
				townimg = this.add.sprite(20, 20, 'townimg');
				// town buttons
				shopBut = this.add.button(400, 150, 'shopBut', this.shop);
				battleBut1 = this.add.button(0, 150, 'battleBut1', this.battle1);
				battleBut2 = this.add.button(200, 150, 'battleBut2', this.battle2);
				battleBut3 = this.add.button(0, 300, 'battleBut3', this.battle3);
				
				// monsters & animations
				mon1 = this.add.sprite(345, 302, 'goblin');
				mon1.animations.add('attack', [0, 1, 2, 3, 4, 5, 6], 14, false);
				mon1.animations.add('die', [7, 8, 9, 10, 11], 10, false);
				mon2 = this.add.sprite(445, 302, 'ninja');
				mon2.scale.setTo(-1, 1);
				mon2.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, false);
				mon2.animations.add('die', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 20, false);
				mon2.animations.add('idle', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], true);
				mon3 = this.add.sprite(310, 262, 'dorver');
				mon3.scale.setTo(1.5, 1.5);
				mon3.animations.add('idle', [0, 1, 2, 3], 8, true);
				slashFX = this.add.sprite(315, 300, 'slash');
				slashFX.scale.setTo(2, 2);
				slashFX.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8], 18)
				
				// shop face assets
				shopGold = this.add.sprite(30, 20, 'shopGold');
				shopGreet = this.add.sprite(30, 20, 'shopGreet');
				shopNo = this.add.sprite(30, 20, 'shopNo');
				shopThank = this.add.sprite(30, 20, 'shopThank');
				// shop buttons
				buySword = this.add.button(345, 215, 'buyBut', this.buySword);
				buySpear = this.add.button(345, 257, 'buyBut', this.buySpear);
				buyAxe = this.add.button(345, 302, 'buyBut', this.buyAxe);
				buyPot = this.add.button(345, 347, 'buyBut', this.buyPot);
				buyRing = this.add.button(345, 392, 'buyBut', this.buyRing);
				buyIron = this.add.button(675, 215, 'buyBut', this.buyIron);
				buySteel = this.add.button(675, 257, 'buyBut', this.buySteel);
				buyPlate = this.add.button(675, 302, 'buyBut', this.buyPlate);
				
				// action buttons
				backTown = this.add.button(625, 508, 'backTown', this.backTown);
				attack = this.add.button(560, 490, 'attack', this.attack);
				counter = this.add.button(560, 530, 'counter', this.counter);
				potion = this.add.button(680, 490, 'potion', this.potion);
				run = this.add.button(680, 530, 'run', this.run);
				// gender select buttons
				male = this.add.sprite(230, 200, 'male');
				male.scale.setTo(1.5, 1.5);
				female = this.add.sprite(500, 200, 'female');
				female.scale.setTo(1.5, 1.5);
				maleBut = this.add.button(205, 300, 'maleBut', this.male);
				femaleBut = this.add.button(475, 300, 'femaleBut', this.female);
				
				// audio
				attackSFX = this.add.audio('attack');
				damageSFX = this.add.audio('damage');
				victorySFX = this.add.audio('victory');
				townMusic = this.add.audio('town', 1, true);
				shopMusic = this.add.audio('shop', 1, true);
				buySFX = this.add.audio('buy');
				errorSFX = this.add.audio('error');
				battle1Music = this.add.audio('battle1', 1, true);
				battle2Music = this.add.audio('battle2', 1, true);
				endingMusic = this.add.audio('ending');
				
				win = this.add.sprite(0, 0, 'win');
				die = this.add.button(0, 0, 'die', this.die);
				this.allVisible();
				// begin selection
				topText.setText("\n                 Are you a Boy or a Girl?");
				
		},
		// misc functions to reduce coding
		allVisible: function() { // sets all buttons to be invisible and resets text
				// action buttons
				backTown.visible = false;
				attack.visible = false;
				counter.visible = false;
				potion.visible = false;
				run.visible = false;
				// buy buttons
				buySword.visible = false;
				buySpear.visible = false;
				buyAxe.visible = false;
				buyPot.visible = false;
				buyRing.visible = false;
				buyIron.visible = false;
				buySteel.visible = false;
				buyPlate.visible = false;
				// text
				actionText.visible = false;
				topText.setText("");
				rightText.setText("");
				// backgrounds and images
				win.visible = false;
				die.visible = false;
				background.visible = false;
				this.shopVisible();
				shopmenu.visible = false;
				townimg.visible = false;
				// buttons
				shopBut.visible = false;
				battleBut1.visible = false;
				battleBut2.visible = false;
				battleBut3.visible = false;
				// monsters
				mon1.visible = false;
				mon2.visible = false;
				mon3.visible = false;
		},
		shopVisible: function() { // resets the shopkeeper's face
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
		},
		updatePlayer: function() { // updates playerText
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		// male female
		male: function() {
				female.visible = false;
				maleBut.visible = false;
				femaleBut.visible = false;
				male.x = 20;
				male.y = 500;
				
				// this.allVisible();
				// action buttons
				backTown.visible = false;
				attack.visible = false;
				counter.visible = false;
				potion.visible = false;
				run.visible = false;
				// buy buttons
				buySword.visible = false;
				buySpear.visible = false;
				buyAxe.visible = false;
				buyPot.visible = false;
				buyRing.visible = false;
				buyIron.visible = false;
				buySteel.visible = false;
				buyPlate.visible = false;
				// text
				actionText.visible = false;
				topText.setText("");
				rightText.setText("");
				// backgrounds and images
				win.visible = false;
				die.visible = false;
				background.visible = false;
				
				//this.shopVisible();
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				// continue visible
				shopmenu.visible = false;
				// buttons
				shopBut.visible = false;
				battleBut1.visible = false;
				battleBut2.visible = false;
				battleBut3.visible = false;
				// monsters
				mon1.visible = false;
				mon2.visible = false;
				mon3.visible = false;
				
				//this.backTown();
				back.visible = true;
				battleBut1.visible = true;
				battleBut2.visible = true;
				battleBut3.visible = true;
				shopBut.visible = true;
				topText.setText("Town\nWhat to do now...");
				actionText.visible = true;
				townMusic.play();
				townimg.visible = true;
				
				// updates playerText
				playerText.visible = true;
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		female: function() {
				male.visible = false;
				maleBut.visible = false;
				femaleBut.visible = false;
				female.x = 20;
				female.y = 500;
				
				// this.allVisible();
				// action buttons
				backTown.visible = false;
				attack.visible = false;
				counter.visible = false;
				potion.visible = false;
				run.visible = false;
				// buy buttons
				buySword.visible = false;
				buySpear.visible = false;
				buyAxe.visible = false;
				buyPot.visible = false;
				buyRing.visible = false;
				buyIron.visible = false;
				buySteel.visible = false;
				buyPlate.visible = false;
				// text
				actionText.visible = false;
				topText.setText("");
				rightText.setText("");
				// backgrounds and images
				win.visible = false;
				die.visible = false;
				background.visible = false;
				
				//this.shopVisible();
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				// continue visible
				shopmenu.visible = false;
				// buttons
				shopBut.visible = false;
				battleBut1.visible = false;
				battleBut2.visible = false;
				battleBut3.visible = false;
				// monsters
				mon1.visible = false;
				mon2.visible = false;
				mon3.visible = false;
				
				//this.backTown();
				back.visible = true;
				battleBut1.visible = true;
				battleBut2.visible = true;
				battleBut3.visible = true;
				shopBut.visible = true;
				topText.setText("Town\nWhat to do now...");
				actionText.visible = true;
				townMusic.play();
				townimg.visible = true;
				
				// updates playerText
				playerText.visible = true;
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		
		//shop buttons
		shop: function() {
				
		},
		buySword: function() {
				
		},
		buySpear: function() {
				
		},
		buyAxe: function() {
				
		},
		buyPot: function() {
				
		},
		buyRing: function() {
				
		},
		buyIron: function() {
				
		},
		buySteel: function() {
				
		},
		buyPlate: function() {
				
		},
		buy: function() {
				
		},
		
		// action button functions
		die: function() {
				
		},
		counter: function() {
				randomNum = Math.random();
				randomNum = Math.round((randomNum * 100)) % 2;
				
		},
		attack: function() {
				
		},
		potion: function() {
				
		},
		run: function() {
				
		},
		backTown: function() { // for the back to town button
				this.allVisible();
				back.visible = true;
				battleBut1.visible = true;
				battleBut2.visible = true;
				battleBut3.visible = true;
				shopBut.visible = true;
				topText.setText("Town\nWhat to do now...");
				actionText.visible = true;
		},
		battle1: function() {
				
		},
		battle2: function() {
				
		},
		battle3: function() {
				
		}
}
