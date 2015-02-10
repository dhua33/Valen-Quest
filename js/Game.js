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
		var damage;
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
				playerGold = 10;
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
				attackSFX = this.add.audio('attack', 0.5);
				damageSFX = this.add.audio('damage', 0.5);
				victorySFX = this.add.audio('victory', 0.5);
				townMusic = this.add.audio('town', 0.5, true);
				shopMusic = this.add.audio('shop', 0.5, true);
				buySFX = this.add.audio('buy', 0.5);
				errorSFX = this.add.audio('error', 0.5);
				battle1Music = this.add.audio('battle1', 0.5, true);
				battle2Music = this.add.audio('battle2', 0.5, true);
				endingMusic = this.add.audio('ending', 0.5);
				
				win = this.add.sprite(0, 0, 'win', this.win);
				die = this.add.button(0, 0, 'die', this.die);
				this.allVisible();
				// begin selection
				topText.setText("\n                 Are you a Boy or a Girl?");
				
		},
		// misc functions to reduce coding DOES NOT WORK 2/9/2015
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
				rightText.visible = true;
				rightText.setText("Max HP: " + playerMaxHP);
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
				rightText.visible = true;
				rightText.setText("Max HP: " + playerMaxHP);
				playerText.visible = true;
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		
		//shop buttons
		shop: function() { 
				// change music
				townMusic.stop();
				shopMusic.play();
				
				// initialize visuals
				townimg.visible = false;
				battleBut1.visible = false;
				battleBut2.visible = false;
				battleBut3.visible = false;
				shopBut.visible = false;
				actionText.visible = false;
				
				backTown.visible = true;
				shopGreet.visible = true;
				shopmenu.visible = true;
				topText.setText("Welcome to the shop!\nSee anything you like?");
				buySword.visible = true;
				buySpear.visible = true;
				buyAxe.visible = true;
				buyIron.visible = true;
				buySteel.visible = true;
				buyPlate.visible = true;
				buyPot.visible = true;
				buyRing.visible = true;
		},
		buySword: function() { // initialize vals
				cost = 200;
				hasStat = 10;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else if (hasStat <= playerAtt) {
						errorSFX.play();
						shopNo.visible = true;
						topText.setText("\nBuying another would be useless!");
				} else {
						buySFX.play();
						shopThank.visible = true;
						topText.setText("\nThank you~\nNow you're a bit stronger");
						playerGold -= cost;
						playerAtt = hasStat;
						playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
				}
		},
		buySpear: function() {
				cost = 1000;
				hasStat = 50;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else if (hasStat <= playerAtt) {
						errorSFX.play();
						shopNo.visible = true;
						topText.setText("\nBuying another would be useless!");
				} else {
						buySFX.play();
						shopThank.visible = true;
						topText.setText("\nThanks!\nGood luck hunting~");
						playerGold -= cost;
						playerAtt = hasStat;
						playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
				}
		},
		buyAxe: function() {
				cost = 5000;
				hasStat = 300;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else if (hasStat <= playerAtt) {
						errorSFX.play();
						shopNo.visible = true;
						topText.setText("\nBuying another would be useless!");
				} else {
						buySFX.play();
						shopThank.visible = true;
						topText.setText("\nThank you very much!\nYou have the best weapon in town.");
						playerGold -= cost;
						playerAtt = hasStat;
						playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
				}
		},
		buyPot: function() {
				cost = 100;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else {
						buySFX.play();
						shopThank.visible = true;
						topText.setText("\nThank you.\nKeep your health high!");
						playerGold -= cost;
						playerPots++;
						playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
				}
		},
		buyRing: function() {
				cost = 20000;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else {
						shopMusic.stop();
						buySFX.play();
						endingMusic.play();
						win.visible = true;
				}
		},
		buyIron: function() {
				cost = 350;
				hasStat = 15;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else if (hasStat <= playerHP) {
						errorSFX.play();
						shopNo.visible = true;
						topText.setText("\nBuying another would be useless!");
				} else {
						buySFX.play();
						shopThank.visible = true;
						topText.setText("\nThanks~\nDo your best with that armor!");
						playerGold -= cost;
						playerHP = hasStat;
						playerMaxHP = hasStat;
						rightText.setText("Max HP: " + playerMaxHP);
						playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
				}
		},
		buySteel: function() {
				cost = 1050;
				hasStat = 45;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else if (hasStat <= playerHP) {
						errorSFX.play();
						shopNo.visible = true;
						topText.setText("\nBuying another would be useless!");
				} else {
						buySFX.play();
						shopThank.visible = true;
						topText.setText("\nThank you~\nYou can take a hit in that armor.");
						playerGold -= cost;
						playerHP = hasStat;
						playerMaxHP = hasStat;
						rightText.setText("Max HP: " + playerMaxHP);
						playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
				}
		},
		buyPlate: function() {
				cost = 5000;
				hasStat = 150;
				shopGold.visible = false;
				shopGreet.visible = false;
				shopNo.visible = false;
				shopThank.visible = false;
				
				if(cost > playerGold) {
						errorSFX.play();
						shopGold.visible = true;
						topText.setText("\nYou don't have enough gold...");
				} else if (hasStat <= playerHP) {
						errorSFX.play();
						shopNo.visible = true;
						topText.setText("\nBuying another would be useless!");
				} else {
						buySFX.play();
						shopThank.visible = true;
						topText.setText("\nThank you so much!\nNothing can stop you now.");
						playerGold -= cost;
						playerHP = hasStat;
						playerMaxHP = hasStat;
						rightText.setText("Max HP: " + playerMaxHP);
						playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
				}
		},
		
		// action button functions
		die: function() {
				this.game.state.start('Game');
		},
		counter: function() {
				randomNum = Math.random();
				randomNum = Math.round((randomNum * 100)) % 2;
				if(randomNum > 0) { // counter failed
						rightText.setText("Counter failed.\nPlayer turn.");
						damage = Math.round(Math.random()*100) % currentMonAtt;
						if(battleNum === 1) {
								mon1.animations.play('attack');
						} else if(battleNum === 2) {
								if(damage < 4)
										damage += 4;
								mon2.animations.play('attack');
						} else if(battleNum === 3) {
								if(damage < 20)
										damage += 20;
						}
						damageSFX.play();
						damage = Math.round(damage*1.5);
						playerHP -= damage;
						topText.setText("Monster HP: "+ currentMonHP + "\nMonster attacked for " + damage + " damage.");
						if(battleNum === 1) {
								if(damage < 1)
										topText.setText("Monster HP: " + currentMonHP + "\nMonster missed!");
						}
						if(playerHP < 1){
								battle1Music.stop();
								battle2Music.stop();
								die.visible = true;
						}
				} else {
						slashFX.animations.play('attack');
						attackSFX.play();
						rightText.setText("Counter success!\nPlayer did " + playerAtt + " damage.\nPlayer Turn.");
						currentMonHP -= playerAtt;
						topText.setText("Monster HP: " + currentMonHP);
						if(currentMonHP < 1) {
								topText.setText("You defeated the monster!\nGained "+ monGold + " gold.");
								battle1Music.stop();
								battle2Music.stop();
								victorySFX.play();
								if(battleNum === 2) {
										mon2.animations.play('die');
								}
								backTown.visible = true;
								attack.visible = false;
								counter.visible = false;
								potion.visible = false;
								run.visible = false;
								playerGold += monGold;
						}
				}
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		attack: function() {
				damage = Math.round(Math.random()*100) % 10;
				if (damage > 0) {
						slashFX.animations.play('attack');
						attackSFX.play();
						rightText.setText("Player attacked.\nPlayer did " + playerAtt + " damage.\nPlayer Turn.");
						currentMonHP -= playerAtt;
						topText.setText("Monster HP: " + currentMonHP);
				} else {
						rightText.setText("Player Missed!\nPlayer turn.");
				}
						if(currentMonHP < 1) {
								topText.setText("You defeated the monster!\nGained "+ monGold + " gold.");
								battle1Music.stop();
								battle2Music.stop();
								victorySFX.play();
								if(battleNum === 2) {
										mon2.animations.play('die');
								}
								backTown.visible = true;
								attack.visible = false;
								counter.visible = false;
								potion.visible = false;
								run.visible = false;
								playerGold += monGold;
						} else {
						damage = Math.round(Math.random()*100) % currentMonAtt;
						if(battleNum === 1) {
								mon1.animations.play('attack');
						} else if(battleNum === 2) {
								if(damage < 4)
										damage += 4;
								mon2.animations.play('attack');
						} else if(battleNum === 3) {
								if(damage < 20)
										damage += 20;
						}
						damageSFX.play();
						playerHP -= damage;
						topText.setText("Monster HP: "+ currentMonHP + "\nMonster attacked for " + damage + " damage.");
						if(battleNum === 1) {
								if(damage < 1)
										topText.setText("Monster HP: " + currentMonHP + "\nMonster missed!");
						}
						if(playerHP < 1){
								battle1Music.stop();
								battle2Music.stop();
								die.visible = true;
						}
					}
				
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		potion: function() {
				if(playerPots < 1) {
						rightText.setText("No potions left.\nChoose another action.");
				} else if(playerHP === playerMaxHP) {
						rightText.setText("Player at max HP.\nChoose another action.");
				} else {
						playerHP = playerMaxHP;
						playerPots--;
						rightText.setText("Player used potion.\nPlayer turn.");
						damage = Math.round(Math.random()*100) % currentMonAtt;
						if(battleNum === 1) {
								mon1.animations.play('attack');
						} else if(battleNum === 2) {
								if(damage < 4)
										damage += 4;
								mon2.animations.play('attack');
						} else if(battleNum === 3) {
								if(damage < 20)
										damage += 20;
						}
						damageSFX.play();
						playerHP -= damage;
						topText.setText("Monster HP: "+ currentMonHP + "\nMonster attacked for " + damage + " damage.");
						if(battleNum === 1) {
								if(damage < 1)
										topText.setText("Monster HP: " + currentMonHP + "\nMonster missed!");
						}
						if(playerHP < 1){
								battle1Music.stop();
								battle2Music.stop();
								die.visible = true;
						}
				}
				
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		run: function() { // lose 25% gold, then do backTown
				playerGold = Math.round(playerGold*0.75);
				
				// for the back to town button
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
				
				// main func
				
				// stop music
				victorySFX.stop();
				battle1Music.stop();
				battle2Music.stop();
				shopMusic.stop();
				
				back.visible = true;
				battleBut1.visible = true;
				battleBut2.visible = true;
				battleBut3.visible = true;
				shopBut.visible = true;
				topText.setText("Town\nWhat to do now...");
				actionText.visible = true;
				townMusic.play();
				townimg.visible = true;
				
				playerHP = playerMaxHP;
				// updates playerText
				rightText.visible = true;
				rightText.setText("Max HP: " + playerMaxHP);
				playerText.visible = true;
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		backTown: function() { // for the back to town button
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
				
				// main func
				
				// stop music
				this.game.sound.stopAll();
				
				back.visible = true;
				battleBut1.visible = true;
				battleBut2.visible = true;
				battleBut3.visible = true;
				shopBut.visible = true;
				topText.setText("Town\nWhat to do now...");
				actionText.visible = true;
				townMusic.play();
				townimg.visible = true;
				
				playerHP = playerMaxHP;
				// updates playerText
				rightText.visible = true;
				rightText.setText("Max HP: " + playerMaxHP);
				playerText.visible = true;
				playerText.setText(" " + playerHP + "                      " + playerGold + "\n\n     " + playerAtt + "                      " + playerPots);
		},
		battle1: function() { // manage music
				townMusic.stop();
				battle1Music.play();
				
				// initialize visuals
				townimg.visible = false;
				battleBut1.visible = false;
				battleBut2.visible = false;
				battleBut3.visible = false;
				shopBut.visible = false;
				actionText.visible = false;
				
				attack.visible = true;
				potion.visible = true;
				run.visible = true;
				counter.visible = true;
				background.visible = true;
				mon1.visible = true;
				
				// variables
				battleNum = 1;
				currentMonHP = mon1HP;
				currentMonAtt = mon1Att;
				monGold = 75;
				
				// text
				topText.setText("Monster HP: " + currentMonHP);
				rightText.setText("Player turn.\nChoose an action.");
		},
		battle2: function() {
				townMusic.stop();
				battle1Music.play();
				
				// initialize visuals
				townimg.visible = false;
				battleBut1.visible = false;
				battleBut2.visible = false;
				battleBut3.visible = false;
				shopBut.visible = false;
				actionText.visible = false;
				
				attack.visible = true;
				potion.visible = true;
				run.visible = true;
				counter.visible = true;
				background.visible = true;
				mon2.visible = true;
				
				// variables
				battleNum = 2;
				currentMonHP = mon2HP;
				currentMonAtt = mon2Att;
				monGold = 300;
				mon2.animations.play('idle', 20, true, false);
				
				// text
				topText.setText("Monster HP: " + currentMonHP);
				rightText.setText("Player turn.\nChoose an action.");
		},
		battle3: function() {
				townMusic.stop();
				battle2Music.play();
				
				// initialize visuals
				townimg.visible = false;
				battleBut1.visible = false;
				battleBut2.visible = false;
				battleBut3.visible = false;
				shopBut.visible = false;
				actionText.visible = false;
				
				attack.visible = true;
				potion.visible = true;
				run.visible = true;
				counter.visible = true;
				background.visible = true;
				mon3.visible = true;
				
				// variables
				battleNum = 3;
				currentMonHP = mon3HP;
				currentMonAtt = mon3Att;
				monGold = 2500;
				
				// text
				topText.setText("Monster HP: " + currentMonHP);
				rightText.setText("Player turn.\nChoose an action.");
				
		}
}
