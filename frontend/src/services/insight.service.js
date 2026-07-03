import api from "./api";

export const getInsight = async () => {
    const response = await api.get("/insights");
    return response.data.data;
};