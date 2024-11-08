// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setDeleteWorkspace = (url: string) => axios.delete(url).then(res => res.data)

const useDeleteWorkspace = (accountId: string, workspaceId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/workspace/${workspaceId}?account_id=${accountId}`, setDeleteWorkspace)
    return {
        deleteWorkspace: trigger,
        isMutating
    }
}

export default useDeleteWorkspace;