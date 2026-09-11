/**
 * Centralized test data for the SauceDemo automation suite.
 * Keeping data here (rather than hardcoded in specs) makes the
 * suite easy to maintain and reuse across modules.
 */

const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
  invalid: { username: 'standard_user', password: 'wrong_pass123' },
};

const checkoutInfo = {
  valid: { firstName: 'John', lastName: 'Doe', postalCode: '10001' },
  missingFirstName: { firstName: '', lastName: 'Doe', postalCode: '10001' },
  missingLastName: { firstName: 'John', lastName: '', postalCode: '10001' },
  missingPostalCode: { firstName: 'John', lastName: 'Doe', postalCode: '' },
};

const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  testAllTheThings: 'Test.allTheThings() T-Shirt (Red)',
};

const sortOptions = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
};

module.exports = { users, checkoutInfo, products, sortOptions };
