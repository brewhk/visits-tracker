BrewVisits = new Mongo.Collection('brewhk__visits-tracker__visits');
BrewCount = new Mongo.Collection('brewhk__visits-tracker__count');

Schemata = {};

Schemata.BrewVisits = new SimpleSchema({
	namespace: {
		type: String
	},
	ip: {
		type: String,
		regEx: SimpleSchema.RegEx.IP
	},
	timestamp: {
		type: Number,
		decimal: false
	}
});

BrewVisits.attachSchema(Schemata.BrewVisits);

Schemata.BrewCount = new SimpleSchema({
	namespace: {
		type: String
	},
	count: {
		type: Number,
		min: 0,
		decimal: false
	}
});

BrewCount.attachSchema(Schemata.BrewCount);