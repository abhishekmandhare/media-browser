import axios from "axios"
import { MoviesParams, YifyResponse, MoviesResponse } from "../model/media"

const BASEURL = "https://yts.mx/api/v2/"

export class YifyService {
    constructor(private readonly baseUrl?: string) { }

    async getMovies(params?: MoviesParams) {
        const { data } = await axios.get<YifyResponse<MoviesResponse>>(
            `${this.baseUrl || BASEURL}list_movies.json`,
            {
                params,
            },
        )
        .catch(e =>{
            throw new Error(e)
        })
        return data
    }

   
}