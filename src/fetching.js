const api_url = "http://www.thecocktaildb.com/api/json/v1/1/list.php?g=list";

//FETCH A RANDOM JOKE

export const fetchGlassTypes = async () => {
    try {
        const response = await fetch(api_url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};
