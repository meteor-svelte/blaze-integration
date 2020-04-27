import { Template } from 'meteor/templating';


Template.__checkName("SvelteComponent");
Template.SvelteComponent = new Template("Template.SvelteComponent", () => []);

Template.SvelteComponent.onRendered(function onRendered() {
  const options = {
    target: this.view._domrange.parentElement,
    anchor: this.view._domrange.lastNode(),
    props: this.data.props || {},
  };

  if (this.view.templateContentBlock) {
    options.props.$$slots = {default: [create_default_slot]};
    options.props.$$scope = {ctx: [this.view.templateContentBlock]};
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
});

Template.SvelteComponent.onDestroyed(function onDestroyed() {
  this.component.$destroy();
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
