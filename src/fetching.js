const api_url = `https://icanhazdadjoke.com`;

//FETCH A RANDOM JOKE

export const singleJoke = async () => {
    try {
        const response = await fetch(api_url, {
            headers: {
                Accept: "text/plain",
            },
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};
