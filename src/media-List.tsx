import React, { useState, useEffect } from 'react'
import { Media } from './model/media'
import axios from 'axios'

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
            <ul>
                <ul>
                    {mediaList && mediaList.map(({ id, summary }: any) => {
                        return <li key={id}>{summary}</li>;
                    })}

                </ul>
            </ul>
        </div>
    )
}

