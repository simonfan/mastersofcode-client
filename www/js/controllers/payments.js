angular.module('semPagar.controllers.payments', [])
.controller('PaymentsCtrl', function($scope, Payment, $stateParams, $state, $ionicHistory) {

	Payment.get().then(function (payments) {

		$scope.payments = payments;

	});

	$scope.openCharge = function () {

		$ionicHistory.nextViewOptions({
			disableBack: true,
		})
		$state.go('app.charge');
	}
})