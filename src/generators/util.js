// @flow
import { type GeneratorDetails } from './Generator';

// filter nothing
const allowAll = () => true;

export type WithSpawnchance = {
  spawnchance: number,
};

export const calculateSpawnchance = (
  collection: GeneratorDetails<*>[],
  filter?: (GeneratorDetails<*>) => boolean = allowAll,
): Array<GeneratorDetails<*> & WithSpawnchance> => {
  const sum_spawnweight = collection.reduce((sum, details) => {
    if (details.spawnweight != null && filter(details)) {
      return sum + details.spawnweight;
    } else {
      return sum;
    }
  }, 0);

  return collection.map(details => {
    let spawnchance = 0;

    if (details.spawnweight != null && filter(details)) {
      spawnchance = details.spawnweight / sum_spawnweight;
    }

    return {
      ...details,
      spawnchance,
    };
  });
};
