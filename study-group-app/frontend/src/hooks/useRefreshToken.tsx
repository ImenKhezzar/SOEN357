import axios from "../api/axios";
import useAuth from "./useAuth";

interface Auth {
    accessToken: string;
    [key: string]: any;
}

interface ResponseData {
    accessToken: string;
}

const useRefreshToken = () => {
    const authContext = useAuth();
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const { setAuth } = authContext;

    const refresh = async (): Promise<string | undefined> => {
        try {
            const response = await axios.get<ResponseData>('/refresh', {
                withCredentials: true,
            });
            setAuth((prev: Auth) => {
                console.log(JSON.stringify(prev));
                console.log(JSON.stringify(response.data.accessToken));
                return { ...prev, accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (err) {
            console.error('Failed to refresh token', err);
        }
    };

    return refresh;
}

export default useRefreshToken;