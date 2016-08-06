# Offensive
Simple client side validation for any form using collection2 in Meteor

This module provides a simple way to display reactive validadtion errors on any old form on the client, against your collection2 schema.



## Install
Simply install the package via atmosphere

```sh
meteor add pushplaybang:offensive
```




## Example Usage
Most of your setup will be client side, though there will be some critical setup in your meteor methods as well.

### On the Client
Offensive makes three blaze templates available to you.  The first is a required part of the setup, and the second two are used to display specific errors for a particular form field, and apply a reactive error class.  These templates are :

##### offensiveForm (required)

`{{> offensiveForm context='' collection='' list=false }}`

**arguments :**

* context (string) - the validation context, as set in your method
* collection (string) - the collection we're validating against
* list (Boolean) - whether to list the errors here or not (defaults to false)

##### offensiveField

`{{> offensiveField field='' context='' }}`

**arguments :**

* context (string) - the validation context
* field (string) - the name of the field this should relate to

##### offensiveClass (global helper)

`{{ offensiveClass field='' context='' }}`

**arguments :**

* context (string) - the validation context
* field (string) - the name of the field this should relate to

```html

<template name="topicForm">

  {{> offensiveForm context='topicForm' collection='Topics' list=false }}

  <form id="topicform" class="topic-form">

    <p class="{{ offensiveClass field='title' context='topicForm' }}">
      <label for="title">Topic Title</label>
      <input type="text" name="title" class="title" placeholder="title">

      {{> offensiveField field='title' context='topicForm' }}

    </p>

    <p class="{{ offensiveClass field='description' context='topicForm' }}">
      <label for="desc">Topic description</label>
      <textarea name="desc" class="desc" placeholder="description"></textarea>

      {{> offensiveField field='description' context="topicForm" }}

    </p>

    <p class="form-footer">
      <button type="submit" class="btn submit">Submit</button>
      <button type="reset" class="cancel">cancel</button>
    </p>

  </form>

</template>

```


### Inside your Method with Collection2
One of the primary benefits of using collection2 is that it automatically validates your operations, by allowing you to to attach a schema to a collection, while this diminishes some control, it does provide a convenience and ensures that every db operation passes the validation rules.  All you have to do to start showing these on the client is, in your method, pass a validation context (the same one set in your templates above).

```js
Topics.insert(doc, {
    validationContext: "topicForm"
});
```

## Clearing Errors
You can also clear the erros that have been set by calling the following method, this is usually neccessary on submission of the form you're validating.

 ```js
Offensive.resetErrors();
 ```

## Dependancies
You will require [aldeed:colection2](https://atmospherejs.com/aldeed/collection2)


## ChangeLog
* 0.0.5 - Rename contextName param to context and cleanup
* 0.0.4 - Change to use dburles:mongo-collection-instances to get the collection


## TODO
* Full form demo
* Simple Schema support (excluding collection2)
* Demo site
* Convenience to Get errors in JS
* Extend for react & angular



# Contributions and Suggestions Welcome!
Have something you think this needs or could use as an improvement, let me know.  add [an issue on github]() or fork and create a pull request.



___



### License [MIT](https://opensource.org/licenses/MIT)
Copyright (c) 2015 Paul van Zyl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.