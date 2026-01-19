import mongoose from 'mongoose';

export interface RawCondition {
  key: string;
  value: string | number | boolean;
}

export interface RawDetail {
  trigger: string;
  display: string;
  conditions: RawCondition[];
}

const ConditionSchema = new mongoose.Schema(
  {
    key: String,
    value: mongoose.Schema.Types.Mixed,
  },
  { _id: false },
);

const DetailSchema = new mongoose.Schema(
  {
    trigger: String,
    display: String,
    conditions: [ConditionSchema],
  },
  { _id: false },
);

const rootSchema = new mongoose.Schema(
  {
    id: Number,
    dexNumber: Number,
    name: String,
    form: String,
    sprite: String,
    pokeKey: String,
    details: [DetailSchema],
    next: [], // ← placeholder
  },
  { _id: false },
);

rootSchema.add({
  next: [rootSchema],
});

const EvolutionTreeSchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true, required: true },
  roots: [rootSchema],
});

const EvolutionTreeModel =
  mongoose.models.EvolutionTree ||
  mongoose.model('EvolutionTree', EvolutionTreeSchema, 'evolution_tree');

export { EvolutionTreeModel };
