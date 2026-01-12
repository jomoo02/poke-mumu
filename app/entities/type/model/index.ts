export interface Type {
  id?: number;
  identifier: string;
  name: string;
  generation?: number;
  damageClassId?: number | null;
}
