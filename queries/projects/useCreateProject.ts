// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setCreateProject = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then(res => res.data)

const useCreateProject = (accountId: string, workspaceId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/project/${workspaceId}?account_id=${accountId}`, setCreateProject)
    return {
        createProject: trigger,
        isMutating
    }
}

export default useCreateProject;