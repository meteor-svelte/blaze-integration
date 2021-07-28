/**
 * Blaze template that embeds a Svelte component.
 */

import { Template } from 'meteor/templating';

import { SvelteComponent } from 'svelte/internal';


Template.__checkName("SvelteComponent");
Template.SvelteComponent = new Template("Template.SvelteComponent", () => []);

Template.SvelteComponent.onRendered(function onRendered() {
  const options = {
    target: this.view._domrange.parentElement,
    anchor: this.view._domrange.lastNode(),
    props: {},
  };

  if (this.view.templateContentBlock) {
    options.props.$$slots = {default: [create_default_slot]};
    options.props.$$scope = {ctx: [this.view.templateContentBlock]};
  }

  if (this.data.prototype instanceof SvelteComponent) {
    // {{> SvelteComponent SomeComponent}}
    this.component = new this.data(options);
  }
  else if (this.data.this === undefined) {
    // DEPRECATED syntax
    // {{> SvelteComponent component=SomeComponent props=helper}}
    if (this.data.props) {
      _.extend(options.props, this.data.props);
    }
    this.component = new this.data.component(options);

    let initial = true;
    Tracker.autorun(() => {
      const data = Blaze.getData(this.view);
      if (!initial) {
        this.component.$set(data.props || {});
      }
    });
    initial = false;
  }
  else {
    // New syntax
    // {{> SvelteComponent this=SomeComponent prop1="value" prop2="value"}}
    _.extend(options.props, _.omit(this.data, 'this'));
    this.component = new this.data.this(options);

    let initial = true;
    Tracker.autorun(() => {
      const data = Blaze.getData(this.view);
      if (!initial) {
        this.component.$set(_.omit(data, 'this'));
      }
    });
    initial = false;
  }
});

Template.SvelteComponent.onDestroyed(function onDestroyed() {
  if (this.component) this.component.$destroy();
});

function create_default_slot(ctx) {
  let blazeView;
  return {
    c() {
    },
    m(target, anchor) {
      const templ = ctx[0];
      blazeView = Blaze.render(templ.constructView(), target, anchor);
    },
    d(detaching) {
      if (detaching) {
        Blaze.remove(blazeView);
      }
    }
  };
}
