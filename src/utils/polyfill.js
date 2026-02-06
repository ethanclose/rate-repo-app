if (typeof FinalizationRegistry === 'undefined') {
  console.log('In polyfill for undef');

  global.FinalizationRegistry = class {
    constructor(cleanupCallback) {
      this.cleanupCallback = cleanupCallback;
    }
    register() {}
    unregister() {}
  };
}
