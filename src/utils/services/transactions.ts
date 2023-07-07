export const fetchUpiIds = async () => {
    try {
        // const response = await axiosInstance.post(LOGIN, credentials);
        // return response.data;
        return [
            'UPI 1',
            'UPI 2',
            'UPI 3',
            'UPI 4',
        ]
    } catch (error: any) {
        throw error;
    }
}