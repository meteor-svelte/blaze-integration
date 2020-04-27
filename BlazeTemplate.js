import { SvelteComponent, create_slot, get_slot_changes, get_slot_context, init, noop, safe_not_equal, transition_in, transition_out } from "svelte/internal";
import { ReactiveVar } from "meteor/reactive-var";

function create_fragment(ctx) {
  let blazeView;
  let current;
  const default_slot_template = /*$$slots*/ ctx[3].default;
  let default_slot;

  return {
    c: noop,
    m(target, anchor) {
      const templ = (typeof ctx[0] === 'string') ? Template[ctx[0]] : ctx[0];
      const data = ctx[1];

      blazeView = Blaze.renderWithData(templ.constructView(function () {
        if (this.isRendered) {
          return;
        }
        const $$scope = ctx[2];
        const $$slots = ctx[3];
        default_slot = create_slot(default_slot_template, ctx, $$scope, null);
        if (default_slot) {
          Tracker.nonreactive(() => {
            default_slot.c();
          });

          this.onViewReady(() => {
            default_slot.m(this._domrange.parentElement, this.lastNode());
          });
          this.onViewDestroyed(() => {
            default_slot.d(1);
            default_slot = null;
          });
        }
      }), () => data.get(), target, anchor);

      current = true;
    },
    p(ctx, [dirty]) {
      if (default_slot && default_slot.p && dirty & /*$$scope*/ 4) {
        default_slot.p(
          get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[2], null),
          get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null));
      }
    },
    i(local) {
      if (!current) {
        transition_in(default_slot, local);
        current = true;
      }
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        Blaze.remove(blazeView);
      }
    }
  };
}

function instance($$self, $$props, $$invalidate) {
  let { template, $$scope } = $$props;
  const { $$slots = {} } = $$props;
  const data = new ReactiveVar($$props.data);

  $$self.$set = $$props => {
    if ("data" in $$props) {
      data.set($$props.data);
    }
    if ("$$scope" in $$props) {
      $$invalidate(2, $$scope = $$props.$$scope);
    }
  };

  return [template, data, $$scope, $$slots];
}

class BlazeTemplate extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {template: 0, data: 1});
  }
}

export default BlazeTemplate;
