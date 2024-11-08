// Import libraries
import axios from 'axios';
import useSWRMutation from 'swr/mutation';

const setEditAgentNetwork = (url: string, { arg }: { arg: any }) => axios.post(url, arg).then(res => res.data)

const useEditAgentNetwork = (accountId: string, workspaceId: string, projectId: string, agentNetworkId: string) => {
    const { trigger, isMutating } = useSWRMutation(`/api/v1/agent_network/${workspaceId}/${projectId}/${agentNetworkId}?account_id=${accountId}`, setEditAgentNetwork);

    return {
        editAgentNetwork: trigger,
        isMutating
    }
}

export default useEditAgentNetwork;