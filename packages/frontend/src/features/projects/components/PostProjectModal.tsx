import { AppButton } from '../../../components';
import { PostProjectForm } from './PostProjectForm';
import type { Project } from '@pkg/shared';

export function PostProjectModal({ id, show, close }: { id: Project["id"], show: boolean, close: () => void }) {
  if (!show) return null;

  return (
    <div className='fixed bg-gray-400 top-1/2 left-1/2 translate-1/2'>
      <PostProjectForm id={id} />
      <AppButton variant="secondary" onClick={close}>閉じる</AppButton>
    </div>
  )
}
