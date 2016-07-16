# PokeGoNav

PokeGoNav is an open source project to map Pokemon spawn locations, Gyms and Pokestops. It's intention is to help
Trainers see where certain types of pokemon spawn, and provide useful tools for Trainers in their search for specific
pokemon. There are many useful things an app like this can do, but for now it's just the basics.

## Features

* Report pokemon you've captured (either at your current location, or by selecting one).
* Filter reported locations to a specific type of Pokemon
* View reported Gyms and Pokestops in your area. (Note: if none show up for you, it's because users haven't reported them.)

## Planned

* Ability to report Gyms and Pokestops directly in PokeGoNav.
* Dedicated iOS and Android apps

That's all that's currently planned, but I have a lot of other ideas that I'm going to start looking into once the core
of the app is solid.

## Status

As of v0.9.0, the app is considered "Beta". I should work, but if any of the other Pokemon Go related apps are any
indication, this might get so populare it falls over and dies. I've also done very little to secure it, so if anyone
decides they want to 'poison the well' and report a million mews, there's nothing to stop them, right now, other thank
basic rate limiting.

## Development

If you want to get setup for local development, you will need to get a local [RethinkDB instance][rethink] setup.
After that, just follow these instructions:

### Required packages

Install `grunt-cli` via `npm install -g grunt-cli`

### Steps to run

```
npm install
bower install
grunt
node server.js
```

That's it! You should be able to drop capture points in order to build up some test data.

[rethink]: https://rethinkdb.com/docs/install/
