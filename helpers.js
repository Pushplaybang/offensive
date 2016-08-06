/* Setup the form errors */
Template.offensiveForm.onCreated(() => {
  const instance = Template.instance();
  const { collection, context } = instance.data;
  const collectionInstance = Mongo.Collection.get(collection);
  const validation = collectionInstance.simpleSchema().namedContext(context);
  let key;

  /* abort if no collection is specified */
  if (!collectionInstance) {
    console.error('You need to add a collection argument to the form template');
    return;
  }


  /* save a reference to the validation context */
  /* setup a reactive context */
  instance.autorun(() => {
    Offensive.resetErrors();

    /* Set the errors messsages on the errors object */
    validation.invalidKeys().map((data) => {
      key = `${context}_${data.name}`;
      Offensive.errors.set(key, validation.keyErrorMessage(data.name));
    });
  });
});

/* Template Form Errors Primary Template */
Template.offensiveForm.helpers({
  showErrorList() {
    const { list } = this;
    return list ? list : Offensive._settings.showButtons || false;
  },
  errors() {
    return _.keys(Offensive.errors.all()) || [];
  }
});

/* the single errors that are show in the listing */
Template.offensiveSingle.helpers({
  message() {
    if (this.key.indexOf(this.context) === -1) {
      return false;
    }

    return Offensive.errors.get(this.key) || '';
  },
  showButtons() {
    return Offensive._settings.showButtons;
  },
  buttonText() {
    return Offensive._settings.buttonText;
  }
});

Template.offensiveSingle.events({
  'click .remove'(event, template) {
    Offensive.errors.delete(this.key);
  }
});

/* The field error template  */
Template.offensiveField.helpers({
  message() {
    const { context = '', field = '' } = this;
    return field ? Offensive.errors.get(`${context}_${field}`) : false;
  },
  showButtons() {
    return Offensive._settings.showButtons;
  },
  buttonText() {
    return Offensive._settings.buttonText;
  }
});

Template.offensiveField.events({
  'click .remove'(event, template) {
    const { context = '', field } = this;
    Offensive.errors.delete(`${context}_${field}`);
  }
});

/* a global helper to apply an error class to the offending fields */
Template.registerHelper('offensiveClass', (key) => {
  const { field = '', context = '' } = key.hash;
  return Offensive.errors.get(`${context}_${field}`) && 'error offensive-error';
});
