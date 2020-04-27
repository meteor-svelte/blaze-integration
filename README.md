# `svelte:blaze-integration`

This package makes it possible to instantiate Blaze templates inside Svelte
components, with reactivity across boundaries.

This package is still very experimental.

## Examples

### Simple usage

```svelte
<script>
  import { BlazeTemplate } from 'meteor/svelte:blaze-integration';
</script>

<BlazeTemplate template="loginButtons" />
```

### Advanced usage

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
