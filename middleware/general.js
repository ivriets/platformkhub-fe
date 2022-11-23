// import CryptoJS from 'crypto-js';

export default function ({app, redirect, $axios}) {
    const token = app.$cookies.get('jtoken');
    // console.log(user)
    
    if (!token) {
        redirect('/clear')
    } else {
        // $axios.interceptors.request.use(config => {
        // if (token) {
        //     config.headers['Authorization'] = `JWT ${token}`
        // }
        //     return config
        // })

        // $axios({
        //     method: 'get',
        //     url: 'accounts/',
        //     baseURL: 'https://base.api.k-hub.org/a3/'
        // }).then(res => {
        //     console.log(res.data)
        // }).catch(() => redirect('/clear'))

        // redirect('/clear')
    }
}