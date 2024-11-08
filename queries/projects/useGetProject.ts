// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getProject = (url: string) => axios.get(url).then(res => res.data)

const useGetProject = (accountId: string, workspaceId: string, projectId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/project/${workspaceId}/${projectId}?account_id=${accountId}`, getProject)
    return {
        project: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetProject;