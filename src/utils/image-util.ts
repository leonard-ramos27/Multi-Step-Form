const getImageURL = (name: string) => {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}

export default getImageURL