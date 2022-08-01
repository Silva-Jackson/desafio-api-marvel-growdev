import axios from 'axios';
import md5 from 'md5';

const publicKey = 'be2e802bfb1d5d2486924fdfc5799795';
const privateKey = '7497ffce4a1afbb4231c6c962f6a20f32a27a83e';

const ts = Number(new Date());

const hash = md5( ts + privateKey + publicKey);


const api = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public/',
    params: {
        ts,
        apikey: publicKey,
        hash
    },
});

export default api;