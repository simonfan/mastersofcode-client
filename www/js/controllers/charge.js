angular.module('semPagar.controllers.charge', ['semPagar.models.payment', 'semPagar.modals.loading'])



.controller('ChargeCtrl', function ($scope, loadingModal, $ionicSlideBoxDelegate, $timeout, $state, $ionicHistory, _, Payment) {

	var steps = [
		{
			title: 'telefone',
		},
		{
			title: 'produtos'
		}
	];


	// shows keyboard and focus phone input
	function adjustPhoneInputStyles() {
		var input = document.getElementById('phone-input');

		$('#phone-input').inputmask('(99) 99999-9999', {
			placeholder: '_',
			// greedy: false,
			clearMaskOnLostFocus: true,
			showMaskOnHover: false,
			showMaskOnFocus: false
		})

		input.focus();

		if (window.cordova) {
			window.cordova.plugins.Keyboard.show();
		}
	}

	// initially adjust input styles
	setTimeout(adjustPhoneInputStyles, 600);


	var chargeForm = {

		values: {},

		currentStepIndex: 0,

		currentStepTitle: steps[0].title,

		nextStep: function () {

			if ($('#phone-input').inputmask('isComplete')) {

				if (chargeForm.currentStepIndex < steps.length - 1) {
					$ionicSlideBoxDelegate.next();
				} else {
					// last step
					$scope.charge();
				}
			} else {
				alert('telefone inválio :/')
			}

		},

		previousStep: function () {

			if (chargeForm.currentStepIndex > 0) {
				$ionicSlideBoxDelegate.previous();
			} else {

				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('app.payments');
			}

		},

		stepChanged: function (index) {
			chargeForm.currentStepIndex = index;
			chargeForm.currentStepTitle = steps[index].title;
			if (index === 0) {

				setTimeout(adjustPhoneInputStyles, 500);
			} else if (index === 1) {

			}
		}
	};

	// object that represents the form
	$scope.chargeForm = chargeForm;



	// productCart
	$scope.productCart = [];

	// list of available products ordered by rows
	$scope.availableProducts = [
		[
			{ name: 'Hot-Dog', price: 4.5 },
			{ name: 'Batata', price: 3 },
			{ name: 'Salada', price: 7 }
		],

		[
			{ name: 'Burger', price: 5.5 },
			{ name: 'X-Burger', price: 6 },
			{ name: 'X-Salada', price: 7 },
		],
	];

	$scope.addToCart = function (product) {

		$scope.productCart.push(product);
	}

	$scope.removeFromCart = function (product) {

	}

	$scope.charge = function () {
		
		loadingModal.show();

		Payment.create({
			phone: '+55' + $('#phone-input').inputmask('unmaskedvalue'),
			value: _.reduce($scope.productCart, function (total, item) {
				return total + item.price;
			}, 0) * 100,

			description: JSON.stringify($scope.productCart)
		})
		.then(function (res) {

			
			loadingModal.toStep(1);
		})

	}
});