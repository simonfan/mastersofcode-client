angular.module('semPagar.controllers.payments', ['semPagar.modals.newPayment'])
.controller('PaymentsCtrl', function($scope, Payment, newPayment, $stateParams, $state, $ionicHistory) {

	Payment.get().then(function (payments) {

		$scope.payments = payments;

	});

	$scope.createNewPayment = function () {
		newPayment.show();
	};

	$scope.openCharge = function () {

		$ionicHistory.nextViewOptions({
			disableBack: true,
		})
		$state.go('app.charge');
	}
})