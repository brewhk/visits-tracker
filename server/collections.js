BrewVisits = new Mongo.Collection('brewhk__visits-tracker__visits');

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
