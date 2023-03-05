const { Telegraf } = require("telegraf");
const bot = new Telegraf("6196866919:AAERHn2pYFaRraTXd3SZvtGJxH2eoYM_7tU");
const axios = require('axios')
const cheerio = require("cheerio")

const ecchiImage = "https://th.bing.com/th/id/R.2ed169d99b6579ee640a4e799563fb5b?rik=KvkVT0qzrVRdDw&pid=ImgRaw&r=0"

const hentaiImage = 'https://th.bing.com/th/id/R.462a2bd2a77550a824c62036f64c903a?rik=QmYBMqkSs%2b9llA&riu=http%3a%2f%2fgalleries1.adult-empire.com%2f65%2f6554%2f0035%2fpics%2fpic3.jpg&ehk=vHohJ2U48XtheTs6NrcZmR9UJY65iEOHuEcQ2ZGDOeY%3d&risl=&pid=ImgRaw&r=0'

const yuriImage = 'https://th.bing.com/th/id/R.77b0bb63316e3aaea22a0e7d433655de?rik=XDzkwDByFnrxpA&pid=ImgRaw&r=0'

const animeImage = 'https://th.bing.com/th?id=OIF.pIRnmKlEhnp8t%2f%2fNAqhGgw&pid=ImgDet&rs=1'

const animeDescription = `Shingeki no Kyojin Gaiden: Kuinaki Sentaku(進撃の巨人 外伝 悔いなき選択)
Tipo: OVA
Estado: Finalizado
Episodios: 2
Duración: 28 mins aprox. por ep.
Calificación: 82
Géneros: Acción, Fantasía
Estudios: Production I.G, Wit Studio

Descripción:
Esta precuela del megaéxito Attack on Titan responde a las preguntas: ¿Cómo pasó el capitán Levi de Survey Corps de matón callejero a soldado más fuerte de la humanidad?  ¿Y cómo se convirtió el Comandante Erwin en un líder frío y calculador, dispuesto a sacrificar cualquier cosa para salvar a la raza humana?  ¡Los fuegos que forjaron este vínculo de lealtad y confianza fueron realmente intensos!
`
// Inicio del bot
bot.start((ctx) => ctx.reply("Bienvenido, Puedes pedirme Hentai o Info de anime"));


bot.command('ecchi', (ctx) => {
  ctx.replyWithPhoto({ url: ecchiImage })
})

bot.command('hentai', async (ctx) => {
  try {
    const response = await axios.get('https://www.hentaicloud.com/gallery/hentai')
    const $ = cheerio.load(response.data)
    const images = $('img')
    const imageUrls = []
    images.each((index, element) => {
      const imageUrl = $(element).attr('src')
      imageUrls.push(imageUrl)

    })

    const randomNumber = Math.floor(Math.random() * imageUrls.length)
    const ImageH = imageUrls[randomNumber].split('/').slice(1)[3]
    console.log(ImageH)

    if (ImageH !== undefined && ImageH !== 'img') {
      ctx.replyWithPhoto({ url: `https://www.hentaicloud.com/media/photos/${imageUrls[randomNumber].split('/').slice(1)[3]}` })

    }
    // ctx.replyWithPhoto({url: `https://www.hentaicloud.com/gallery/hentai${imageUrls[randomNumber]}`})

  } catch (error) {

    console.log(error)
    ctx.reply('Intenta de Nuevo')
  }


})

/* bot.command('hentaigifs', async (ctx) => {
  try {
    const response = await axios.get('https://www.hentaicloud.com/gifs')
    const $ = cheerio.load(response.data)
    const images = $('img')
    const imageUrls = []
    images.each((index, element) => {
      const imageUrl = $(element).attr('src')
      imageUrls.push(imageUrl)

    })

    const randomNumber = Math.floor(Math.random() * imageUrls.length)
    console.log(`${imageUrls[randomNumber].split('/').slice(1)[4]}`)
    console.log(imageUrls)
    const gif = imageUrls[randomNumber].split('/').slice(1)[4]
    ctx.replyWithAnimation(`https://www.hentaicloud.com/media/gif/${gif}`)
    // ctx.replyWithPhoto({url: `https://www.hentaicloud.com/gallery/hentai${imageUrls[randomNumber]}`})

  } catch (error) {

  console.log(error)
  ctx.reply('Intenta de Nuevo')
}
}) */

bot.command('yuri', (ctx) => {
  ctx.replyWithPhoto({ url: yuriImage })
})

bot.command('anime', async (ctx) => {

  /* Captamos el mensaje del anime */
  let anime = ctx.message.text.split(" ").slice(1)
  anime = anime.join(" ")

  try {
    /* Hacemos el fetch a la api */
    const data = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${anime}`)
    const response = await data.json()
    console.log(response.data[0].attributes)
    const { canonicalTitle, description, posterImage } = response.data[0].attributes
    const { original } = posterImage

    const newCaption = description.split("\n")[0]

    /* Lo reflejamos en el chat */
    ctx.replyWithPhoto({ url: original, },
      {
        caption: `
    ${canonicalTitle}
    ${newCaption}
    ` })
    ctx.reply(`se esta buscando el anime: ${anime}`)
  } catch (error) {
    ctx.reply("Intenta con el nombre en ingles")
  }
})

/* bot.command('gif', (ctx) => {
  ctx.replyWithAnimation('https://www.hentaicloud.com/media/gif/3/3405.webp');
});

bot.command('archivo', (ctx) => {
  ctx.replyWithDocument({ url: 'https://www.hentaicloud.com/media/gif/3/3405.webp' });
});
 */

bot.launch();
