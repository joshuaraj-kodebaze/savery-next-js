// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getWorkspace = (url: string) => axios.get(url).then(res => res.data)

const useGetWorkspace = (accountId: string, workspaceId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/workspace/${workspaceId}?account_id=${accountId}`, getWorkspace)
    return {
        workspace: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetWorkspace;