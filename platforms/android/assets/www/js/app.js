// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tabs', {
			url: "/tab",
			abstract: true,
			templateUrl: "views/tabs.html"
		})
		.state('tabs.home', {
			url: '/home/1',
			views: {
				'home': {
					controller: 'homeCon',
					templateUrl: 'views/home.html'
				}
			}
		})
		.state('tabs.home2', {
			url: '/home/2',
			views: {
				'home2': {
					controller: 'homeCon',
					templateUrl: 'views/home.html'
				}
			}
		})
		.state('tabs.home3', {
			url: '/home/3',
			views: {
				'home3': {
					controller: 'homeCon',
					templateUrl: 'views/home.html'
				}
			}
		})
		.state('tabs.home4', {
			url: '/home/4',
			views: {
				'home4': {
					controller: 'homeCon',
					templateUrl: 'views/home.html'
				}
			}
		})
		.state('tabs.home5', {
			url: '/home/5',
			views: {
				'home5': {
					controller: 'homeCon',
					templateUrl: 'views/home.html'
				}
			}
		})
		.state('detail', {
			cache: false,
			url: '/detail/:type/:id',
			controller: 'detailCon',
			templateUrl: 'views/detail.html'
		});
	$urlRouterProvider.otherwise("tab/home/1");
});