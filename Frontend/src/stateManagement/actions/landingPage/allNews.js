import axios from 'axios';
import { GET_NEWS } from "../../types/landingPage";


export function getNews(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/news`);
            console.log(data)
            return dispatch({ type: GET_NEWS, payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};