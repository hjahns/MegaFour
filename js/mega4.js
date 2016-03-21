var megaFour = function () {
    var self = this;
    this.dimensions = 4;
    this.values = [];
    this.activePlayer = 1;
    this.$activePlayer = $('#activePlayer');
    this.initValues = function () {
        for (var x = 1; x <= self.dimensions; x++) {
            self.values[x] = [];
            for (var y = 1; y <= self.dimensions; y++) {
                self.values[x][y] = [];
                for (var z = 1; z <= self.dimensions; z++) {
                    self.values[x][y][z] = {
                        player: 0,
                        value: false
                    }
                }
            }
        }
    };
    this.clearValues = function () {
        //clear in megaFour obj
        for (var x = 1; x <= self.dimensions; x++) {
            for (var y = 1; y <= self.dimensions; y++) {
                for (var z = 1; z <= self.dimensions; z++) {
                    self.values[x][y][z] = {
                        player: 0,
                        value: false
                    }
                }
            }
        }
        //clear in babylon scene
        for (var i = 0; i < scene.meshes.length; i++) {
            scene.meshes[i].material.alpha = 0.5;
            var colorObj = scene.meshes[i].material.diffuseColor;
            colorObj.r = 170 / 255;
            colorObj.g = 170 / 255;
            colorObj.b = 170 / 255;
        }

    }
    this.check = function () {
        //check x
        for (var y = 1; y <= self.dimensions; y++) {
            for (var z = 1; z <= self.dimensions; z++) {
                if (
                    self.values[1][y][z].value == true && self.values[1][y][z].player == self.activePlayer &&
                        self.values[2][y][z].value == true && self.values[2][y][z].player == self.activePlayer &&
                        self.values[3][y][z].value == true && self.values[3][y][z].player == self.activePlayer &&
                        self.values[4][y][z].value == true && self.values[4][y][z].player == self.activePlayer
                    ) {
                    self.win();
                }
            }
        }
        //check y
        for (var x = 1; x <= self.dimensions; x++) {
            for (var z = 1; z <= self.dimensions; z++) {
                if (
                    self.values[x][1][z].value == true && self.values[x][1][z].player == self.activePlayer &&
                        self.values[x][2][z].value == true && self.values[x][2][z].player == self.activePlayer &&
                        self.values[x][3][z].value == true && self.values[x][3][z].player == self.activePlayer &&
                        self.values[x][4][z].value == true && self.values[x][4][z].player == self.activePlayer
                    ) {
                    self.win();
                }
            }
        }
        //check z
        for (var x = 1; x <= self.dimensions; x++) {
            for (var y = 1; y <= self.dimensions; y++) {
                if (
                    self.values[x][y][1].value == true && self.values[x][y][1].player == self.activePlayer &&
                        self.values[x][y][2].value == true && self.values[x][y][2].player == self.activePlayer &&
                        self.values[x][y][3].value == true && self.values[x][y][3].player == self.activePlayer &&
                        self.values[x][y][4].value == true && self.values[x][y][4].player == self.activePlayer
                    ) {
                    self.win();
                }
            }
        }
        //check dia z/x
        for (var y = 1; y <= self.dimensions; y++) {
            if (
                self.values[1][y][1].value == true && self.values[1][y][1].player == self.activePlayer &&
                    self.values[2][y][2].value == true && self.values[2][y][2].player == self.activePlayer &&
                    self.values[3][y][3].value == true && self.values[3][y][3].player == self.activePlayer &&
                    self.values[4][y][4].value == true && self.values[4][y][4].player == self.activePlayer
                    ||
                    self.values[1][y][4].value == true && self.values[1][y][4].player == self.activePlayer &&
                        self.values[2][y][3].value == true && self.values[2][y][3].player == self.activePlayer &&
                        self.values[3][y][2].value == true && self.values[3][y][2].player == self.activePlayer &&
                        self.values[4][y][1].value == true && self.values[4][y][1].player == self.activePlayer
                ) {
                self.win();
            }
        }
        //check dia y/x
        for (var z = 1; z <= self.dimensions; z++) {
            if (
                self.values[1][1][z].value == true && self.values[1][1][z].player == self.activePlayer &&
                    self.values[2][2][z].value == true && self.values[2][2][z].player == self.activePlayer &&
                    self.values[3][3][z].value == true && self.values[3][3][z].player == self.activePlayer &&
                    self.values[4][4][z].value == true && self.values[4][4][z].player == self.activePlayer
                    ||
                    self.values[1][4][z].value == true && self.values[1][4][z].player == self.activePlayer &&
                        self.values[2][3][z].value == true && self.values[2][3][z].player == self.activePlayer &&
                        self.values[3][2][z].value == true && self.values[3][2][z].player == self.activePlayer &&
                        self.values[4][1][z].value == true && self.values[4][1][z].player == self.activePlayer
                ) {
                self.win();
            }
        }
        //check dia y/z
        for (var x = 1; x <= self.dimensions; x++) {
            if (
                self.values[x][1][1].value == true && self.values[x][1][1].player == self.activePlayer &&
                    self.values[x][2][2].value == true && self.values[x][2][2].player == self.activePlayer &&
                    self.values[x][3][3].value == true && self.values[x][3][3].player == self.activePlayer &&
                    self.values[x][4][4].value == true && self.values[x][4][4].player == self.activePlayer
                    ||
                    self.values[x][1][4].value == true && self.values[x][1][4].player == self.activePlayer &&
                        self.values[x][2][3].value == true && self.values[x][2][3].player == self.activePlayer &&
                        self.values[x][3][2].value == true && self.values[x][3][2].player == self.activePlayer &&
                        self.values[x][4][1].value == true && self.values[x][4][1].player == self.activePlayer
                ) {
                self.win();
            }
        }
        //check dia x/y/z
        if (
            self.values[1][1][1].value == true && self.values[1][1][1].player == self.activePlayer &&
                self.values[2][2][2].value == true && self.values[2][2][2].player == self.activePlayer &&
                self.values[3][3][3].value == true && self.values[3][3][3].player == self.activePlayer &&
                self.values[4][4][4].value == true && self.values[4][4][4].player == self.activePlayer
            ) {
            self.win();
        }
        if (
            self.values[1][4][4].value == true && self.values[1][4][4].player == self.activePlayer &&
                self.values[2][3][3].value == true && self.values[2][3][3].player == self.activePlayer &&
                self.values[3][2][2].value == true && self.values[3][2][2].player == self.activePlayer &&
                self.values[4][1][1].value == true && self.values[4][1][1].player == self.activePlayer
            ) {
            self.win();
        }
        if (
            self.values[4][4][1].value == true && self.values[4][4][1].player == self.activePlayer &&
                self.values[3][3][2].value == true && self.values[3][3][2].player == self.activePlayer &&
                self.values[2][2][3].value == true && self.values[2][2][3].player == self.activePlayer &&
                self.values[1][1][4].value == true && self.values[1][1][4].player == self.activePlayer
            ) {
            self.win();
        }
        if (
            self.values[4][1][4].value == true && self.values[4][1][4].player == self.activePlayer &&
                self.values[3][2][3].value == true && self.values[3][2][3].player == self.activePlayer &&
                self.values[2][3][2].value == true && self.values[2][3][2].player == self.activePlayer &&
                self.values[1][4][1].value == true && self.values[1][4][1].player == self.activePlayer
            ) {
            self.win();
        }
    }
    this.win = function () {
        var current = $('#winsPlayer' + self.activePlayer).html();
        $('#winsPlayer' + self.activePlayer).html(++current);
        alert('Player ' + self.activePlayer + ' won!');
        self.clearValues();
    }
    this.valueFactory = function (player, value) {
        return {
            player: player,
            value: value
        }
    }
    this.switchPlayer = function () {
        if (self.activePlayer == 1) {
            self.activePlayer = 2;
        } else {
            self.activePlayer = 1;
        }
        self.$activePlayer.html(self.activePlayer);
    }
    this.action = function (x, y, z, obj) {
        //check if field is already set
        if (!self.valueIsSet(x, y, z)) {
            obj.pickedMesh.material.alpha = 1;
            self.setColor(obj.pickedMesh.material.diffuseColor);
            self.values[x][y][z] = self.valueFactory(self.activePlayer, true);
            self.check();
            self.switchPlayer();
        } else {
            alert("picked already");
        }
    }
    this.setColor = function (colorObj) {
        if (self.activePlayer == 1) {
            colorObj.r = 255 / 255;
            colorObj.g = 204 / 255;
            colorObj.b = 51 / 255
        } else {
            colorObj.r = 51 / 255;
            colorObj.g = 102 / 255;
            colorObj.b = 255 / 255
        }
    }
    this.valueIsSet = function (x, y, z) {
        var valueObj = self.values[x][y][z];
        if (valueObj.value == true) {
            return true;
        } else {
            return false;
        }
    }
    this.initValues();
};
var megaFour = new megaFour();
