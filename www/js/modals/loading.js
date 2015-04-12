angular.module('semPagar.modals.loading', [])



.controller('LoadingCtrl', function ($scope, loadingModal, Payment, $ionicSlideBoxDelegate, $timeout, $ionicHistory, $state) {

	$scope.hide = function () {

		loadingModal.hide();

		$ionicHistory.nextViewOptions({
			disableBack: true
		});

		$state.go('app.payments');


	}

	$scope.show = loadingModal.show;
})



.factory('loadingModal', function($ionicModal, $rootScope, $q) {

	var serviceScope = {};

	var modalScope = serviceScope.modalScope = $rootScope.$new();


	var steps = [
		{
			title: 'aguarde', 
			label: 'enviando pedido para o servidor'
		},
		{ title: 'resposta', label: 'aguardando resposta do cliente' },
		{ title: 'processamento', label: 'processando pagamento' }
	];
	
	// create modal
	$ionicModal.fromTemplateUrl('templates/loading-modal.html', {
		scope: modalScope,

		// custom animation defined at css
		animation: 'scale-in',
	})
	.then(function (modal) {
		serviceScope.modal = modal;
	});

	return {
		show: function () {

			// set step
			modalScope.currentStep = steps[0];

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

		toStep: function (index) {
			modalScope.currentStep = steps[index];
		}
	};
})