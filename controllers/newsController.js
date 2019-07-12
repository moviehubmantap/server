const axios = require('axios')

const ax = axios.create({
    baseURL: 'https://newsapi.org/v2/'
})

class NewsController {
    static fetchAll(req, res, next) {
        console.log(req.query);
        
        ax.get(`everything?q=${req.query.q}&page=2&apikey=${process.env.NEWS_APIKEY}`)
        .then(({data})=>{
            console.log(data.articles);
            
            let senddata = {
                data1 : data.articles[0],
                data2: data.articles[1],
                data3: data.articles[2],
                data4: data.articles[3]
            }
            res.status(200).json(senddata)
        })
        .catch(next)

    }

    static fetchDetail(req,res, next){
        console.log(req.query);
        console.log(req.params);
        
        
        ax.get(`everything?q=${req.query.q}&page=2&apikey=${process.env.NEWS_APIKEY}`)
        .then(({data})=>{
            let temp = ''
            data.articles.forEach(news => {
                if(news.title.includes(req.params.id)){
                    temp = news
                }
            });
            if(temp){
                res.status(200).json(temp)
            }else{
                res.status(404).json({
                    message: 'Its empty'
                })
            }
        })
        .catch(next)
    }
}

module.exports = NewsController