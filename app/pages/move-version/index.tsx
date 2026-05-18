import { getAllVersionGroups } from './api';
import VersionSelectUI from './ui';

export default async function MoveVersionPageUI() {
  const versionGroups = await getAllVersionGroups();

  return <VersionSelectUI versionGroups={versionGroups} />;
}
