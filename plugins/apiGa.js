export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const apiGa = $axios.create({
        headers: {
            // "Content-Type": "application/json",
            // 'X-Api-Key': 'l6mntNFO.6zkfiRkvcbr3Z786LY2Ra0kQ2qAppLt1',
            // 'X-Api-Key': 'WeLvU56v.sqyPRcwxgR54PKYcWCXmJ83gwKEiuZau'

            // 'authorization': $store.state.auth
        },
        // proxy: true
    })
  

    // Set baseURL to something different
    apiGa.setBaseURL('/ga')
  
    // Inject to context as $api
    inject('apiGa', apiGa)
  }
  