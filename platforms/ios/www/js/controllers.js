angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, Words, TDCardDelegate, $ionicPopup,$ionicHistory, $state)// services inside ionic {
    $scope.neverseen = 0;
    $scope.knownword = 0;
    console.log('CARDS CTRL');



    $scope.init = function () { // downloading data and arrange it  
      Words.getlist;
      $scope.Cards = angular.fromJson(window.localStorage['words'] || '[]');
      $scope.numberofCards = $scope.Cards.length;
      $scope.cards = Array.prototype.slice.call($scope.Cards, 0);
      var alertPopup = $ionicPopup.alert({
        title: " tip !",
        template: "swip left if you know the word or right otherwise"
      });
    };


    $scope.cardDestroyed = function (index) { // deincrease number of  cards  

      $scope.numberofCards  = $scope.numberofCards - 1;
      if ($scope.numberofCards === 0) {
        if ($scope.knownword > $scope.neverseen) {
          var confirmPopup = $ionicPopup.confirm({
            title: 'great !',
            template: 'great you can start the quiz now'
          });
          confirmPopup.then(function (res) {
            if (res) {
              console.log('You are sure');
              $state.go('tab.account');
            } else {
              console.log('You are not sure');
            }
          });
        }
        else {
          var confirmPopup = $ionicPopup.confirm({
            title: 'ok !',
            template: 'there are so more words that you do not know but you still can take the quiz !'
          });
          confirmPopup.then(function (res) {
            if (res) {
              $ionicHistory.clearCache().then(function(){ $state.go('tab.account') })

            } else {
              console.log('You are not sure');
            }
          });
        }
      }
    };

    $scope.addCard = function () { // add card form array randomly 
      var newCard = $scope.Cards[Math.floor(Math.random() * $scope.Cards.length)]; // we are using this array scope.cards 
      newCard.id = Math.random(); // add new card 
      $scope.cards.push(angular.extend({}, newCard)); // push a new card into scope.cards 
    };

    $scope.cardSwipedLeft = function (index) {
      $scope.knownword = $scope.knownword + 1;
      $scope.cards.splice(index, 1); // splice deletes the card that swapted left from array 
      $scope.addCard();
      console.log('LEFT SWIPE');
      console.log('cards :' + $scope.cards.length);
    };
    $scope.cardSwipedRight = function (index) {
      $scope.neverseen = $scope.neverseen + 1;
      console.log($scope.knownword);
      console.log('RIGHT SWIPE');
      $scope.cards.splice(index, 1);
      $scope.addCard();
    };
  })

  .controller('ChatsCtrl', function ($scope, Words) {
    $scope.card = {};

    $scope.addWord = function () {
      console.log("to add  :");
      Words.add($scope.card);
      $scope.card = {};
    };


  })


  .controller('CardsCtrl', function () {


  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, $ionicPopup) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope, Words,$state,$ionicPopup,$ionicHistory) {

    $scope.init = function () {


      Words.getlist;
      $scope.score = 0;
      $scope.answered = 0;
      $scope.rightanswers = 0;
      $scope.wronganswers = 0;
      $scope.Cards = angular.fromJson(window.localStorage['words'] || '[]');
      $scope.cards = Words.list;
      $scope.numberOfWords = angular.fromJson(window.localStorage['words'] || '[]').length;
      $scope.play();
      $scope.$on( "$ionicView.enter", function(event) {
        $scope.refresh();
      });
    };



    $scope.play = function () {

      $scope.next();
      $scope.myanswer = {
        my: ''
      };
      $scope.answers =[];
      $scope.answers.length = 0 ;
      while($scope.answers.length > 0) {
        $scope.answers.pop();
      }//frees the ansewrs
      $scope.num = $scope.Cards.length;
      $scope.answers.push($scope.randomcard.meaning);
      $scope.shuffleArray($scope.Cards);

      for (var i = 0; i < $scope.Cards.length; i++) {

        if ($scope.answers.indexOf($scope.Cards[i])!== -1)
          continue;
        else {
          $scope.answers.push($scope.Cards[i].meaning);
        }


        if ($scope.answers.length === 4)
          break;
      }
      $scope.shuffleArray($scope.answers);
    };

    $scope.next = function () {
      var randomindex = Math.floor(Math.random() * $scope.cards.length);
      $scope.randomcard = $scope.cards[randomindex];
      $scope.cards.splice(randomindex, 1);
      $scope.Cards.splice(randomindex, 1);


    };

    $scope.nextplay = function () {
      if (!$scope.myanswer.my) // case skipped ....
        $scope.cards.push($scope.randomcard); //put back the word for later ~!
      else{ //evaluate the answer !
        $scope.answered = $scope.answered+1 ;
        var res = angular.equals($scope.myanswer.my, $scope.randomcard.meaning);

        if (res) {
          $scope.rightanswers = $scope.rightanswers+1;
          $scope.score = $scope.score + 1;
        }
        else {
          $scope.wronganswers = $scope.wronganswers + 1;
          $scope.score = $scope.score - 0.5;
        }
      }
      if ($scope.score< 0){ // here better taking -1 than < 0  because the player may make two mistakes in the begining !
        $scope.traning();
      }
      $scope.Cards = angular.fromJson(window.localStorage['words'] || '[]');
      if ($scope.cards.length === $scope.rightanswers+$scope.wronganswers) {
        $scope.done();
      }
      $scope.play();
    };

    $scope.shuffleArray = function (array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    };
    $scope.done = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: 'nice Job !',
        template: "so you have seen all " + $scope.numberOfWords + "  words in this quiz! " +
        "do you want to add some more words ? "+ $scope.wronganswers +" wrong answer and " + $scope.rightanswers +" correct answer"
      });
      confirmPopup.then(function (res) {
        if (res) {

          $state.go('tab.chats');
        } else {
          $state.go('tab.dash');
        }
      });
    };
    $scope.traning = function () {


      var confirmPopup = $ionicPopup.confirm({
        title: 'oops !',
        template: "you have scored less than 0 , "  +$scope.wronganswers +" wrong answer" + "and " + $scope.rightanswers +" correct answer"+
        " you should train first ? "
      });
      confirmPopup.then(function (res) {
        if (res) {
          $ionicHistory.clearCache().then(function(){ $state.go('tab.dash') });

        } else {
          $ionicHistory.clearCache().then(function(){ $state.go('tab.dash') });
        }
      });
    }

  });
