import { useEffect, useState } from "react";

import { getAnalytics } from "../services/analytics.service";

const useAnalytics = () => {

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {

        getAnalytics()

            .then(setAnalytics)

            .catch(console.error);

    }, []);

    return analytics;

};

export default useAnalytics;