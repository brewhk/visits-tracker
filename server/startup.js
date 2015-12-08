Meteor.startup(function () {
	// Set `process.env.VISIT_TRACKER_SESSION_DURATION` to `DEFAULT_TRACKER_SESSION_DURATION` if not provided or cannot be parsed as an integer
	let sessionDuration = parseInt(process.env.VISIT_TRACKER_SESSION_DURATION);
	if(isNaN(sessionDuration)) {
		sessionDuration = DEFAULT_TRACKER_SESSION_DURATION;
	}
	this.VISIT_TRACKER_SESSION_DURATION = sessionDuration;
});