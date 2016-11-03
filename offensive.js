Offensive = {
  /* config */
  _settings: {
    buttonText: '&times;',
    showButtons: false,
  },

  /* store errors */
  errors: new ReactiveDict(),

  /* perform setup */
  init(userSettings) {
    _.extend(Offensive._settings, userSettings);
  },

  /* reset the errors */
  resetErrors() {
    return Offensive.errors.clear();
  },

  resetError(key) {
    return Offensive.errors.delete(key);
  },

  resetFieldValidation(target, context) {
    const { name } = target;
    const key = `${context}_${name}`;

    // call resetError
    return Offensive.resetError(key);
  },
};

