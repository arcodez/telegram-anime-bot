const axios = require('axios')
const cheerio = require("cheerio")

async function scrapeImages() {
    try {
        const response = await axios.get('https://g6hentai.com/photos_channels/1/hentai/')
        const $ = cheerio.load(response.data)
        const images = $('img')
        const imageUrls = []
        images.each((index, element) => {
            const imageUrl = $(element).attr('src')
            imageUrls.push(imageUrl)
        })

        const randomNumber = Math.floor(Math.random() * imageUrls.length)
        console.log(imageUrls[randomNumber])

    } catch (error) {

        console.log(error)
    }
}

scrapeImages()