// @flow
import type Item from '../../containers/item';
import type { ModProps } from '../../schema';

import { anySet } from '../../util/Flags';
import Mod from '../../mods/Mod';
import ItemOrb from './ItemOrb';

export default class Vaal extends ItemOrb {
  static modFilter(mod: ModProps): boolean {
    // vaal implicits
    return [Mod.TYPE.VAAL].indexOf(mod.generation_type) !== -1;
  }

  static build(mods: ModProps[]): Vaal {
    return super.build(mods, Vaal.modFilter, Vaal);
  }

  /**
   * replaces implicit with vaal implicit
   * TODO: white sockets, reroll (brick(, nothing
   */
  applyTo(item: Item): Item {
    if (!anySet(this.applicableTo(item))) {
      const blank_item = item.removeAllImplicits();

      const implicit = this.chooseMod(blank_item);

      if (implicit != null) {
        const vaaled_item = blank_item.addMod(implicit);

        if (vaaled_item !== blank_item) {
          return vaaled_item.corrupt();
        }
      }
    }

    // nothing changed
    return item;
  }
}
