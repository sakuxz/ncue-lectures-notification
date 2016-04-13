app.controller("homeCon", function ($scope, $timeout, $ionicModal) {
	var isOldVer = false;
	var type = location.hash.split("/")[3];
	$scope.type = type;
	$scope.items = [];


	switch (type) {
	case '1':
		if (localStorage.getItem("OldData1"))
			$scope.items = JSON.parse(localStorage.getItem("OldData1"));
		break;
	case '2':
		if (localStorage.getItem("OldData2"))
			$scope.items = JSON.parse(localStorage.getItem("OldData2"));
		break;
	case '3':
		if (localStorage.getItem("OldData3"))
			$scope.items = JSON.parse(localStorage.getItem("OldData3"));
		break;
	case '4':
		if (localStorage.getItem("OldData4"))
			$scope.items = JSON.parse(localStorage.getItem("OldData4"));
		console.log($scope.items);
		break;
	case '5':
		if (localStorage.getItem("OldData5"))
			$scope.items = JSON.parse(localStorage.getItem("OldData5"));
		break;
	}

	function isItemsEmpty(it) {
		if (it) {
			if (it.length == 0) {
				var mes = document.querySelectorAll(".mes");
				for (var i = 0; i < mes.length; i++) {
					mes[i].children[1].innerHTML = "暫無資料";
					mes[i].style.display = "block";
				}
				var loadingSpin = document.querySelectorAll("ion-list ion-spinner > svg");
				for (var i = 0; i < loadingSpin.length; i++) {
					loadingSpin[i].style.display = "none";
				}
			} else {
				var mes = document.querySelectorAll(".mes");
				for (var i = 0; i < mes.length; i++) {
					mes[i].style.display = "none";
				}
			}
		}
	}

	if (localStorage.getItem('OldData' + type)) {
		isItemsEmpty(JSON.parse(localStorage.getItem('OldData' + type)));
	}

	$scope.$on('$ionicView.enter', function () {
		var type = location.hash.split("/")[3];
		console.log(JSON.parse(localStorage.getItem('OldData' + type)));
		isItemsEmpty(JSON.parse(localStorage.getItem('OldData' + type)));
	});

	if (navigator.userAgent.search("Android") > -1) {
		var t = navigator.userAgent.search("Android");
		var version = parseFloat(navigator.userAgent.slice(t + 8, t + 11));
		if (version && version < 4.3) {
			var loading = document.querySelectorAll("ion-content > div > div");
			for (var i = 0; i < loading.length; i++) {
				loading[i].style.display = "none";
			}
			isOldVer = true;
		}
	}

	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		$scope.items = JSON.parse(xhr.responseText);
		//		for (i = 0; i < $scope.items; i++) {
		//			$scope.items[i].isLatest = true;
		//		}
		$scope.$apply();
		localStorage.setItem("OldData" + type, JSON.stringify($scope.items));
		isItemsEmpty(JSON.parse(localStorage.getItem('OldData' + type)));
		storeSharedPreferences("t", new Date().getTime(), function (e) {});
	};
	xhr.onerror = function () {
		showToast("無網路連線 暫無法更新資料");
		$scope.$broadcast('scroll.refreshComplete');
	};
	var param;
	switch (type) {
	case '1':
	case '2':
		param = type;
		break;
	case '3':
	case '4':
		param = parseInt(type) + 1;
		break;
	case '5':
		param = 6;
		break;
	}
	xhr.open("get", "http://nodejs-ncuecsie106.rhcloud.com?type=" + param);
	xhr.send("type=" + param);

	if (!isOldVer) {
		$scope.doRefresh = function () {
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				$scope.items = JSON.parse(xhr.responseText);
				$scope.$apply();
				localStorage.setItem("OldData" + type, JSON.stringify($scope.items));
				isItemsEmpty(JSON.parse(localStorage.getItem('OldData' + type)));
				$scope.$broadcast('scroll.refreshComplete');
			};
			xhr.onerror = function () {
				showToast("無網路連線 暫無法更新資料");
				$scope.$broadcast('scroll.refreshComplete');
			};
			xhr.open("get", "http://nodejs-ncuecsie106.rhcloud.com?type=" + param);
			xhr.send();

			console.log('Refreshing!');
			$timeout(function () {
				//simulate async response
				//Stop the ion-refresher from spinning
				$scope.$broadcast('scroll.refreshComplete');

			}, 5000);

		};
	}
	var firT;
	$scope.setDataList = function () {
		if (this.$first) {
			firT = new Date().getTime();
		}
		//有資料就移除loading
		var loadingSpin = document.querySelectorAll("ion-list ion-spinner > svg");
		for (var i = 0; i < loadingSpin.length; i++) {
			loadingSpin[i].style.display = "none";
		}

		if (localStorage.getItem("t")) {
			if (this.item.timestamp > localStorage.getItem("t")) {
				document.querySelector("ion-nav-view[name='home" + type + "'] ion-list > div > ion-item:nth-child(" + (this.$index + 3) + ")  div").className += "item_content";
				document.querySelector("ion-nav-view[name='home" + type + "'] ion-list > div > ion-item:nth-child(" + (this.$index + 3) + ")  span").style.display = "inline";
			}
		} else {
			if (this.item.timestamp > new Date(new Date().toDateString()).getTime()) {
				document.querySelector("ion-nav-view[name='home" + type + "'] ion-list > div > ion-item:nth-child(" + (this.$index + 3) + ")  div").className += "item_content";
				document.querySelector("ion-nav-view[name='home" + type + "'] ion-list > div > ion-item:nth-child(" + (this.$index + 3) + ")  span").style.display = "inline";
			}
		}

		if (this.$last) {
			localStorage.setItem("t", new Date(new Date().toDateString()).getTime());
			storeSharedPreferences("t", new Date().getTime(), function (e) {});
			console.log(new Date().getTime() - firT);
		}
	};
	/*
		$ionicModal.fromTemplateUrl('views/modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function (item) {
			$scope.tempItem = item;
			$scope.modal.show();
		};
		$scope.closeModal = function () {
			$scope.modal.hide();
		};
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function () {
			$scope.modal.remove();
		});*/



});