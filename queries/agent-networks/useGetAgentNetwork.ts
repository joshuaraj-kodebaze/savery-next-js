// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getAgentNetwork = (url: string) => axios.get(url).then(res => res.data)

const useGetAgentNetwork = (accountId: string, workspaceId: string, projectId: string, agentNetworkId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/agent_network/${workspaceId}/${projectId}/${agentNetworkId}?account_id=${accountId}`, getAgentNetwork)
    return {
        agentNetwork: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetAgentNetwork;