// @flow
import Mod from '../../../../mods/Mod';
import type PropsTable from '../../../../helpers/PropsTable';
import type { BaseItemTypeProps, ModProps } from '../../../../schema';
import { createTables } from '../../../../__fixtures__/util';

import Item from '../../Item';

const tables = createTables();

const items = (tables.items: PropsTable<BaseItemTypeProps, Item>);
const mods = (tables.mods: PropsTable<ModProps, Mod>);

const ofBrute = mods.fromPrimary(0);
const sturdy = mods.fromPrimary(1465);

it('should generate the name lines like ingame', () => {
  const normal = items.fromPrimary(1650);

  expect(normal.name.lines()).toEqual(['Iron Greaves']);

  const magic = normal.rarity.set('magic');

  expect(magic.name.lines()).toEqual(['Iron Greaves']);
  expect(magic.addMod(ofBrute).name.lines()).toEqual([
    'Iron Greaves of the Brute',
  ]);
  expect(
    magic
      .addMod(ofBrute)
      .addMod(sturdy)
      .name.lines(),
  ).toEqual(['Sturdy Iron Greaves of the Brute']);

  const rare = normal.rarity.set('rare');

  expect(rare.name.lines()).toEqual(['Random Name', 'Iron Greaves']);

  const unique = normal.rarity.set('unique');

  expect(unique.name.lines()).toEqual(['TODO unique name?', 'Iron Greaves']);
});

it('should always have a name', () => {
  expect(items.fromPrimary(1650).name.any()).toBe(true);
});
