import { AtlasNode } from '../../containers';

import Sextant from '../Sextant';

const atlas_nodes_props = require('../../__fixtures__/atlas.json');
const mods = require('../../__fixtures__/mods.json');

let atlas;

const getNode = primary => atlas.find(node => node.props.primary === primary);
const getNodeIndex = primary =>
  atlas.findIndex(node => node.props.primary === primary);

const modIds = ({ props: { id } }) => id;

beforeEach(() => {
  atlas = atlas_nodes_props.map(node_props => new AtlasNode([], node_props));
});

it('should build', () => {
  const sextant = Sextant.build(mods);

  expect(sextant).toBeInstanceOf(Sextant);
  expect(sextant.getAvailableMods()).toMatchSnapshot();
});

it('should consider maplevel', () => {
  const sextant = Sextant.build(mods);
  sextant.atlas = atlas;

  const dunes = getNode(26);

  expect(sextant.modsFor(dunes).every(({ mod }) => mod.props.level <= 72)).toBe(
    true,
  );

  const cemetery = getNode(53);
  const cemetery_mods = sextant.modsFor(cemetery);
  // all apprentice
  expect(cemetery_mods.every(({ mod }) => mod.props.level <= 75)).toBe(true);
  // some journeyman's
  expect(cemetery_mods.some(({ mod }) => mod.props.level >= 73)).toBe(true);

  const chimera = getNode(120);
  const chimera_mods = sextant.modsFor(chimera);
  // all apprentice
  expect(chimera_mods.every(({ mod }) => mod.props.level <= 83)).toBe(true);
  // some journeyman's
  expect(chimera_mods.some(({ mod }) => mod.props.level >= 73)).toBe(true);
  // some master's
  expect(chimera_mods.some(({ mod }) => mod.props.level >= 78)).toBe(true);
});

describe('sextant blocking', () => {
  it('should work deterministically', () => {
    const sextant = Sextant.build(mods);
    sextant.atlas = atlas;

    const getMod = primary =>
      sextant.mods.find(({ props }) => primary === props.primary);

    // this is the map on which we wanna block
    const dunes_index = getNodeIndex(26);

    // this is how we achieve it
    const oasis_index = getNodeIndex(7);
    const invasion_mod = getMod(8772);

    const arid_index = getNodeIndex(8);
    const onslaught_mod = getMod(8789);

    const dungeon_index = getNodeIndex(18);
    const turbo_mod = getMod(8776);

    // pre
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toHaveLength(0);

    atlas[oasis_index] = atlas[oasis_index].addMod(invasion_mod);

    // post
    expect(atlas[oasis_index].mods).toContain(invasion_mod);
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      invasion_mod,
    );

    atlas[arid_index] = atlas[arid_index].addMod(onslaught_mod);

    // post
    expect(atlas[arid_index].mods).toContain(onslaught_mod);
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      invasion_mod,
    );
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      onslaught_mod,
    );

    atlas[dungeon_index] = atlas[dungeon_index].addMod(turbo_mod);

    // post
    expect(atlas[dungeon_index].mods).toContain(turbo_mod);
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      invasion_mod,
    );
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(
      onslaught_mod,
    );
    expect(Sextant.blockedMods(atlas[dunes_index], atlas)).toContain(turbo_mod);

    const rollable_mods = sextant
      .modsFor(atlas[dunes_index])
      .map(({ mod }) => mod);
    // just to be safe if referentiel equality is broken
    const rollable_ids = rollable_mods.map(modIds);

    expect(rollable_mods).not.toContain(invasion_mod);
    expect(rollable_ids).not.toContain(invasion_mod.props.id);
    expect(rollable_mods).not.toContain(onslaught_mod);
    expect(rollable_ids).not.toContain(onslaught_mod.props.id);
    expect(rollable_mods).not.toContain(turbo_mod);
    expect(rollable_ids).not.toContain(turbo_mod.props.id);
  });
});

it('shouldnt mutate its context', () => {
  const sextant = Sextant.build(mods);

  const dunes = getNode(26);

  expect(() => sextant.applyTo(dunes)).toThrowError(
    'context not set, set atlas',
  );

  sextant.atlas = atlas;
  const rolled = sextant.applyTo(dunes);

  expect(getNode(26)).toBe(dunes);
  expect(getNode(26)).not.toBe(rolled);

  expect(() => sextant.applyTo(rolled)).toThrowError(
    'context not set, set atlas',
  );
});

it('should consider adjacents for spawnweight if it is zero', () => {
  const sextant = Sextant.build(mods);
  sextant.atlas = atlas;

  const getMod = primary =>
    sextant.mods.find(({ props }) => primary === props.primary);

  const waka_index = getNodeIndex(38);
  const breach_mod = getMod(8811);

  const rollable_mods = sextant.modsFor(atlas[waka_index]);
  expect(rollable_mods.map(({ mod }) => mod)).toContain(breach_mod);
  expect(rollable_mods.every(({ spawnweight }) => spawnweight > 0)).toBe(true);
});

it('should consider sextant types', () => {
  const sextant = Sextant.build(mods);

  const low_tier_map = getNode(12); // marshes
  const mid_tier_map = getNode(76); // courtyard
  const high_tier_map = getNode(105); // plaza

  expect(sextant.type).toBe(Sextant.type.master);
  expect(sextant.applicableTo(low_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(mid_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(high_tier_map)).toEqual({
    wrong_tier_group: false,
  });

  sextant.type = Sextant.type.journeyman;
  expect(sextant.applicableTo(low_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(mid_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(high_tier_map)).toEqual({
    wrong_tier_group: true,
  });

  sextant.type = Sextant.type.apprentice;
  expect(sextant.applicableTo(low_tier_map)).toEqual({
    wrong_tier_group: false,
  });
  expect(sextant.applicableTo(mid_tier_map)).toEqual({
    wrong_tier_group: true,
  });
  expect(sextant.applicableTo(high_tier_map)).toEqual({
    wrong_tier_group: true,
  });
});