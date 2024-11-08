// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getAgentNetworkUsers = (url: string) => axios.get(url).then(res => res.data)

const useGetAgentNetworkUsers = (accountId: string, workspaceId: string, projectId: string, agentNetworkId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/agent_network/${workspaceId}/${projectId}/${agentNetworkId}/users?account_id=${accountId}`, getAgentNetworkUsers)
    return {
        agentNetworkUsers: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetAgentNetworkUsers;