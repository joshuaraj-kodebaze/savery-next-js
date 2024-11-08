// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setDeleteAgentNetwork = (url: string) => axios.delete(url).then(res => res.data)

const useDeleteAgentNetwork = (accountId: string, workspaceId: string, projectId: string, agentNetworkId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/agent_network/${workspaceId}/${projectId}/${agentNetworkId}?account_id=${accountId}`, setDeleteAgentNetwork)
    return {
        deleteAgentNetwork: trigger,
        isMutating
    }
}

export default useDeleteAgentNetwork;