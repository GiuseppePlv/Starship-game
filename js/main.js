App = Ember.Application.create();
App.Router.map(function () {
    //this.route('index',{path:'/'})
});
App.IndexRoute = Ember.Route.extend({

});

App.FormatValueHelper = Ember.Helper.helper(function (value) {
    var key = value[0];
    var list = value[1]
    return list[key];
})

//set controller
App.IndexController = Ember.Controller.extend({
    ajaxCall: null,
    urlCount: 0,
    peoplePageNumer: 1,
    startShipPageNumber: 3,
    buttonText: 'Start Game',
    userWinCount: 0,
    startShipWinCount: 0,
    // load people from swapi
    loadPeople(callback) {
        var that = this;
        $.ajax('http://swapi.dev/api/people/' + that.get('peoplePageNumer'))
            .then(function (response) {
                that.set("userlist", response)
                if (response.starships) {
                    that.starShipUrl = response.starships;
                }
                // fix unknown mass
                var fixMass = response;
                Array.prototype.removeValue = function(name, value){
                   var array = $.map(this, function(v,i){
                      return v[name] === value ? null : v;
                   });
                   this.length = 0; 
                   this.push.apply(this, array);
                }
               // fixMass.removeValue('mass', 'unknown');

                var randomNumber = Math.floor(Math.random() * response.length);
                that.set('currentUser', response[randomNumber])


                var nextPage = response.count - (that.get('peoplePageNumer') * 10);
                if (nextPage <= 10) {
                    that.set('peoplePageNumer', 1)
                } else {
                    that.set('peoplePageNumer', that.get('peoplePageNumer') + 1)
                }
                callback()
            })
    },
    // load starship from swapi
    loadStarShip(callback) {
        var that = this;
        let starShipPage;
        let formatPage;
        if (that.starShipUrl && that.starShipUrl.length > 0) {
            starShipPage = that.starShipUrl[0].split('/');
            formatPage = starShipPage[starShipPage.length - 2];
        } else {
            formatPage = 2;
        }
        $.ajax('http://swapi.dev/api/starships/' + formatPage).then(function (response) {
            that.set("startshipList", response);
            // fix unknown crew
            var fixCrew = response;
            Array.prototype.removeValue = function(name, value){
               var array = $.map(this, function(v,i){
                  return v[name] === value ? null : v;
               });
               this.length = 0; 
               this.push.apply(this, array);
            }
            // fixCrew.removeValue('crew', 'unknown');

            var randomNumber = Math.floor(Math.random() * response.length);
            that.set('currentStartship', response[randomNumber])
            var nextPage = response.count - (that.get('startShipPageNumber') * 10);
            if (nextPage <= 10) {
                that.set('startShipPageNumber', 1)
            } else {
                that.set('startShipPageNumber', that.get('startShipPageNumber') + 1)
            }
            callback();
        })
    },
    loadData() {
        var that = this;
        that.loadPeople(function () {
            that.loadStarShip(function () {
                that.checkWinner();
            })
        })

    },
    // start game
    startGame() {
        var that = this;
        that.set('loadingBar', true)
        that.set('urlCount', 1);
        that.loadData();
    },
    // check winner
    checkWinner() {
        var that = this;
        var winner = {}
        var userWinCount = that.get('userWinCount')
        var startShipWinCount = that.get('startShipWinCount')
        if (parseInt(that.get('userlist').mass) && parseInt(that.get('startshipList').crew)) {
            if (parseInt(that.get('userlist').mass) > parseInt(that.get('startshipList').crew)) {
                winner.message = 'Player 1 win the game';

                winner.chip = 'player1';
                winner.badge1 = 'display:block';
                winner.badge2 = 'display:none';

                that.set('userWinCount', userWinCount + 1);
                winner.user = that.get('currentUser')
            } else {
                winner.message = 'Player 2 win the game';

                winner.chip = 'player2'
                winner.badge1 = 'display:none';
                winner.badge2 = 'display:block'
                that.set('startShipWinCount', startShipWinCount + 1);
                winner.user = that.get('currentStartship')
            }
            winner.errorType = 'info'
        } else {
            winner.message = 'Both Should be number'
            winner.errorType = 'warning'
        }
        that.set('winner', winner);
        that.set('buttonText', 'Play Again');
        that.set('loadingBar', false)

    }
})

//Tests all the function exsist --> tests.js
loadPeople = function(){};
loadStarShip = function(){};
loadData = function(){};
startGame = function(){};
checkWinner = function(){};
