BrewCount = new Mongo.Collection('brewhk__visits-tracker__count');

Schemata = {};

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