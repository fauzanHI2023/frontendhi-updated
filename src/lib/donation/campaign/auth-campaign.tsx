import axios from "axios";

export const fetchCampaign = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign-api`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY_CAMPAIGN || "",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching campaign", error);
        return null;
    }
}