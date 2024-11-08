// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getProjects = (url: string) => axios.get(url).then(res => res.data)

const useGetProjects = (accountId: string, workspaceId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/project/${workspaceId}?account_id=${accountId}`, getProjects, {
        revalidateOnMount: true
    })
    return {
        projects: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetProjects;