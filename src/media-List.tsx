import { useState, useEffect } from 'react'
import { Movie, Order, Quality, Sort, Torrent } from './model/media'
import { ListGroup } from 'react-bootstrap'
import { YifyService } from './service/yify-service'

const IMDB_BASE = "https://www.imdb.com/title/"
const YTS_BASE = "https://yts.do/movie/"

export const MediaList = () => {
    const [mediaList, setMovies] = useState<readonly Movie[]>()
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const yifyService = new YifyService()
        yifyService.getMovies({
            sort_by: Sort.YEAR,
            quality: Quality.TWENTY_ONE_SIXTY_P,
            order_by: Order.DESC,
            limit: 50,
            minimum_rating: 6
        })
            .then(movies => {
                console.log(movies)
                setMovies(movies.data.movies)
            })
            .catch((err) => console.error(err))
    }

    return (
        <div>
            <ListGroup>
                {mediaList && mediaList.map((m: Movie) => {
                    let torrentInfo: Torrent = {} as Torrent
                    m.torrents.forEach(t => {
                        if (t.quality == "2160p") {
                            torrentInfo = t
                        }
                    })
                    const imdbLink = IMDB_BASE + m.imdb_code;
                    const ytsLink = YTS_BASE + m.title.replace(/\s+/g, '-').toLowerCase() + "-" + m.year
                    return <ListGroup.Item key={m.id}>
                        <a href={ytsLink}>{m.title} </a> | Year : {m.year} | <a href={imdbLink}>IMDB Rating: {m.rating}</a> | 
                        Seeds : {torrentInfo.seeds}, peers: {torrentInfo.peers}, quality:{torrentInfo.quality}, size: {torrentInfo.size} <a href={torrentInfo.url}>Download</a></ListGroup.Item>;
                })}

            </ListGroup>
        </div>
    )
}

