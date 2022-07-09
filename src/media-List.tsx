import React, { useState, useEffect } from 'react'
import { Media } from './model/media'
import axios from 'axios'
import { ListGroup } from 'react-bootstrap'

export const MediaList = () => {
    const [mediaList, setMovies] = useState<Media[]>()
    useEffect(() => {
        fetchData()
    }, [])

    const APILINK = "https://yts.mx/api/v2/list_movies.json"

    const fetchData = async () => {
        await axios.get(`${APILINK}`)
            .then((response) => {
                console.log(response)
                setMovies(response.data.data.movies)
            }).catch((err) => console.error(err))
    }

    return (
        <div>
            <ListGroup>
                {mediaList && mediaList.map((m:Media, index) => {
                    let identity: any;
                    identity = m.id
                    return <ListGroup.Item key={identity} variant="info">{m.title}</ListGroup.Item>;
                })}

            </ListGroup>
        </div>
    )
}

