// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setCreateAgentNetwork = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then(res => res.data)

const useCreateAgentNetwork = (accountId: string, workspaceId: string, projectId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/agent_network/${workspaceId}/${projectId}?account_id=${accountId}`, setCreateAgentNetwork)
    return {
        createAgentNetwork: trigger,
        isMutating
    }
}

export default useCreateAgentNetwork;