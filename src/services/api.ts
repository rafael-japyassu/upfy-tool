import axios from 'axios' 

const api = axios.create({
    baseURL: 'http://localhost:3333/api/v1',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
    }
})

export default api