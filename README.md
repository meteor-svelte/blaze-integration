# `svelte:blaze-integration`

This Meteor package makes it possible to instantiate Blaze templates inside
Svelte components, with reactivity across boundaries.

This package is still experimental.

## Installation

To add this package to your app, you will want to run the following command:

```
meteor add svelte:blaze-integration
```

## Using Blaze inside Svelte

This package provides a `<BlazeTemplate>` component which will render the given
Blaze template inside the Svelte component.  The template is specified in the
`template` property, which may either be a string template name or a Template
reference, for example:

```svelte
<script>
  import { BlazeTemplate } from 'meteor/svelte:blaze-integration';
</script>

<BlazeTemplate template="loginButtons" />
<BlazeTemplate template={Template.loginButtons} />
```

To pass in data, use the `data` prop, which will be updated reactively according
to the normal Svelte rules for reactivity (ie. requiring an assignment):

```svelte
<script>
  import { BlazeTemplate } from 'meteor/svelte:blaze-integration';
  import './label.html';

  let labelData = {text: 'not clicked'};

  function handleClick() {
    labelData = {text: 'clicked'};
  }
</script>

<BlazeTemplate template={Template.Label} data={labelData} />
```

### Slotted content

You can use `{{> Template.contentBlock}}` as in Blaze to spawn in the slotted
content inside the BlazeTemplate component.

## Using Svelte inside Blaze

To render a Svelte component inside a Blaze template, use the SvelteComponent
template.  This works similarly to Svelte's own `<svelte:component>`, and takes
the component as `this` argument and the props as remaining arguments.

**MyTemplate.html**
```html
<template name="MyTemplate">
  {{> SvelteComponent this=MyComponent first="Hello" second="world"}}
</template>
```

**MyTemplate.js**
```js
import MyComponent from './MyComponent.svelte';

Template.MyTemplate.helpers({
  MyComponent: () => MyComponent,
});
```

**MyComponent.svelte**
```svelte
<script>
  export let first;
  export let second;
</script>

<p>{first} {second}!</p>
```

If you wish to determine the selection of props programmatically, you can use
the single-argument form instead:

**MyTemplate.html**
```html
<template name="MyTemplate">
  {{> SvelteComponent myHelperFunction}}
</template>
```

**MyTemplate.js**
```js
import MyComponent from './MyComponent.svelte';

Template.MyTemplate.helpers({
  myHelperFunction() {
    return {
      this: MyComponent,
      first: "Hello",
      second: "world",
    };
  },
});
```

You can also directly return MyComponent, but that method will not support
additional properties.

### Slotted content

Slotted content (like `Template.contentBlock`) is also supported.  For example:

**MyTemplate.html**
```html
<template name="MyTemplate">
  {{#SvelteComponent this=myComponentHelper}}
    Welcome
  {{/SvelteComponent}}
</template>
```

**Heading.svelte**
```svelte
<h1><slot /></h1>
```
