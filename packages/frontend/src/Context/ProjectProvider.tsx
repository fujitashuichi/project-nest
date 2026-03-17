import type React from 'react'
import { ProjectCtx, type ProjectCtxType } from './ProjectsContext'
import { useCreateProject, useDeleteProject, useGetProjects, useProjectsData, useUpdateProjects } from '../features/projects/hooks'
import { useEffect, useMemo } from 'react'

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const projectsHook = useProjectsData();
  const getProjectsHook = useGetProjects(projectsHook.setProjects);

  const { get } = getProjectsHook;

  const createProjectsHook = useCreateProject(get);
  const updateProjectHook = useUpdateProjects(get);
  const deleteProjects = useDeleteProject(get);

  useEffect(() => {
    get();
  }, []);

  // 楽観更新を導入する際はgetをsetProjectに変える.
  const ctxData: ProjectCtxType = useMemo(() => ({
    projectsData: projectsHook,
    getProjects: getProjectsHook,
    create: createProjectsHook,
    update: updateProjectHook,
    delete: deleteProjects
  }), [projectsHook, getProjectsHook, createProjectsHook, updateProjectHook, deleteProjects]);


  return (
    <ProjectCtx.Provider value={ctxData}>
      {children}
    </ProjectCtx.Provider>
  )
}
