// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getAgentNetworks = (url: string) => axios.get(url).then(res => res.data)

const useGetAgentNetworks = (accountId: string, workspaceId: string, projectId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/agent_network/${workspaceId}/${projectId}?account_id=${accountId}`, getAgentNetworks, {
        revalidateOnMount: true
    })
    return {
        agentNetworks: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetAgentNetworks;