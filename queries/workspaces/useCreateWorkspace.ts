// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setCreateWorkspace = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then(res => res.data)

const useCreateWorkspace = (accountId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/workspace?account_id=${accountId}`, setCreateWorkspace)
    return {
        createWorkspace: trigger,
        isMutating
    }
}

export default useCreateWorkspace;