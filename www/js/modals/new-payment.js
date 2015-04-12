angular.module('semPagar.modals.newPayment', [])



.controller('NewPaymentCtrl', function ($scope, newPayment, Payment, $ionicSlideBoxDelegate, $timeout) {

	$scope.paymentForm = {
		currentStep: 'telefone',

		nextStep: function () {

			console.log('next');

			$timeout(function () {
				$ionicSlideBoxDelegate.$getByHandle('payment-form').next();
			}, 0);
			
		},

		previousStep: function () {
			console.log('previous');

			
			$ionicSlideBoxDelegate.previous();

		}
	}

	$scope.hide = newPayment.hide;
	$scope.show = newPayment.show;


	$scope.item = {};

	$scope.save = function () {

	}
})



.factory('newPayment', function($ionicModal, $rootScope, $q) {

	var serviceScope = {};

	var modalScope = serviceScope.modalScope = $rootScope.$new();



	// create modal
	$ionicModal.fromTemplateUrl('templates/new-payment-modal.html', {
		scope: modalScope,

		// custom animation defined at css
		animation: 'scale-in',
		focusFirstInput: true
	})
	.then(function (modal) {
		serviceScope.modal = modal;
	});

	return {
		show: function () {
			var defer = $q.defer();

			serviceScope.modal.show();

			serviceScope.defer = defer;

			return defer.promise;
		},

		getDefer: function () {
			return serviceScope.defer;
		},

		hide: function () {
			return serviceScope.modal.hide();
		},


		open: function () {

		},

		setScope: function () {

		},
	};
})