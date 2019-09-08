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

    attack: function(myShip, enemyShip) {
      myShip.health -= enemyShip.attackPwr;
      enemyShip.health -= myShip.attackPwr;
      myShip.attackPwr += myShip.attackPwr;
    },

    createShipEl: function() {
      var shipEl = $("<div>")
        .addClass("img-container ")
        .prop("value", this.valueEl);
      var shipNameEl = $("<div>")
        .addClass("ship-name")
        .text(this.name);
      var shipHealthEl = $("<div>")
        .addClass("ship-health")
        .text(this.health);
      shipEl.append("<img src='" + this.image + "' alt='" + this.name + "'>");
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

    // inital ship choice, click chooses your ship, puts others in enemy section
    $(".img-container").click(function() {
      switch (this.value) {
        case "awing":
          awing.isMyShip = true;
          console.log(awing.name + " is my ship.");
          break;
        case "xwing":
          xwing.isMyShip = true;
          console.log(xwing.name + " is my ship.");
          break;
        case "ywing":
          ywing.isMyShip = true;
          console.log(ywing.name + " is my ship.");
          break;
        case "tieln":
          tieln.isMyShip = true;
          console.log(tieln.name + " is my ship.");
          break;
        case "tieadv":
          tieadv.isMyShip = true;
          console.log(tieadv.name + " is my ship.");
          break;
      }

      $(".choose-ship").empty();
      var myShipHeaderDiv = $("<div>")
        .addClass("section-header")
        .text("Your Ship");
      $(".my-ship").append(myShipHeaderDiv);
      var enemyShipHeaderDiv = $("<div>")
        .addClass("section-header")
        .text("Enemy Ships");
      $(".enemy-ship").append(enemyShipHeaderDiv);

      ships.forEach(function(s) {
        if (s.isMyShip) {
          $(".my-ship").append(s.createShipEl());
        } else {
          $(".enemy-ship").append(s.createShipEl());
        }
      });
      var attackBtn = $("<button>").addClass("attack-btn").text("Attack!");
      $(".attack").append(attackBtn);
    });
  }

  gameInit();
});
