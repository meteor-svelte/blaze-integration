import { SvelteComponent, detach, element, init, insert, noop, safe_not_equal, space } from "svelte/internal";
import { ReactiveVar } from "meteor/reactive-var";

function create_fragment(ctx) {
  let blazeView;
  return {
    c: noop,
    m(target, anchor) {
      const templ = (typeof ctx[0] === 'string') ? Template[ctx[0]] : ctx[0];
      const data = ctx[1];
      blazeView = Blaze.renderWithData(templ.constructView(), () => data.get(), target, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        Blaze.remove(blazeView);
      }
    }
  };
}

function instance($$self, $$props) {
  let { template } = $$props;
  const data = new ReactiveVar($$props.data);

  $$self.$set = $$props => {
    if ("data" in $$props) {
      data.set($$props.data);
    }
  };

  return [template, data];
}

class BlazeTemplate extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {template: 0, data: 1});
  }
}

export default BlazeTemplate;
