Meteor.publish('visitsTrackerNamespaceData', function (namespace) {
	check(namespace, String);
	return BrewCount.find({
		namespace: namespace
	});
});

Meteor.publish('visitsTrackerNamespacesData', function (namespaces) {
	check(namespaces, [String]);
	return BrewCount.find({
		namespace: {
			$in: namespaces
		}
	});
});