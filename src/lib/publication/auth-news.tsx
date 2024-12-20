import axios from "axios";

export const fetchNews = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/posts-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_NEWS || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching news posts:", error);
    return null;
  }
};
