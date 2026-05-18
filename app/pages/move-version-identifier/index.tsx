import { notFound } from 'next/navigation';

import { getVersionGroupByIdentifier, getMovesByVersionGroup } from './api';
import VersionMoveListUI from './ui';

export default async function MoveVersionIdentifierPageUI({
  identifier,
}: {
  identifier: string;
}) {
  const versionGroup = await getVersionGroupByIdentifier(identifier);

  if (!versionGroup) notFound();

  const moves = await getMovesByVersionGroup(versionGroup.id);

  return <VersionMoveListUI versionGroup={versionGroup} moves={moves} />;
}
