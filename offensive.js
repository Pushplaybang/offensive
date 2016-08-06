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
};

