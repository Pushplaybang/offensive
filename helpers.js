/* Setup the form errors */
Template.offensiveForm.onCreated(function() {
  var self = this, context, key;
  var collection = Offensive.clientCollectionLookup(self.data.collection);

  /* abort if no collection is specified */
  if (!collection)
    return false;

  /* save a reference to the validation context */
  context = collection.simpleSchema().namedContext(self.data.contextName);

  /* setup a reactive context */
  self.autorun(function() {
    // Offensive.resetErrors();

    /* Set the errors messsages on the errors object */
    context.invalidKeys().map(function(data) {
      key = self.data.contextName + '_' + data.name;
      Offensive.errors.set(key, context.keyErrorMessage(data.name));
    });

  });
});

/* Template Form Errors Primary Template */
Template.offensiveForm.helpers({
  showErrorList: function() {
    return this.list ? this.list : Offensive._settings.showButtons || false;
  },
  errors: function() {
    return _.keys(Offensive.errors.all()) || [];
  }
});

/* the single errors that are show in the listing */
Template.offensiveSingle.helpers({
  message: function() {
    if (this.key.indexOf(this.contextName) === -1)
      return false;

    return Offensive.errors.get(this.key) || '';
  },
  showButtons: function() {
    return Offensive._settings.showButtons;
  },
  buttonText: function() {
    return Offensive._settings.buttonText;
  }
});

Template.offensiveSingle.events({
  'click .remove': function(event, template) {
    Offensive.errors.delete(this.key);
  }
});

/* The field error template  */
Template.offensiveField.helpers({
  message: function() {
    context = this.contextName ? this.contextName + '_' : '';
    return this.field ? Offensive.errors.get(context + this.field) : false;
  },
  showButtons: function() {
    return Offensive._settings.showButtons;
  },
  buttonText: function() {
    return Offensive._settings.buttonText;
  }
});

Template.offensiveField.events({
  'click .remove': function(event, template) {
    context = this.contextName ? this.contextName + '_' : '';
    Offensive.errors.delete(context + this.field);
  }
});

/* a global helper to apply an error class to the offending fields */
Template.registerHelper('offensiveClass', function(key) {
  var field = key ? key.hash && key.hash.field : '';
  var context = key ? key.hash && key.hash.contextName + '_' : '';
  return Offensive.errors.get(context + field) && 'error clarity-error';
});
