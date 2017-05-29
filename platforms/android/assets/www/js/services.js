angular.module('starter.services', [])

  .factory('Words', function ($firebaseArray) {

    var root = firebase.database().ref();


    var words = angular.fromJson(window.localStorage['words'] || '[]');

    var WORDS = $firebaseArray(root);
    var W = [];
    function persist() {


      root.on('value', function (snapshot) {
        snapshot.forEach(function (card) {
          W.push(card.val());
        });
        console.log(W);

        window.localStorage['words'] = angular.toJson(W);
      })
    }


    return {
      getlist: persist(),
      list: words,
      root: root,
      add: function (word) {
        WORDS.$add(word);
        words.push(word);
        persist();
      }
    }


  });

