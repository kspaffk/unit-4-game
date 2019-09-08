$(document).ready(function() {
    // set variables

    // ship objects and functions for ship manipulation
    var Ship = {
        name: "",
        valueEl: "",
        health: 250,
        attackPwr: 0,
        enemyPwr: 0,
        image: "",
        isMyShip: false,
        isTargetShip: false,
        isDefeated: false,

        attack: function(myShip, enemyShip) {
            myShip.health -= enemyShip.attackPwr;
            enemyShip.health -= myShip.attackPwr;
            myShip.attackPwr += myShip.attackPwr;
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

    function gameInit() {
        //empty out sections
        $(".my-ship").empty();
        $(".enemy-ship").empty();
        $(".target-ship").empty();
        $(".attack").empty();

        // create an awing
        var awing = Object.create(Ship);
        awing.name = "A-Wing";
        awing.valueEl = "awing";
        awing.attackPwr = 3;
        awing.enemyPwr = 10;
        awing.image = "assets/img/awing.png";
        //create a xwing
        var xwing = Object.create(Ship);
        xwing.name = "X-Wing";
        xwing.valueEl = "xwing";
        xwing.attackPwr = 4;
        xwing.enemyPwr = 15;
        xwing.image = "assets/img/xwing.png";
        //create a ywing
        var ywing = Object.create(Ship);
        ywing.name = "Y-Wing";
        ywing.valueEl = "ywing";
        ywing.attackPwr = 5;
        ywing.enemyPwr = 20;
        ywing.image = "assets/img/ywing.png";
        //create an tieln
        var tieln = Object.create(Ship);
        tieln.name = "TIE/LN";
        tieln.valueEl = "tieln";
        tieln.attackPwr = 3;
        tieln.enemyPwr = 5;
        tieln.image = "assets/img/tieln.png";
        //create an tieadv
        var tieadv = Object.create(Ship);
        tieadv.name = "TIE Adv";
        tieadv.valueEl = "tieadv";
        tieadv.attackPwr = 4;
        tieadv.enemyPwr = 25;
        tieadv.image = "assets/img/tieadv.png";

        // put ships in an array to make them iterable
        var ships = [awing, xwing, ywing, tieln, tieadv];
        // create ship elements under the choose-ship section
        var chooseHeaderDiv = $("<div>")
            .addClass("section-header")
            .text("Choose your ship!");
        $(".choose-ship").append(chooseHeaderDiv);
        ships.forEach(function(s) {
            $(".choose-ship").append(s.createShipEl());
        });

        // set boolean - True if choice is for my ship (which it is in the is case) or False if enemy ship
        var isMyShipChoice = true;
        clickMe();


        // inital ship choice, on click chooses your ship, puts others in enemy section
        function clickMe() {
            $(".click-me").click(function() {
                console.log(this.value);
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
                }
            });
        }

        function myShipChosen() {
            // remove the choose ship div
            $(".choose-ship").empty();
            // add header to my ship div
            var myShipHeaderDiv = $("<div>")
                .addClass("section-header")
                .text("Your Ship");
            $(".my-ship").append(myShipHeaderDiv);
            // add header to enemy ships div
            var enemyShipHeaderDiv = $("<div>")
                .addClass("section-header")
                .text("Select an enemy ship!");
            $(".enemy-ship").append(enemyShipHeaderDiv);

            // add enemy ships to my ship and enemy sections
            ships.forEach(function(s) {
                if (s.isMyShip) {
                    // remove ability to click on the ship and append to my ship section
                    var myShip = s.createShipEl();
                    myShip.removeClass("click-me");
                    $(".my-ship").append(myShip);
                } else {
                    // append enemy ships to enemy ship section
                    $(".enemy-ship").append(s.createShipEl());
                }
            });
            selectEnemy();
        }

        function selectEnemy() {
            // when calling the clickMe function need to set isMyShipChoice to false so that it knows it is an enemy ship selection
            isMyShipChoice = false;
            // call the clickMe function to get enemy ship
            clickMe();
        }

        function targetChosen () {
            var targetShipHeaderDiv = $("<div>")
                .addClass("section-header")
                .text("Locked ON!");
            $(".target-ship").append(targetShipHeaderDiv);

            // find the ship targeted
            ships.forEach(function(s){
                if (s.isTargetShip) {
                    // put the targeted ship in the target div
                    var targetShip = s.createShipEl();
                    targetShip.removeClass("click-me");
                    $(".target-ship").append(targetShip);
                }
            });
            var attackBtn = $("<button>").addClass("attack-btn").text("Attack!");
            $(".attack").append(attackBtn);
        }
    }
    gameInit();
});
