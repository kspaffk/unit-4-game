$(document).ready(function() {
// set variables

// ship objects and functions for ship manipulation
    var Ship = {
            name: "",
            health: 250,
            attackPwr: 0,
            enemyPwr: 0,
            image: "",

        attack: function () {
            ship.enemyShip.health -= ship.myShip.attackPwr;
            ship.myShip.health -= ship.enemyShip.attackPwr;
            ship.myShip.attackPwr += ship.ship.attackPwr;
        },

        createShipEl: function() {
            var shipEl = $("<div>").addClass("img-container");
            var shipNameEl = $("<div>").addClass("ship-name").text(this.name);
            var shipHealthEl = $("<div>").addClass("ship-health").text(this.health);
            shipEl.append("<img src='" + this.image + "' alt='" + this.name + "'>");
            shipEl.append(shipNameEl);
            shipEl.append(shipHealthEl);
            return shipEl;
        },
    };

    function gameInit() {
        // create an awing
        var awing = Object.create(Ship);
        awing.name = "A-Wing";
        awing.attackPwr = 3;
        awing.enemyPwr = 10;
        awing.image = "assets/img/awing.png";
        //create an xwing
        var xwing = Object.create(Ship);
        xwing.name = "X-Wing";
        xwing.attackPwr = 4;
        xwing.enemyPwr = 20;
        xwing.image = "assets/img/xwing.png";


        var ships = [awing, xwing];

        ships.forEach(function(item){
            $(".choose-ship").append(item.createShipEl());
        });
    }

    $(".attack-btn").click(function() {
        console.log("button-clicked");
        gameInit();
    });
});