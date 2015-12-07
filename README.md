# visits-tracker
A very simple visits tracker

### Overview

Visits Tracker tracks visits to a particular page or group of pages (e.g. a user's profile page, all pages by a particular user, all pages).

You can group related pages together by giving them a *namespace*, and visits to any of those pages will be considered as the same.

### Usage

Add the package to your application.

    meteor add brewhk:visits-tracker

##### Client

Visits Tracker provides the `VisitsTracker` object on the client, which carries three functions - `addVisit`, `getVisitsCount`, `getVisitsCountBetween`.

###### `VisitsTracker.addVisit`

Increments the visit count by 1. (see notes on `VISIT_TRACKER_SESSION_DURATION` below)

    VisitsTracker.addVisit('namespace', function (error, result) {
    	console.log(error);
    	console.log(result); // returns `1` if success, regardless of whether the count was incremented or not
    });

###### `VisitsTracker.getVisitsCount`

Get the visits count for a particular namespace.

    VisitsTracker.getVisitsCount('namespace', function (error, result) {
    	console.log(error);
    	console.log(result); // returns the total visits count for that namespace
    });

###### `VisitsTracker.getVisitsCountBetween`

Get the visits count for a particular namespace between two timestamps.

    VisitsTracker.getVisitsCountBetween('namespace', 0, 1449478438, function (error, result) {
    	console.log(error);
    	console.log(result); // returns the total visits count for that namespace between the two timestamps
    });

##### Server

Set the following environment variables on your machine.

* `HTTP_FORWARDED_COUNT` - This must be set properly for Visits Tracker to obtain the correct IP address. Set to `1` if you are running behind a reverse proxy server, or `0` if the client is connecting directly to Meteor
* `VISIT_TRACKER_SESSION_DURATION` - The length of time (in seconds) for which a visit/session from the same IP address counts as a single visit/session. The session length extends each time the viewer navigates to the same page, or group of pages. For example, let's say you are tracking a set of pages with the namespace `brew`, and you set `VISIT_TRACKER_SESSION_DURATION` to be `900` (15 minutes). The initial visit by a client from IP address `123.345.678.90` was made at `00:00:01`, this increases the visit count by 1. If the same client navigates to another tracked page with the namespace `brew`:
  * on (or before) `00:15:00`, then that would still count as 1 visit, and the session expiration will extend by another 900 seconds, in this case, to `00:30:00`.
  * after `00:15:00`, then it would count as a new visit

  Set to `0` if you want to limit to 1 visit per second, set to `-1` if you consider all visits as unique visits.