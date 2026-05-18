import { getVersionGroups, getLearnMethods } from './actions';
import AdminMoveClient from './client';

export default async function AdminMovePage() {
  const [versionGroups, learnMethods] = await Promise.all([
    getVersionGroups(),
    getLearnMethods(),
  ]);

  return (
    <div className=" bg-muted">
      {' '}
      <div className="mx-auto max-w-6xl p-6 bg-background">
        <h1 className="mb-8 text-xl font-bold">어드민 &gt; 기술 관리</h1>
        <AdminMoveClient
          versionGroups={versionGroups}
          learnMethods={learnMethods}
        />
      </div>
    </div>
  );
}
