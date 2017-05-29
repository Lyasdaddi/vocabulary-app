angular.module('starter.services', [])

  .factory('Words', function ($firebaseArray) { // inject words into used controllers 

    var root = firebase.database().ref();// refrence of db// all words are inside the root  


    var words = angular.fromJson(window.localStorage['words'] || '[]');//  offline gets words forom local storage id : words jason object inside cache app 

    var WORDS = $firebaseArray(root); // getting words form db online 
    var W = []; // presetance getlist 
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
      add: function (word) { // adding words into dabase into local storage and backend firebasearray
        WORDS.$add(word);
        words.push(word);
        persist();
      }
    }


  });

