// @flow
import { createTables } from '../../__fixtures__/util';
import AtlasNode from '../../containers/AtlasNode';
import Sextant from '../../generators/Sextant';

import Atlas from '../Atlas';

const { atlas: atlas_props, mods } = createTables();

it('should build', () => {
  const atlas = Atlas.build(atlas_props.all());

  expect(atlas).toBeInstanceOf(Atlas);
});

it('should have a human readable getter', () => {
  const atlas = Atlas.build(atlas_props.all());

  expect(atlas.get('Dunes')).toBeInstanceOf(AtlasNode);
  expect(atlas.get('HighGardens')).toBeInstanceOf(AtlasNode);
  expect(() => atlas.get('UndefinedMap')).toThrow(
    "IndexError: 'UndefinedMap' not found",
  );
});

it('should return a new only if it changed', () => {
  const atlas = Atlas.build(atlas_props.all());

  expect(atlas.withMutations(b => b)).toBe(atlas);
  // created a new reference, not checking shallow equal
  expect(atlas.withMutations(b => ({ ...b }))).not.toBe(atlas);
});

it('should add mods', () => {
  const atlas = Atlas.build(atlas_props.all());
  const invasion_mod = mods.fromPrimary(8772);

  const with_mods = atlas.addMod(invasion_mod, 'Dunes');

  expect(with_mods).not.toBe(atlas);
  expect(atlas.get('Dunes')).not.toBe(with_mods.get('Dunes'));
  expect(with_mods.get('Dunes').hasMod(invasion_mod)).toBe(true);

  // node didnt change => atlas didnt change
  expect(with_mods.addMod(invasion_mod, 'Dunes')).toBe(with_mods);
});

it('should remove mods', () => {
  const invasion_mod = mods.fromPrimary(8772);
  const atlas = Atlas.build(atlas_props.all()).addMod(invasion_mod, 'Dunes');

  const without_mods = atlas.removeMod(invasion_mod, 'Dunes');

  expect(without_mods).not.toBe(atlas);
  expect(without_mods.get('Dunes')).not.toBe(atlas.get('Dunes'));
  expect(without_mods.get('Dunes').hasMod(invasion_mod)).toBe(false);

  // node didnt change => atlas didnt change
  expect(without_mods.removeMod(invasion_mod, 'Dunes')).toBe(without_mods);
});

it('should be resettable', () => {
  const invasion_mod = mods.fromPrimary(8772);
  const magick_packs_mod = mods.fromPrimary(8794);
  const atlas = Atlas.build(atlas_props.all())
    .addMod(invasion_mod, 'Dunes')
    .addMod(magick_packs_mod, 'Arcade');

  // pre
  expect(atlas.get('Dunes').hasMod(invasion_mod)).toBe(true);
  expect(atlas.get('Arcade').hasMod(magick_packs_mod)).toBe(true);

  const without_mods = atlas.reset();

  // post
  expect(without_mods).not.toBe(atlas);

  expect(without_mods.get('Dunes').mods).toHaveLength(0);
  expect(without_mods.get('Arcade').mods).toHaveLength(0);

  // reset always changes
  expect(without_mods.reset).not.toBe(without_mods);
});

it('should calc mods from sextants', () => {
  const atlas = Atlas.build(atlas_props.all());
  const sextant = Sextant.build(mods.all());

  const available_mods = atlas
    .modsFor(sextant, 'Dunes')
    .map(({ mod }) => mod.props.id);

  expect(available_mods).toMatchSnapshot();
});

it('should apply sextants', () => {
  const atlas = Atlas.build(atlas_props.all());
  const sextant = Sextant.build(mods.all());

  const crafted = atlas.applySextant(sextant, 'Dunes');

  // post
  expect(crafted.get('Dunes').mods).toHaveLength(1);
  expect(crafted).not.toBe(atlas);

  sextant.type = Sextant.type.apprentice;
  // apprentice on red map
  expect(atlas.applySextant(sextant, 'Plaza')).toBe(atlas);
});
