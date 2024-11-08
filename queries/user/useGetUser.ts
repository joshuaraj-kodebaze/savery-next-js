// Import libraries
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

const getUser = (url: string) => axios.get(url).then(res => res.data)

const useGetUser = () => {
    const { data, error, isLoading } = useSWRImmutable(`/api/v1/user`, getUser)
    return {
        user: data,
        isLoading,
        isError: error
    }
}

export default useGetUser;