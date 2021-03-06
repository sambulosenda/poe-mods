// @flow
import type { Container } from '../containers/Container';
import type Mod from '../mods/Mod';
import META_MODS from '../mods/meta_mods';

import AbstractMethod from '../exceptions/AbstractMethod';
import { type Flags, anySet } from '../util/Flags';

export type GeneratorDetails<M: Mod> = {
  mod: M,
  applicable?: Flags<*>,
  spawnable?: Flags<*>,
  spawnweight?: number,
};

export type ModApplicableFlag =
  | 'domain_full'
  | 'already_present'
  | 'wrong_domain'
  | 'lower_ilvl'
  | 'above_lld_level';
export type ModApplicableFlags = Flags<ModApplicableFlag>;

/**
 * @abstract
 */
export default class Generator<M: Mod, C: Container<*>> {
  mods: M[];

  constructor(mods: M[]) {
    this.mods = mods;
  }

  // eslint-disable-next-line no-unused-vars
  applyTo(container: C): C {
    throw new AbstractMethod(`${this.constructor.name}#applyTo`);
  }

  // eslint-disable-next-line no-unused-vars
  modsFor(container: C, whitelist: string[] = []): GeneratorDetails<M>[] {
    throw new AbstractMethod(`${this.constructor.name}#modsFor`);
  }

  // eslint-disable-next-line no-unused-vars
  applicableTo(container: C): Flags<*> {
    throw new AbstractMethod(`${this.constructor.name}#applicableTo`);
  }

  /**
   * returns a copy of #mods
   * 
   * we can stick with a shallow copy since Mod are supposed to be immutable
   */
  getAvailableMods(): M[] {
    return this.mods.slice();
  }

  // eslint-disable-next-line no-unused-vars
  isApplicableTo(container: C, whitelist: string[] = []): boolean {
    return !anySet(this.applicableTo(container), whitelist);
  }

  isModApplicableTo(mod: M, container: C): ModApplicableFlags {
    const applicable_flags: ModApplicableFlags = {
      domain_full: false,
      already_present: false,
      wrong_domain: false,
      lower_ilvl: false,
      above_lld_level: false,
    };

    if (!container.inDomainOf(mod.props.domain)) {
      applicable_flags.wrong_domain = true;
    } else if (!container.hasRoomFor(mod)) {
      applicable_flags.domain_full = true;
    }

    if (mod.props.level > container.level()) {
      applicable_flags.lower_ilvl = true;
    }

    if (container.hasModGroup(mod)) {
      applicable_flags.already_present = true;
    }

    const has_leo_meta_mod =
      container.indexOfModWithPrimary(META_MODS.LLD_MOD) !== -1;

    if (mod.requiredLevel() > 28 && has_leo_meta_mod) {
      applicable_flags.above_lld_level = true;
    }

    return applicable_flags;
  }
}
