app.controller("detailCon", function ($scope, $stateParams, $ionicHistory) {
	var t = JSON.parse(localStorage.getItem("OldData" + $stateParams.type));
	var header = document.querySelectorAll("ion-header-bar:not(.detail-header)");

	for (i = 0; i < t.length; i++) {
		if (t[i].id == $stateParams.id) {
			$scope.item = t[i];
			break;
		}
	}

	$scope.goBack = function () {
		var header = document.querySelectorAll("ion-header-bar:not(.detail-cnt)");
		var backBtn = document.querySelector('ion-header-bar > a');
		backBtn.className += " actived";
		$ionicHistory.goBack();
		//		history.back();
	};

	$scope.open = function () {
		window.open('http://aps.ncue.edu.tw/sign_up/show_crs.php?crs_seq=' + $scope.item.id, '_system');
	};
});