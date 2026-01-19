import dbConnect from '@/app/shared/lib/mongoose';

import { EvolutionTreeModel, type EvolutionTreeView } from '../model';

export async function getEvolutionTree(evolutionId: number | null) {
  if (!evolutionId) {
    return null;
  }

  try {
    await dbConnect();

    const query = { id: evolutionId };
    const projection = { _id: 0 };

    const evolutionChains = await EvolutionTreeModel.findOne(
      query,
      projection,
    ).lean<EvolutionTreeView>();

    if (!evolutionChains) {
      return null;
    }

    return evolutionChains;
  } catch (error) {
    console.error(error);
    return null;
  }
}
