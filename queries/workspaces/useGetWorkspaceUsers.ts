// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getWorkspaceUsers = (url: string) => axios.get(url).then(res => res.data)

const useGetWorkspaceUsers = (accountId: string, workspaceId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/workspace/${workspaceId}/users?account_id=${accountId}`, getWorkspaceUsers)
    return {
        workspaceUsers: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetWorkspaceUsers;