import CryptoJS from 'crypto-js';

export default function ({ $axios, redirect, app }, inject) {
    const apiLog = $axios.create({
      headers: {
        'X-Api-Key': 'JDCsOuUr.xomfRKR4t4fs3uedwhUvfyU3ZkUVJDWl'
      },
      // proxy: true
    })
  
    apiLog.interceptors.request.use(config => {
      // const token = app.$cookiz.get('t12')
      // const bytes = CryptoJS.AES.decrypt(app.$cookiz.get('t12'), process.env.SECRET_KEY_TOKEN);
      // var token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      var token = app.$cookies.get('jtoken')

      if (token) {
        config.headers['Authorization'] = `JWT ${token}`
        // config.headers['X-Auth-Token'] = token
      }
      return config
    })
    apiLog.onError(error => {
      const dataError = { ...error.response }
      console.log(JSON.stringify(dataError.status))
      if (dataError) {
        if (dataError.status == 401) {
          // redirect('/logout')
        }
      }
    })
  
    const endPoint = 'https://log.api.k-hub.org/'
    apiLog.setBaseURL(endPoint)
  
    // Inject to context as $api
    inject('apiLog', apiLog)
  }