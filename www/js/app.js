(function() {

  var config = {
    apiKey: "AIzaSyDHTH1BQayxEiTYaqDb9xhlJwezf-LmL9M",
    authDomain: "vocabulary-app-d69c0.firebaseapp.com",
    databaseURL: "https://vocabulary-app-d69c0.firebaseio.com",
    projectId: "vocabulary-app-d69c0",
    storageBucket: "vocabulary-app-d69c0.appspot.com",
    messagingSenderId: "729266172890"
  };
  firebase.initializeApp(config);

angular.module('starter', ['ionic','firebase', 'ionic.contrib.ui.tinderCards','starter.controllers', 'starter.services'])// dependencies modules

  .run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

  .directive('noScroll', function($document) {

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {

        $document.on('touchmove', function(e) {
          e.preventDefault();
        });
      }
    }
  })


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    cache:false,
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
    cache:false,
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })


  .state('tab.account', {
    url: '/account',
    cache:false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

}());

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic.contrib.ui.tinderCards'])
//
// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//       cordova.plugins.Keyboard.disableScroll(true);
//
//     }
//     if (window.StatusBar) {
//       // org.apache.cordova.statusbar required
//       StatusBar.styleDefault();
//     }
//   });
// })
//
//   .directive('noScroll', function($document) {
//
//     return {
//       restrict: 'A',
//       link: function($scope, $element, $attr) {
//
//         $document.on('touchmove', function(e) {
//           e.preventDefault();
//         });
//       }
//     }
//   })
//
//
//
// .config(function($stateProvider, $urlRouterProvider) {
//
//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider
//
//   // setup an abstract state for the tabs directive
//     .state('tab', {
//     url: '/tab',
//     abstract: true,
//     templateUrl: 'templates/tabs.html'
//   })
//
//   // Each tab has its own nav history stack:
//
//   .state('tab.dash', {
//     url: '/dash',
//     views: {
//       'tab-dash': {
//         templateUrl: 'templates/tab-dash.html',
//         controller: 'DashCtrl'
//       }
//     }
//   })
//
//   .state('tab.chats', {
//       url: '/chats',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/tab-chats.html',
//           controller: 'ChatsCtrl'
//         }
//       }
//     })
//     .state('tab.chat-detail', {
//       url: '/chats/:chatId',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/chat-detail.html',
//           controller: 'ChatDetailCtrl'
//         }
//       }
//     })
//
//   .state('tab.account', {
//     url: '/account',
//     views: {
//       'tab-account': {
//         templateUrl: 'templates/tab-account.html',
//         controller: 'AccountCtrl'
//       }
//     }
//   });
//
//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/tab/dash');
//
// });
