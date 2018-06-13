// dependencies
const _ = require('lodash');

// constants
const APP_URL = 'http://localhost:3000';
const BOXES_COUNT = 25;

function resourcesArePresent() {
  const lodashIsPresent = !!_;
  const musketeerisPresent = !!$$$;
  return lodashIsPresent && musketeerisPresent;
}

module.exports = {

  before: (browser) => {
    return browser
    .url(APP_URL)
    .executeAsync(function sceneHasLoaded(done) {
      if (resourcesArePresent()) {
        return done();
      }

      setTimeout(function() {
        sceneHasLoaded(done);
      }, 1000);
    });
  },

  beforeEach: (browser) => {
    return browser.pause(500);
  },

  after: (browser) => {
    return browser.end();
  },

  [`${BOXES_COUNT} boxes exist`]: (browser) => {
    browser
    .execute(function() {
      return $$$.findAll((n) => _.includes(n.name, 'BOX')).length;
    }, (res) => {
      return browser.assert.equal(res.value, BOXES_COUNT);
    });
  },

  'All boxes are toggled to "isSelected" being "true" after being clicked': (browser) => {
    browser
    .execute(function() {
      return $$$
      .findAll((n) => _.includes(n.name, 'BOX'))
      .map((n) => n.click())
      .map((n) => n.isSelected);
    }, (res) => {
      return browser.assert.equal(_.compact(res.value).length, BOXES_COUNT);
    });
  },

  'All boxes are toggled to "isSelected" being "false" after being clicked': (browser) => {
    browser
    .execute(function() {
      return $$$
      .findAll((n) => _.includes(n.name, 'BOX'))
      .map((n) => n.isSelected)
      .map((n) => n.click())
      .map((n) => n.isSelected);
    }, (res) => {
      return browser.assert.equal(_.compact(res.value).length, 0);
    });
  },

  'All unselected boxes scale up when they are clicked': (browser) => {
    browser
    .execute(function() {
      return $$$
      .findAll((n) => _.includes(n.name, 'BOX'))
      .map((n) => {
        if (!n.isSelected) n.click();
        return n;
      })
      .map((n) => _.every([
        n.scale.x !== 1,
        n.scale.y !== 1,
        n.scale.z !== 1
      ]));
    }, (res) => {
      return browser.assert.equal(_.compact(res.value).length, BOXES_COUNT);
    });
  },

  'All selected boxes scale down to original scale when they are clicked': (browser) => {
    browser
    .execute(function() {
      return $$$
      .findAll((n) => _.includes(n.name, 'BOX'))
      .map((n) => {
        if (n.isSelected) n.click();
        return n;
      })
      .map((n) => _.every([
        n.scale.x === 1,
        n.scale.y === 1,
        n.scale.z === 1
      ]));
    }, (res) => {
      return browser.assert.equal(_.compact(res.value).length, BOXES_COUNT);
    });
  }

};