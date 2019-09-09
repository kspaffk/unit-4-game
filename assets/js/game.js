$(document).ready(function() {
    // set variables

    // ship objects and functions for ship manipulation
    var Ship = {
        name: "",
        valueEl: "",
        health: 250,
        attackPwr: 0,
        attackValue: 0,
        agility: 1,
        enemyPwr: 0,
        image: "",
        isMyShip: false,
        isDefeated: false,

        attack: function(player, target) {
            player.health -= Math.ceil(target.enemyPwr * player.agility);
            target.health -= player.attackValue;
            player.attackValue += player.attackPwr;

            // keep health at 0 if they go negative
            if (target.health <= 0) {
                target.health = 0;
                $(".attack").empty();
             }
            if (player.health <= 0) {
                player.health = 0;
                $(".attack").empty();
            }
        },

        createShipEl: function() {
            var shipEl = $("<div>")
                .addClass("img-container click-me")
                .prop("value", this.valueEl);
            var shipNameEl = $("<div>")
                .addClass("ship-name")
                .text(this.name);
            var shipHealthEl = $("<div>")
                .addClass("ship-health")
                .text(this.health);
            shipEl.append(
                "<img class='ship-img' src='" +
                    this.image +
                    "' alt='" +
                    this.name +
                    "'>"
            );
            shipEl.append(shipNameEl);
            shipEl.append(shipHealthEl);
            return shipEl;
        }
    };

    // create header divs
    var chooseHeaderDiv = $("<div>")
        .addClass("section-header")
        .text("Choose your ship!");

    var myShipHeaderDiv = $("<div>")
        .addClass("section-header")
        .text("Your Ship");

    var enemyShipHeaderDiv = $("<div>")
        .addClass("section-header")
        .text("Select an enemy ship!");

    var targetShipHeaderDiv = $("<div>")
        .addClass("section-header")
        .text("Locked ON!");

    // create a text box for attack log
    var attTxtBox = $("<div>").addClass("attack-log");

    // create a text-box for win/loss message
    var txtBox = $("<div>").addClass("text-box");
    var txtBoxMain = $("<div>").addClass("txt-main");
    var txtBoxP1 = $("<p>").addClass("txt-content p1");
    var txtBoxP2 = $("<p>").addClass("txt-content p2");
    var endBtn = $("<button>")
        .addClass("end-btn")
        .text("Play Again");
    $(txtBox).append(txtBoxMain, endBtn);
    $(txtBoxMain)
        .append(txtBoxP1)
        .append(txtBoxP2);

    gameInit();

    function gameInit() {
        // empty out section divs
        $(".my-ship").empty();
        $(".enemy-ship").empty();
        $(".target-ship").empty();
        $(".attack").empty();

        // create the ship objects
        var awing = Object.create(Ship);
        var xwing = Object.create(Ship);
        var ywing = Object.create(Ship);
        var tieln = Object.create(Ship);
        var tieadv = Object.create(Ship);

        // populate an awing
        awing.name = "A-Wing";
        awing.valueEl = "awing";
        awing.health = 250;
        awing.enemyPwr = 10;
        awing.attackPwr = 3;
        awing.attackValue = 3;
        awing.agility = 0.7;
        awing.image = "assets/img/awing.png";
        awing.isMyShip = false;
        awing.isDefeated = false;
        //populate a xwing
        xwing.name = "X-Wing";
        xwing.valueEl = "xwing";
        xwing.health = 250;
        xwing.enemyPwr = 15;
        xwing.attackPwr = 4;
        xwing.attackValue = 4;
        xwing.agility = 0.9;
        xwing.image = "assets/img/xwing.png";
        xwing.isMyShip = false;
        xwing.isDefeated = false;
        //populate a ywing
        ywing.name = "Y-Wing";
        ywing.valueEl = "ywing";
        ywing.health = 250;
        ywing.enemyPwr = 20;
        ywing.attackPwr = 5;
        ywing.attackValue = 5;
        ywing.image = "assets/img/ywing.png";
        ywing.isMyShip = false;
        ywing.isDefeated = false;
        //populate an tieln
        tieln.name = "TIE/LN";
        tieln.valueEl = "tieln";
        tieln.health = 250;
        tieln.enemyPwr = 5;
        tieln.attackPwr = 3;
        tieln.attackValue = 3;
        tieln.agility = 0.6;
        tieln.image = "assets/img/tieln.png";
        tieln.isMyShip = false;
        tieln.isDefeated = false;
        //populate an tieadv
        tieadv.name = "TIE Adv";
        tieadv.valueEl = "tieadv";
        tieadv.health = 250;
        tieadv.enemyPwr = 25;
        tieadv.attackPwr = 4;
        tieadv.attackValue = 4;
        tieadv.image = "assets/img/tieadv.png";
        tieadv.isMyShip = false;
        tieadv.isDefeated = false;

        // put ships in an array to make them iterable
        var ships = [awing, xwing, ywing, tieln, tieadv];

        // keep track of which ships are chosen
        var indexOfMyShip;
        var indexOfTargetShip;

        // create ship elements under the choose-ship section
        $(".choose-ship").append(chooseHeaderDiv);
        ships.forEach(function(s) {
            $(".choose-ship").append(s.createShipEl());
        });

        // boolean to identify if the click is to choose your ship
        var isMyShipChoice = true;
        clickMe();

        // click function to choose ship, on click chooses your ship, puts others in enemy section
        function clickMe() {
            $(".click-me").click(function() {
                switch (this.value) {
                    case "awing":
                        if (isMyShipChoice) {
                            awing.isMyShip = true;
                            indexOfMyShip = 0;
                        } else {
                            indexOfTargetShip = 0;
                        }
                        break;
                    case "xwing":
                        if (isMyShipChoice) {
                            xwing.isMyShip = true;
                            indexOfMyShip = 1;
                        } else {
                            indexOfTargetShip = 1;
                        }
                        break;
                    case "ywing":
                        if (isMyShipChoice) {
                            ywing.isMyShip = true;
                            indexOfMyShip = 2;
                        } else {
                            indexOfTargetShip = 2;
                        }
                        break;
                    case "tieln":
                        if (isMyShipChoice) {
                            tieln.isMyShip = true;
                            indexOfMyShip = 3;
                        } else {
                            indexOfTargetShip = 3;
                        }
                        break;
                    case "tieadv":
                        if (isMyShipChoice) {
                            tieadv.isMyShip = true;
                            indexOfMyShip = 4;
                        } else {
                            indexOfTargetShip = 4;
                        }
                        break;
                }
                if (isMyShipChoice) {
                    myShipChosen();
                } else {
                    targetChosen();
                }
            });
        }

        function myShipChosen() {
            // remove the choose ship div
            $(".choose-ship").empty();
            // add header to my ship div
            $(".my-ship").append(myShipHeaderDiv);

            // remove ability to click on my ship by removing click-me class
            ships.forEach(function(s) {
                if (s.isMyShip) {
                    // remove ability to click on the ship and append to my ship section
                    var myShipEl = s.createShipEl();
                    myShipEl.removeClass("click-me");
                    $(".my-ship").append(myShipEl);
                }
            });

            selectEnemy();
        }

        function selectEnemy() {
            // clear out enemy ship div
            $(".enemy-ship").empty();
            // add header to enemy ships div
            $(enemyShipHeaderDiv).text("Choose your target!");
            $(".enemy-ship").append(enemyShipHeaderDiv);

            // add enemy ships to enemy section
            ships.forEach(function(s) {
                if (!s.isMyShip && !s.isDefeated) {
                    $(".enemy-ship").append(s.createShipEl());
                }
            });

            // when calling the clickMe function need to set isMyShipChoice to false so that it knows it is an enemy ship selection
            isMyShipChoice = false;
            // call the clickMe function to get enemy ship
            clickMe();
        }

        function targetChosen() {
            // remove the fadeOut that happens when target is destroyed
            $(".target-ship").removeAttr("style");
            $(".target-ship").empty();
            // create header for target div
            $(".target-ship").append(targetShipHeaderDiv);
            // put the targeted ship in the target div
            var targetedShipEl = ships[indexOfTargetShip].createShipEl();
            targetedShipEl.removeClass("click-me");
            $(".target-ship").append(targetedShipEl);
            // empty enemy ship element
            $(".enemy-ship").empty();
            $(".enemy-ship").append(enemyShipHeaderDiv);
            $(".enemy-ship>.section-header").text("Enemy ship targeted!");

            // recreate row of enemy ships without the click-me class so nothing happens when you click on them
            ships.forEach(function(s) {
                if (
                    s.valueEl !== ships[indexOfTargetShip].valueEl &&
                    !s.isDefeated &&
                    !s.isMyShip
                ) {
                    var enemyShipEl = s.createShipEl();
                    enemyShipEl.removeClass("click-me");
                    $(".enemy-ship").append(enemyShipEl);
                }
            });
            // manipulate enemy row to make smaller
            $(".enemy-ship>.img-container>img")
                .removeClass("click-me")
                .animate(
                    { width: "60px", height: "60px", opacity: ".3" },
                    { queue: false }
                );
            $(".enemy-ship>.img-container>.ship-name")
                .removeClass("click-me")
                .animate({ fontSize: "10px" }, { queue: false });
            $(".enemy-ship>.img-container>.ship-health")
                .removeClass("click-me")
                .animate({ fontSize: "12px" }, { queue: false });
            // create attack button
            var attackBtn = $("<button>")
                .addClass("attack-btn")
                .text("Attack!");
            $(".attack").append(attackBtn);
            // insert attack log div
            $(".main-section").append(attTxtBox);

            attackTar();
        }

        function attackTar() {
            $(".attack-btn").click(function() {
                // run attack function in Ship object
                Ship.attack(ships[indexOfMyShip], ships[indexOfTargetShip]);

                // log results
                var yourAttP = $("<p>").text("You attacked the " 
                    + ships[indexOfTargetShip].name 
                    + " for a total of " + ships[indexOfMyShip].attackValue 
                    + " damage. The target ship has " 
                    + ships[indexOfTargetShip].health 
                    + " health left.");
                var tarAttP = $("<p>").text("The " 
                    + ships[indexOfTargetShip].name 
                    + " attacked you for a total of " 
                    + (Math.ceil(ships[indexOfTargetShip].enemyPwr * ships[indexOfMyShip].agility))
                    + " damage. Your ship has " 
                    + ships[indexOfMyShip].health 
                    + " health left.");

                $(".attack-log").prepend(yourAttP, tarAttP);

                // update health values in div
                $(".my-ship>.img-container>.ship-health").text(
                    ships[indexOfMyShip].health
                );
                $(".target-ship>.img-container>.ship-health").text(
                    ships[indexOfTargetShip].health
                );

                // when either ship get to 0 health
                if (
                    ships[indexOfTargetShip].health <= 0 ||
                    ships[indexOfMyShip].health <= 0
                ) {
                    if (ships[indexOfTargetShip].health <= 0) {
                        ships[indexOfTargetShip].isDefeated = true;
                        // explosion then remove ship
                        $(".target-ship>.img-container>img").attr(
                            "src",
                            "assets/img/explosion.png"
                        );
                        $(".target-ship").fadeOut(500);
                    }

                    // check how many ships are still alive
                    var countEnemiesAlive;
                    countEnemiesAlive = 0;
                    // run through ships and check for alive enemy ships
                    ships.forEach(function(s) {
                        if (!s.isDefeated && !s.isMyShip) {
                            countEnemiesAlive++;
                        }
                    });

                    if (countEnemiesAlive > 0 && ships[indexOfMyShip].health > 0) {
                        selectEnemy();
                    } else {
                        // am I dead with enemies alive?
                        if (
                            ships[indexOfMyShip].health <= 0 &&
                            countEnemiesAlive > 0
                        ) {
                            lost();
                        }
                        // am I dead with all enemies dead?
                        else if (
                            ships[indexOfMyShip].health <= 0 &&
                            countEnemiesAlive <= 0
                        ) {
                            draw();
                        } else if (
                            countEnemiesAlive <= 0 &&
                            ships[indexOfMyShip].health > 0
                        ) {
                            win();
                        }
                    }
                }
            });
        }

        function lost() {
            $(".main-section").animate({ opacity: ".1" }, 750);
            $("body").append(txtBox);
            $(".p1").text("YOU LOSE!");
            $(".p2").text("Don't get cocky kid.");

            playAgain();
        }

        function draw() {
            $(".main-section").animate({ opacity: ".1" }, 750);
            $("body").append(txtBox);
            $(".p1").text("YOU LOSE!");
            $(".p2").text(
                "You killed all ships at the cost of your own life. You lose but win the moral victory (if you come back as a blue glowy)."
            );

            playAgain();
        }

        function win() {
            $(".main-section").animate({ opacity: ".1" }, 750);
            $("body").append(txtBox);
            $(".p1").text("YOU WIN!");
            $(".p2").text("How many midi-chlorians do you have?");

            playAgain();
        }

        function playAgain() {
            $(".end-btn").click(function() {
                $(".main-section").animate({ opacity: "1" }, 750);

                gameInit();
                $(".text-box").remove();
                $(".attack-log").empty();
                $(".attack-log").remove();
            });
        }
    }
});
