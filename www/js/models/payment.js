angular.module('semPagar.models.payment', ['semPagar.models.user'])

.service('Payment', function($http, $q, Config, _, log, User) {

	var endpoints = Config.endpoints;

	// local storage for transactions
	var transactions = [];

	/**
	 * Finds an invoice by id locally
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	function findInvoiceById(id) {
		// try finding locally
		return _.find(transactions, function (i) {
			return i.id === id;
		});
	}

	function loadtransactions(query) {

		query = query || {};

		// if query is an object or undefined, it is passing multiple query values
		return $http.get(endpoints.transactions, {
			data: query,

			headers: {
				'X-Access-Token': User.getAccessToken()
			}
		})
		.then(function (res) {

			console.log(res)
			// set to transactions variable
			transactions = res.data.data;
			// resolve
		})

	}


	return {


		get: function (query) {

			// create a promise
			var defer = $q.defer()

			
			if (_.isString(query)) {
				// if query is a string, it looking for a single item
				
				var invoice = findInvoiceById(query);

				if (invoice) {
					
					defer.resolve(invoice);

				} else {
					loadtransactions().then(function (res) {
						defer.resolve(findInvoiceById(query));
					})
				}
				
			} else {

				loadtransactions(query).then(function () {


					console.log(transactions);
					defer.resolve(transactions);
				})

			}


			return defer.promise;
		},


		create: function (data) {

			console.log(data);

			var creationPromise = $http.post(endpoints.payments, data, {
				headers: {
					'X-Access-Token': User.getAccessToken()
				}
			});

			creationPromise.then(function (res) {
				// add transaction to transactions list
				transactions.unshift(res.data.transaction);
				
			});

			return creationPromise;
		}

	};
});