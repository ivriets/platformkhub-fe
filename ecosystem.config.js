
module.exports = {
    apps : [
        {
            name: 'superadmin',
            exec_mode: 'cluster',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            max_memory_restart: '1G',
            instances: "max",

        }
    ],
    deploy : {
      // "production" is the environment name
        production : {
            user: 'root',
            host: ['172.104.77.135'],
            ref: 'origin/main',
            repo: 'git@github.com:steven1218026/platformkhub-fe.git',
            ssh_options: ['ForwardAgent=yes'],
            path: '/var/www/superadmin.k-hub.org',
            'post-deploy' : 'yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'

        }
    }
}