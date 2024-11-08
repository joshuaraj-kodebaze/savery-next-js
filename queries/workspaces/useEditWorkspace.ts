// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setEditWorkspace = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then(res => res.data)

const useEditWorkspace = (accountId: string, workspaceId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/workspace/${workspaceId}?account_id=${accountId}`, setEditWorkspace)
    return {
        editWorkspace: trigger,
        isMutating
    }
}

export default useEditWorkspace;