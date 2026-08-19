import { fetchMoveEditorData } from '../_entities/move/fetchMoveEditorData';
import { MoveEditor } from '../_widgets/MoveEditor';

export default async function MoveIdentifierEditorPage({
  params,
}: {
  params: Promise<{ identifier: string }>;
}) {
  const { identifier } = await params;
  const view = await fetchMoveEditorData(identifier);

  return <MoveEditor view={view} />;
}
