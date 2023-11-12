/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createLeaderboard = exports.createPlayersList = exports.createPlayerInput = void 0;
function getElement(tagName, content) {
  var element = document.createElement(tagName);
  if (content) {
    element.innerText = content;
  }
  return element;
}
function createPlayerInput() {
  var playerInputDiv = getElement('div');
  playerInputDiv.id = 'playerInputDiv';
  var playerInputTextarea = getElement('textarea');
  playerInputTextarea.id = 'playerInputTextarea';
  playerInputDiv.appendChild(playerInputTextarea);
  return playerInputDiv;
}
exports.createPlayerInput = createPlayerInput;
function createPlayersList(players) {
  var div = getElement('div');
  players.forEach(function (player) {
    var playerdiv = getElement('div', player.name);
    div.appendChild(playerdiv);
  });
  return div;
}
exports.createPlayersList = createPlayersList;
function createLeaderboard(group, round) {
  var leaderboard = getElement('div');
  leaderboard.classList.add('leaderboard');
  group.players.forEach(function (player, rank) {
    var _player$rounds$find;
    var playerRow = getElement('div');
    playerRow.classList.add('playerRow');
    var rankDiv = getElement('div', (rank + 1).toString());
    rankDiv.classList.add('rank');
    playerRow.appendChild(rankDiv);
    var nameDiv = getElement('div', player.name);
    nameDiv.classList.add('name');
    playerRow.appendChild(nameDiv);
    var playerPoints = ((_player$rounds$find = player.rounds.find(function (r) {
      return r.round === round;
    })) === null || _player$rounds$find === void 0 ? void 0 : _player$rounds$find.points.toString()) || '0';
    var pointsDiv = getElement('div', playerPoints);
    pointsDiv.classList.add('points');
    pointsDiv.contentEditable = 'true';
    pointsDiv.setAttribute('data-player', player.id.toString());
    playerRow.appendChild(pointsDiv);
    leaderboard.appendChild(playerRow);
  });
  return leaderboard;
}
exports.createLeaderboard = createLeaderboard;

/***/ }),

/***/ "./src/groupSetups.ts":
/*!****************************!*\
  !*** ./src/groupSetups.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = {
  6: [{
    3: 2,
    4: 0,
    total: 2
  }],
  7: [{
    3: 1,
    4: 1,
    total: 2
  }],
  8: [{
    3: 0,
    4: 2,
    total: 2
  }],
  9: [{
    3: 3,
    4: 0,
    total: 3
  }],
  10: [{
    3: 2,
    4: 1,
    total: 3
  }],
  11: [{
    3: 1,
    4: 2,
    total: 3
  }],
  12: [{
    3: 0,
    4: 3,
    total: 3
  }, {
    3: 4,
    4: 0,
    total: 4
  }],
  13: [{
    3: 3,
    4: 1,
    total: 4
  }],
  14: [{
    3: 2,
    4: 2,
    total: 4
  }],
  15: [{
    3: 1,
    4: 3,
    total: 4
  }, {
    3: 5,
    4: 0,
    total: 5
  }],
  16: [{
    3: 0,
    4: 4,
    total: 4
  }, {
    3: 4,
    4: 1,
    total: 5
  }],
  17: [{
    3: 3,
    4: 2,
    total: 5
  }],
  18: [{
    3: 2,
    4: 3,
    total: 5
  }, {
    3: 6,
    4: 0,
    total: 6
  }],
  19: [{
    3: 1,
    4: 4,
    total: 5
  }, {
    3: 5,
    4: 1,
    total: 6
  }],
  20: [{
    3: 0,
    4: 5,
    total: 5
  }, {
    3: 4,
    4: 2,
    total: 6
  }],
  21: [{
    3: 3,
    4: 3,
    total: 6
  }, {
    3: 7,
    4: 0,
    total: 7
  }],
  22: [{
    3: 2,
    4: 4,
    total: 6
  }, {
    3: 6,
    4: 1,
    total: 7
  }],
  23: [{
    3: 1,
    4: 5,
    total: 6
  }, {
    3: 5,
    4: 2,
    total: 7
  }],
  24: [{
    3: 0,
    4: 6,
    total: 6
  }, {
    3: 4,
    4: 3,
    total: 7
  }, {
    3: 8,
    4: 0,
    total: 8
  }],
  25: [{
    3: 3,
    4: 4,
    total: 7
  }, {
    3: 7,
    4: 1,
    total: 8
  }],
  26: [{
    3: 2,
    4: 5,
    total: 7
  }, {
    3: 6,
    4: 2,
    total: 8
  }],
  27: [{
    3: 1,
    4: 6,
    total: 7
  }, {
    3: 5,
    4: 3,
    total: 8
  }, {
    3: 9,
    4: 0,
    total: 9
  }],
  28: [{
    3: 0,
    4: 7,
    total: 7
  }, {
    3: 4,
    4: 4,
    total: 8
  }, {
    3: 8,
    4: 1,
    total: 9
  }],
  29: [{
    3: 3,
    4: 5,
    total: 8
  }, {
    3: 7,
    4: 2,
    total: 9
  }],
  30: [{
    3: 2,
    4: 6,
    total: 8
  }, {
    3: 6,
    4: 3,
    total: 9
  }, {
    3: 10,
    4: 0,
    total: 10
  }],
  31: [{
    3: 1,
    4: 7,
    total: 8
  }, {
    3: 5,
    4: 4,
    total: 9
  }, {
    3: 9,
    4: 1,
    total: 10
  }],
  32: [{
    3: 0,
    4: 8,
    total: 8
  }, {
    3: 4,
    4: 5,
    total: 9
  }, {
    3: 8,
    4: 2,
    total: 10
  }],
  33: [{
    3: 3,
    4: 6,
    total: 9
  }, {
    3: 7,
    4: 3,
    total: 10
  }],
  34: [{
    3: 2,
    4: 7,
    total: 9
  }, {
    3: 6,
    4: 4,
    total: 10
  }, {
    3: 10,
    4: 1,
    total: 11
  }],
  35: [{
    3: 1,
    4: 8,
    total: 9
  }, {
    3: 5,
    4: 5,
    total: 10
  }, {
    3: 9,
    4: 2,
    total: 11
  }],
  36: [{
    3: 0,
    4: 9,
    total: 9
  }, {
    3: 4,
    4: 6,
    total: 10
  }, {
    3: 8,
    4: 3,
    total: 11
  }],
  37: [{
    3: 3,
    4: 7,
    total: 10
  }, {
    3: 7,
    4: 4,
    total: 11
  }],
  38: [{
    3: 2,
    4: 8,
    total: 10
  }, {
    3: 6,
    4: 5,
    total: 11
  }, {
    3: 10,
    4: 2,
    total: 12
  }],
  39: [{
    3: 1,
    4: 9,
    total: 10
  }, {
    3: 5,
    4: 6,
    total: 11
  }, {
    3: 9,
    4: 3,
    total: 12
  }],
  40: [{
    3: 0,
    4: 10,
    total: 10
  }, {
    3: 4,
    4: 7,
    total: 11
  }, {
    3: 8,
    4: 4,
    total: 12
  }],
  41: [{
    3: 3,
    4: 8,
    total: 11
  }, {
    3: 7,
    4: 5,
    total: 12
  }],
  42: [{
    3: 2,
    4: 9,
    total: 11
  }, {
    3: 6,
    4: 6,
    total: 12
  }, {
    3: 10,
    4: 3,
    total: 13
  }],
  43: [{
    3: 1,
    4: 10,
    total: 11
  }, {
    3: 5,
    4: 7,
    total: 12
  }, {
    3: 9,
    4: 4,
    total: 13
  }],
  44: [{
    3: 4,
    4: 8,
    total: 12
  }, {
    3: 8,
    4: 5,
    total: 13
  }],
  45: [{
    3: 3,
    4: 9,
    total: 12
  }, {
    3: 7,
    4: 6,
    total: 13
  }],
  46: [{
    3: 2,
    4: 10,
    total: 12
  }, {
    3: 6,
    4: 7,
    total: 13
  }, {
    3: 10,
    4: 4,
    total: 14
  }],
  47: [{
    3: 5,
    4: 8,
    total: 13
  }, {
    3: 9,
    4: 5,
    total: 14
  }],
  48: [{
    3: 4,
    4: 9,
    total: 13
  }, {
    3: 8,
    4: 6,
    total: 14
  }],
  49: [{
    3: 3,
    4: 10,
    total: 13
  }, {
    3: 7,
    4: 7,
    total: 14
  }],
  50: [{
    3: 6,
    4: 8,
    total: 14
  }, {
    3: 10,
    4: 5,
    total: 15
  }],
  51: [{
    3: 5,
    4: 9,
    total: 14
  }, {
    3: 9,
    4: 6,
    total: 15
  }],
  52: [{
    3: 4,
    4: 10,
    total: 14
  }, {
    3: 8,
    4: 7,
    total: 15
  }],
  53: [{
    3: 7,
    4: 8,
    total: 15
  }],
  54: [{
    3: 6,
    4: 9,
    total: 15
  }, {
    3: 10,
    4: 6,
    total: 16
  }],
  55: [{
    3: 5,
    4: 10,
    total: 15
  }, {
    3: 9,
    4: 7,
    total: 16
  }],
  56: [{
    3: 8,
    4: 8,
    total: 16
  }],
  57: [{
    3: 7,
    4: 9,
    total: 16
  }],
  58: [{
    3: 6,
    4: 10,
    total: 16
  }, {
    3: 10,
    4: 7,
    total: 17
  }],
  59: [{
    3: 9,
    4: 8,
    total: 17
  }],
  60: [{
    3: 8,
    4: 9,
    total: 17
  }],
  61: [{
    3: 7,
    4: 10,
    total: 17
  }],
  62: [{
    3: 10,
    4: 8,
    total: 18
  }],
  63: [{
    3: 9,
    4: 9,
    total: 18
  }],
  64: [{
    3: 8,
    4: 10,
    total: 18
  }]
};

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var dom_1 = __webpack_require__(/*! ./dom */ "./src/dom.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
var groupSetups_1 = __importDefault(__webpack_require__(/*! ./groupSetups */ "./src/groupSetups.ts"));
var roundSetups_1 = __importDefault(__webpack_require__(/*! ./roundSetups */ "./src/roundSetups.ts"));
var exampleNames = ['Mario', 'Luigi', 'Peach', 'Daisy', 'Rosalina', 'Tanooki Mario', 'Cat Peach', 'Birdo', 'Yoshi', 'Toad', 'Koopa Troopa', 'Shy Guy', 'Lakitu', 'Toadette', 'King Boo', 'Petey Piranha', 'Baby Mario', 'Baby Luigi', 'Baby Peach', 'Baby Daisy', 'Baby Rosalina', 'Metal Mario', 'Pink Gold Peach', 'Wiggler', 'Wario', 'Waluigi', 'Donkey Kong', 'Bowser', 'Dry Bones', 'Bowser Jr.', 'Dry Bowser', 'Kamek', 'Lemmy', 'Larry', 'Wendy', 'Ludwig', 'Iggy', 'Roy', 'Morton', 'Peachette', 'Inkling Girl', 'Inkling Boy', 'Villager (male)', 'Villager (female)', 'Isabelle', 'Link', 'Diddy Kong', 'Funky Kong', 'Pauline', 'Zelda'];
var MarioKartTournament = /*#__PURE__*/function () {
  function MarioKartTournament() {
    _classCallCheck(this, MarioKartTournament);
    this.currentRound = 1;
    this.wrapper = document.getElementById('wrapper');
    this.setupHTML();
  }
  _createClass(MarioKartTournament, [{
    key: "setupHTML",
    value: function setupHTML() {
      var playerInputDiv = (0, dom_1.createPlayerInput)();
      this.wrapper.appendChild(playerInputDiv);
      this.playerInput = playerInputDiv.querySelector('textarea');
      this.attachListeners();
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {
      var _this = this;
      var _map = ['populatePlayers', 'round1', 'round2A', 'round2B', 'round3', 'round4'].map(function (id) {
          return document.getElementById(id);
        }),
        _map2 = _slicedToArray(_map, 6),
        populatePlayersBtn = _map2[0],
        round1Btn = _map2[1],
        round2ABtn = _map2[2],
        round2BBtn = _map2[3],
        round3Btn = _map2[4],
        round4Btn = _map2[5];
      populatePlayersBtn.addEventListener('click', function (e) {
        e.preventDefault();
        _this.players = (0, util_1.randomizeArray)(exampleNames).slice(0, 29).map(function (playerName, playerIndex) {
          return _this.parsePlayer(playerName, playerIndex);
        });
        // const playerList = <HTMLDivElement>createPlayersList(this.players);
        // this.wrapper.appendChild(playerList);
      });

      round1Btn.addEventListener('click', function (e) {
        e.preventDefault();
        _this.currentRound = 1;
        var round = _this.createRound(_this.currentRound);
        round.groups.forEach(function (group, groupIndex) {
          var leaderboard = (0, dom_1.createLeaderboard)(group, _this.currentRound);
          _toConsumableArray(leaderboard.querySelectorAll('.points')).forEach(function (pdiv) {
            return pdiv.addEventListener('blur', function (e) {
              var div = e.target;
              var score = parseInt(div.innerHTML, 10);
              var playerId = parseInt(div.getAttribute('data-player'), 10);
              var player = round.groups[groupIndex].players.find(function (player) {
                return player.id === playerId;
              });
              var playerRound = player.rounds.find(function (round) {
                return round.round === _this.currentRound;
              });
              if (!playerRound) {
                player.rounds.push({
                  round: _this.currentRound,
                  points: score
                });
              } else {
                playerRound.points = score;
              }
              console.log(round);
            });
          });
          _this.wrapper.appendChild(leaderboard);
        });
        console.log(round);
      });
      round2ABtn.addEventListener('click', function (e) {
        e.preventDefault();
        _this.currentRound = 2;
        var round = _this.createRound(_this.currentRound);
        console.log(round);
      });
      round2BBtn.addEventListener('click', function (e) {
        e.preventDefault();
        _this.currentRound = 3;
        var round = _this.createRound(_this.currentRound);
        console.log(round);
      });
      round3Btn.addEventListener('click', function (e) {
        e.preventDefault();
        _this.currentRound = 4;
        var round = _this.createRound(_this.currentRound);
        console.log(round);
      });
      round4Btn.addEventListener('click', function (e) {
        e.preventDefault();
      });
    }
  }, {
    key: "parsePlayer",
    value: function parsePlayer(playerName, playerId) {
      var player = {
        id: playerId,
        name: playerName,
        rounds: [],
        previousOpponents: []
      };
      return player;
    }
  }, {
    key: "getGroupSetupByNumberPlayers",
    value: function getGroupSetupByNumberPlayers(numberOfPlayers) {
      if (numberOfPlayers < 16 || numberOfPlayers > 32) {
        throw new Error('Number of players must be between 16 and 32');
      }
      return groupSetups_1["default"][numberOfPlayers].sort(function (a, b) {
        return a.total - b.total;
      })[0];
    }
  }, {
    key: "getRoundSetup",
    value: function getRoundSetup(roundNumber) {
      var roundNames = [{
        setupName: 'r1',
        name: 'Round 1'
      }, {
        setupName: 'r2a',
        name: 'Round 2A'
      }, {
        setupName: 'r2b',
        name: 'Round 2B'
      }, {
        setupName: 'r3',
        name: 'Semi Finale'
      }];
      var clampedNumPlayers = Math.max(Math.min(this.players.length, 32), 16);
      var roundsSetupForPlayers = roundSetups_1["default"].find(function (setup) {
        return setup.players === clampedNumPlayers;
      });
      var roundSetup = roundsSetupForPlayers.rounds[roundNames[roundNumber - 1].setupName];
      return roundSetup;
    }
  }, {
    key: "createRound",
    value: function createRound() {
      var roundNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var roundSetup = this.getRoundSetup(roundNumber);
      var playerGroups = this.createPlayerGroups(this.players, roundSetup.groupSetup, roundNumber);
      // Set which opponents encountered
      playerGroups.forEach(function (playerGroup) {
        var playerNames = playerGroup.map(function (p) {
          return p.name;
        });
        playerGroup.forEach(function (player) {
          var _player$previousOppon;
          player.previousOpponents = (_player$previousOppon = player.previousOpponents).concat.apply(_player$previousOppon, _toConsumableArray(playerNames.filter(function (p) {
            return p !== player.name;
          })));
        });
      });
      var round = {
        roundNumber: roundNumber,
        groupSetup: roundSetup.groupSetup,
        groups: playerGroups.map(function (playerGroup) {
          return {
            players: playerGroup,
            condition: roundSetup.condition
          };
        })
      };
      return round;
    }
  }, {
    key: "createPlayerGroups",
    value: function createPlayerGroups(players, groupSetup, roundNumber) {
      var playerGroups = [];
      var idx = 0;
      players.forEach(function (player) {
        return player.rounds.push({
          round: roundNumber,
          points: 0
        });
      });
      for (var i = 0; i < groupSetup[4]; i++) {
        playerGroups.push(players.slice(idx, idx += 4));
      }
      for (var _i = 0; _i < groupSetup[3]; _i++) {
        playerGroups.push(players.slice(idx, idx += 3));
      }
      return playerGroups;
    }
  }]);
  return MarioKartTournament;
}();
new MarioKartTournament();

/***/ }),

/***/ "./src/roundSetups.ts":
/*!****************************!*\
  !*** ./src/roundSetups.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = [{
  "players": 16,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 4,
        "4": 1
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 1
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 2,
        "4": 0
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 17,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 3,
        "4": 2
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 1
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 1,
        "4": 1
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 18,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 2,
        "4": 3
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 1
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 19,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 1,
        "4": 4
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 1
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 3,
        "4": 0
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 20,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 0,
        "4": 5
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 1
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 2,
        "4": 1
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 21,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 3,
        "4": 3
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 3
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 3,
        "4": 0
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 22,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 2,
        "4": 4
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 3
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 2,
        "4": 1
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 23,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 1,
        "4": 5
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 3
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 1,
        "4": 2
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 24,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 0,
        "4": 6
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 3
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 0,
        "4": 3
      },
      "condition": "2/round"
    },
    "r3": {
      "groupSetup": {
        "3": 0,
        "4": 2
      },
      "condition": "2/group"
    }
  }
}, {
  "players": 25,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 3,
        "4": 4
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 2
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 1,
        "4": 2
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}, {
  "players": 26,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 2,
        "4": 5
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 2
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 0,
        "4": 3
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}, {
  "players": 27,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 1,
        "4": 6
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 2
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 3,
        "4": 1
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}, {
  "players": 28,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 0,
        "4": 7
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 2,
        "4": 2
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 2,
        "4": 2
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}, {
  "players": 29,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 3,
        "4": 5
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 4
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 3,
        "4": 1
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}, {
  "players": 30,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 2,
        "4": 6
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 4
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 2,
        "4": 2
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}, {
  "players": 31,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 1,
        "4": 7
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 4
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 1,
        "4": 3
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}, {
  "players": 32,
  "rounds": {
    "r1": {
      "groupSetup": {
        "3": 0,
        "4": 8
      },
      "condition": "2/group"
    },
    "r2a": {
      "groupSetup": {
        "3": 0,
        "4": 4
      },
      "condition": "2/group"
    },
    "r2b": {
      "groupSetup": {
        "3": 0,
        "4": 4
      },
      "condition": "4/round"
    },
    "r3": {
      "groupSetup": {
        "3": 4,
        "4": 0
      },
      "condition": "1/group"
    }
  }
}];

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.randomizeArray = void 0;
function randomizeArray(array) {
  return array.sort(function (a, b) {
    return Math.random() > 0.5 ? 1 : -1;
  });
}
exports.randomizeArray = randomizeArray;

/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/index": 0,
/******/ 			"public/styles": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/styles"], () => (__webpack_require__("./src/index.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/styles"], () => (__webpack_require__("./src/styles.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;