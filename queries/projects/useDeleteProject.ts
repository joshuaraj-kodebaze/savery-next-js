// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setDeleteProject = (url: string) => axios.delete(url).then(res => res.data)

const useDeleteProject = (accountId: string, workspaceId: string, projectId: string) => {

    const { trigger, isMutating } = useSWRMutation(`/api/v1/project/${workspaceId}/${projectId}?account_id=${accountId}`, setDeleteProject)
    return {
        deleteProject: trigger,
        isMutating
    }
}

export default useDeleteProject;