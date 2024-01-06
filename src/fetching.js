const api_url = `https://icanhazdadjoke.com`;

//FETCH A RANDOM JOKE

export const fetchSingleJoke = async () => {
    try {
        const response = await fetch(
            api_url,

            {
                headers: {
                    Accept: "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};
