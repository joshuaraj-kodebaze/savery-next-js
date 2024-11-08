// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setEditProject = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then(res => res.data)

const useEditProject = (accountId: string, workspaceId: string, projectId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/project/${workspaceId}/${projectId}?account_id=${accountId}`, setEditProject)
    return {
        editProject: trigger,
        isMutating
    }
}

export default useEditProject;