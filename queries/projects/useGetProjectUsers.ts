// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getProjectUsers = (url: string) => axios.get(url).then(res => res.data)

const useGetProjectUsers = (accountId: string, workspaceId: string, projectId: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable(`/api/v1/project/${workspaceId}/${projectId}/users?account_id=${accountId}`, getProjectUsers)
    return {
        projectUsers: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useGetProjectUsers;