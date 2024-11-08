// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getWorkspaces = (url: string) => axios.get(url).then(res => res.data)

const useGetWorkspaces = (accountId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/workspace?account_id=${accountId}`, getWorkspaces, {
        revalidateOnMount: true
    })
    return {
        workspaces: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetWorkspaces;