Meteor.methods({
	'visitsTracker__addVisits': function (namespace) {

		// If we can detect the user's IP address
		if(this.connection.clientAddress) {
			let currentTimestamp = getTimestampNow();
			let currentVisit = BrewVisits.findOne({
				namespace: namespace,
				ip: this.connection.clientAddress,
				timestamp: {
					$gte: currentTimestamp - VISIT_TRACKER_SESSION_DURATION
				}
			});

			// If there is a current visit, bump the timestamp to the current timestamp
			if(currentVisit) {
				return BrewVisits.update({
					_id: currentVisit._id
				}, {
					$set: {
						timestamp: currentTimestamp
					}
				});
			}

			// Otherwise create a new visit entry
			else {
				BrewVisits.insert({
					namespace: namespace,
					ip: this.connection.clientAddress,
					timestamp: currentTimestamp
				});

				return BrewCount.update({
					namespace: namespace
				}, {
					$inc: {
						count: 1
					},
					$setOnInsert: {
						count: 1
					}
				}, {
					upsert: true,
					multi: false
				});
			}
		}
	},
	'visitsTracker__getVisitCounts': function (namespace) {
		let queriedCount = BrewCount.findOne({
			namespace: namespace
		});
		if(queriedCount) {
			return queriedCount.count;
		}
		return 0;
	},
	'visitsTracker__getVisitCountsBetween': function (namespace, from, to) {

		// Set sensible defaults if none are provided
		if(!from) {
			from = 0;
		}
		if(!to) {
			to = getTimestampNow();
		}
		return BrewVisits.find({
			namespace: namespace,
			timestamp: {
				$gte: from,
				$lt: to
			}
		}).count();
	}
});