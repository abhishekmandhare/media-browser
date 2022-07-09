export interface Torrent {
    url: String
    quality: String
    size : String
}

export interface Media{
    id: Number
    imdb_code: String
    genres: String[]
    summary: String
    torrents : Torrent[]
    title: String
}
