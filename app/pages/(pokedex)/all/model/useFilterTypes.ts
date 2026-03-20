import { type Type } from '@/app/entities/type/model';
import { useState } from 'react';

export default function useFilterTypes() {
  const [filterTypes, setFilterTypes] = useState<Type[]>();
}
