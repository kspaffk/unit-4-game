$(document).ready(function() {
    // set variables

    // ship objects and functions for ship manipulation
    var Ship = {
        name: "",
        valueEl: "",
        health: 250,
        attackPwr: 0,
        attackValue: 0,
        enemyPwr: 0,
        image: "",
        isMyShip: false,
        isTargetShip: false,
        isDefeated: false,

        attack: function(me, target) {
            me.health -= target.enemyPwr;
            target.health -= me.attackValue;
            me.attackValue += me.attackPwr;

            // keep health at 0 if they go negative
            if (target.health < 0) {
                target.health = 0;
                $(".attack").empty();
            }
            if (me.health < 0) {
                me.health = 0;
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

    gameInit();

    function gameInit() {
        //empty out sections
        $(".my-ship").empty();
        $(".enemy-ship").empty();
        $(".target-ship").empty();
        $(".attack").empty();

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

        // create an awing
        var awing = Object.create(Ship);
        awing.name = "A-Wing";
        awing.valueEl = "awing";
        awing.enemyPwr = 10;
        awing.attackPwr = 3;
        awing.attackValue = 3;
        awing.image = "assets/img/awing.png";
        //create a xwing
        var xwing = Object.create(Ship);
        xwing.name = "X-Wing";
        xwing.valueEl = "xwing";
        xwing.enemyPwr = 15;
        xwing.attackPwr = 4;
        xwing.attackValue = 4;
        xwing.image = "assets/img/xwing.png";
        //create a ywing
        var ywing = Object.create(Ship);
        ywing.name = "Y-Wing";
        ywing.valueEl = "ywing";
        ywing.enemyPwr = 20;
        ywing.attackPwr = 5;
        ywing.attackValue = 5;
        ywing.image = "assets/img/ywing.png";
        //create an tieln
        var tieln = Object.create(Ship);
        tieln.name = "TIE/LN";
        tieln.valueEl = "tieln";
        tieln.enemyPwr = 5;
        tieln.attackPwr = 3;
        tieln.attackValue = 3;
        tieln.image = "assets/img/tieln.png";
        //create an tieadv
        var tieadv = Object.create(Ship);
        tieadv.name = "TIE Adv";
        tieadv.valueEl = "tieadv";
        tieadv.enemyPwr = 25;
        tieadv.attackPwr = 4;
        tieadv.attackValue = 4;
        tieadv.image = "assets/img/tieadv.png";

        // put ships in an array to make them iterable
        var ships = [awing, xwing, ywing, tieln, tieadv];
        // create ship elements under the choose-ship section
        $(".choose-ship").append(chooseHeaderDiv);
        ships.forEach(function(s) {
            $(".choose-ship").append(s.createShipEl());
        });

        // set boolean - True if choice is for my ship (which it is in the is case) or False if enemy ship
        var isMyShipChoice = true;
        clickMe();

        // click function to choose ship, on click chooses your ship, puts others in enemy section
        function clickMe() {
            $(".click-me").click(function() {
                console.log(this.value, " ", isMyShipChoice);
                switch (this.value) {
                    case "awing":
                        if (isMyShipChoice) {
                            awing.isMyShip = true;
                            console.log(awing.name + " is the ship.");
                        } else {
                            awing.isTargetShip = true;
                        }
                        break;
                    case "xwing":
                        if (isMyShipChoice) {
                            xwing.isMyShip = true;
                            console.log(xwing.name + " is the ship.");
                        } else {
                            xwing.isTargetShip = true;
                        }
                        break;
                    case "ywing":
                        if (isMyShipChoice) {
                            ywing.isMyShip = true;
                            console.log(ywing.name + " is the ship.");
                        } else {
                            ywing.isTargetShip = true;
                        }
                        break;
                    case "tieln":
                        if (isMyShipChoice) {
                            tieln.isMyShip = true;
                            console.log(tieln.name + " is the ship.");
                        } else {
                            tieln.isTargetShip = true;
                        }
                        break;
                    case "tieadv":
                        if (isMyShipChoice) {
                            tieadv.isMyShip = true;
                            console.log(tieadv.name + " is the ship.");
                        } else {
                            tieadv.isTargetShip = true;
                        }
                        break;
                }
                if (isMyShipChoice) {
                    myShipChosen();
                } else {
                    targetChosen();
                    console.log("still running?");
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
            $(enemyShipHeaderDiv).text("Choose the next target!");
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
            // find the ship targeted
            ships.forEach(function(s) {
                if (s.isTargetShip) {
                    // put the targeted ship in the target div
                    var targetedShipEl = s.createShipEl();
                    targetedShipEl.removeClass("click-me");
                    $(".target-ship").append(targetedShipEl);
                }
            });
            // empty enemy ship element
            $(".enemy-ship").empty();
            $(".enemy-ship").append(enemyShipHeaderDiv);
            $(".enemy-ship>.section-header").text("Enemy ship targeted!");

            // remove click-me classes from enemy ships so you cant click on them
            ships.forEach(function(s) {
                if (!s.isTargetShip && !s.isDefeated && !s.isMyShip) {
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

            attackTar();
        }

        function attackTar() {
            $(".attack-btn").click(function() {
                // get target and my ship
                var myShip;
                var enemyShip;
                ships.forEach(function(s) {
                    if (s.isMyShip) {
                        myShip = s;
                    } else if (s.isTargetShip) {
                        enemyShip = s;
                    }
                });
                // run attack function in Ship object
                Ship.attack(myShip, enemyShip);

                // log out results for testing
                console.log(
                    "My ship: " +
                        myShip.health +
                        " " +
                        myShip.attackPwr +
                        " " +
                        myShip.attackValue
                );
                console.log(
                    "Enemy ship: " + enemyShip.health + " " + enemyShip.enemyPwr
                );

                // update health values in div
                $(".target-ship>.img-container>.ship-health").text(
                    enemyShip.health
                );
                $(".my-ship>.img-container>.ship-health").text(myShip.health);

                // create a text-box for win/loss message
                var textBox = $("<div>").addClass("text-box");
                // check if either ship health is 0
                if (myShip.health === 0) {
                    $(".main-section").animate({opacity: ".1"}), 7500;
                    $(textBox).text("You LOSE!!");
                    $("body").append(textBox);
                }
                if (enemyShip.health === 0) {
                    enemyShip.isDefeated = true;
                    enemyShip.isTargetShip = false;
                    // explosion then remove ship
                    $(".target-ship>.img-container>img").attr(
                        "src",
                        "assets/img/explosion.png"
                    );
                    $(".target-ship").fadeOut(750);
                    
                    // check how many ships are still alive
                    var countNotDead = 0;
                    ships.forEach(function(s) {
                        if (!s.isDefeated && !s.isMyShip) {
                            countNotDead++;
                        }
                    });
                    // check win/loss conditions
                    if (countNotDead > 0) {
                        selectEnemy();
                    } else {
                        $(".main-section").animate({opacity: ".1"}), 7500;
                        $(textBox).text("You WIN!! Thanks for playing!")
                        $("body").append(textBox);
                    }
                }
            });
        }
    }
});
