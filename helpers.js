/* Setup the form errors */
Template.offensiveForm.onCreated(() => {
  var instance = Template.instance();
  // var collection = Offensive.clientCollectionLookup(self.data.collection);
  const { collection, contextName } = instance.data;
  const collectionInstance = Mongo.Collection.get(collection);
  const context = collectionInstance.simpleSchema().namedContext(contextName);
  let key;

  /* abort if no collection is specified */
  if (!collectionInstance) {
    console.log('You need to add a collection argument to the form template');
    return false;
  }


  /* save a reference to the validation context */
  /* setup a reactive context */
  instance.autorun(() => {
    Offensive.resetErrors();

    /* Set the errors messsages on the errors object */
    context.invalidKeys().map((data) => {
      key = `${contextName}_${data.name}`;
      Offensive.errors.set(key, context.keyErrorMessage(data.name));
    });
  });
});

/* Template Form Errors Primary Template */
Template.offensiveForm.helpers({
  showErrorList() {
    return this.list ? this.list : Offensive._settings.showButtons || false;
  },
  errors() {
    return _.keys(Offensive.errors.all()) || [];
  }
});

/* the single errors that are show in the listing */
Template.offensiveSingle.helpers({
  message() {
    if (this.key.indexOf(this.contextName) === -1) {
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
    context = this.contextName ? this.contextName + '_' : '';
    return this.field ? Offensive.errors.get(context + this.field) : false;
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
    context = this.contextName ? this.contextName + '_' : '';
    Offensive.errors.delete(context + this.field);
  }
});

/* a global helper to apply an error class to the offending fields */
Template.registerHelper('offensiveClass', (key) => {
  var field = key ? key.hash && key.hash.field : '';
  var context = key ? key.hash && key.hash.contextName + '_' : '';
  return Offensive.errors.get(context + field) && 'error clarity-error';
});
