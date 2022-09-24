import axios from "axios";

async function getDataFromPixabay(query = "", page = 1, per_page = 12){
    const apiKey = "29155901-7a6502b1ec64ba72602e491fa";
    const url = "https://pixabay.com/api/";
    try{
        console.log(query);
        const response = await axios.get(url, 
            {
                params:{
                    key: apiKey,
                    q: query,
                    page,
                    per_page
                }
            })
        console.log(response);
        response.data.hits = response.data.hits.map(item => {
            return {
                id: item.id,
                webUrl: item.webformatURL,
                largeUrl: item.largeImageURL
            }
        }) 
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export { getDataFromPixabay }; 