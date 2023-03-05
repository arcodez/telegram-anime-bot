const getAnimeInfo = async () => {
    const data = await fetch('https://nekos.moe/search/images')
    const response = await data.json()
    console.log(response)
}
getAnimeInfo()