import axios from "axios";

export const getData = (q, n) => {
    // const options = {
    //     method: 'GET',
    //     url: 'https://newscatcher.p.rapidapi.com/v1/search',
    //     params: { q:`${q}` , lang: 'en', sort_by: 'relevancy', page: '1', media: 'True' },
    //     headers: {
    //         'x-rapidapi-key': 'd2cb265d03msh5e9204fe49895bap1132d2jsn3bd9549d841d',
    //         'x-rapidapi-host': 'newscatcher.p.rapidapi.com'
    //     }
    // };

    // axios.request(options).then(function (response) {
    //     console.log(response.data.articles);
    //     data = response.data.articles.splice(3);
    // }).catch(function (error) {
    //     console.error(error);
    // });
    var url = 'http://newsapi.org/v2/top-headlines?' + 'country=us&'+ 'apiKey=f3c61ed93a8845d2a543e56ca0f96ac2';
    var data;
    data = axios.get(url).then(res => res.data.articles.splice(n)).catch(err => err);
    console.log("dattttttttttttaaaaaa =>", data)
    return data;
}
