VisitsTracker = {};

VisitsTracker.addVisit = function (namespace, callback) {
	Meteor.call('visitsTracker__addVisits', namespace, callback);
};

VisitsTracker.getVisitsCount = function (namespace, callback) {
	Meteor.call('visitsTracker__getVisitCounts', namespace, callback);
};

VisitsTracker.getVisitsCountBetween = function (namespace, from, to, callback) {

	// Set sensible defaults if none are provided
	if(!from) {
		from = 0;
	}
	if(!to) {
		to = getTimestampNow();
	}
	
	Meteor.call('visitsTracker__getVisitCountsBetween', namespace, from, to, callback);
};