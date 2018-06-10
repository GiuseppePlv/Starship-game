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
    startShipPageNumer: 4,
    buttonText: 'Start Game',
    userWinCount: 0,
    startShipWinCount: 0,
    // load people from swapi
    loadPeople(callback) {
        var that = this;
        $.ajax('https://swapi.co/api/people/.json?page=' + that.get('peoplePageNumer'))
            .then(function (response) {
                that.set("userlist", response.results)
                var randomNumber = Math.floor(Math.random() * response.results.length);
                that.set('currentUser', response.results[randomNumber])
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
        $.ajax('https://swapi.co/api/starships/.json?page=' + that.get('startShipPageNumer')).then(function (response) {
            that.set("startshipList", response.results);
            var randomNumber = Math.floor(Math.random() * response.results.length);
            that.set('currentStartship', response.results[randomNumber])
            var nextPage = response.count - (that.get('startShipPageNumer') * 10);
            if (nextPage <= 10) {
                that.set('startShipPageNumer', 1)
            } else {
                that.set('startShipPageNumer', that.get('startShipPageNumer') + 1)
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
        if (that.urlCount == 0 || that.urlCount == 10) {
            that.set('urlCount', 1);
            that.loadData();
        } else {
            that.set('urlCount', that.urlCount + 1);
            that.set('currentUser', that.get('userlist')[Math.floor(Math.random() * that.get('userlist').length)])
            that.set('currentStartship', that.get('startshipList')[Math.floor(Math.random() * that.get('startshipList').length)])
            that.checkWinner();
        }

    },
    // check winner
    checkWinner() {
        var that = this;
        var winner = {}
        var userWinCount = that.get('userWinCount')
        var startShipWinCount = that.get('startShipWinCount')
        if (parseInt(that.get('currentUser').mass) && parseInt(that.get('currentStartship').crew)) {
            if (parseInt(that.get('currentUser').mass) > parseInt(that.get('currentStartship').crew)) {
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
