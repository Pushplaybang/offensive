Offensive = {
  /* config */
  _settings: {
    buttonText: '&times;',
    showButtons: false,
  },

  /* store errors */
  errors: new ReactiveDict(),

  /* perform setup */
  init: function(userSettings) {
    _.extend(this._settings, userSettings);
  },

  /* reset the errors */
  resetErrors: function() {
    Offensive.errors.clear();
  },

  /* Utilities */

  /*
    This is a very clever little function care of autoForms author aldeed,
    and can be seen in use here:

    https://github.com/aldeed/meteor-autoform/blob/devel/utility.js

    If `obj` is a string, returns the value of the property with that
    name on the `window` object. Otherwise returns `obj`.  For our client side
    validation, the collection must exist be isoMorphic.
   */
  clientCollectionLookup: function(obj) {
    var ref = window;
    var arr;
    if (typeof obj === 'string') {
      arr = obj.split('.');
      while (arr.length && (ref = ref[arr.shift()]));
      if (!ref) {
        throw new Error(obj + ' is not in the window scope');
      }
      return ref;
    }
    return obj;
  }
};

