import { useCallback, useEffect, useState } from "react";
import { getInsight } from "../services/insight.service";

const useInsight = () => {
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchInsight = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getInsight();

            setInsight(data);

            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load AI insight.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInsight();
    }, [fetchInsight]);

    return {
        insight,
        loading,
        error,
        refresh: fetchInsight,
    };
};

export default useInsight;