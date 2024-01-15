module.exports = {
    apps: [
      {
        script: 'pm2 serve ./build 6666 --name "ileave-react-prod" --spa',
        'env_production': {
          'NODE_ENV': 'production',
          'CONFIG_FILE': 'prod.env',
        },
      },
    ],

    deploy: {
      production: {
        user: 'root',
        host: 'ileave.prod',
        ref: 'origin/main',
        repo: 'git@i-leave-react.github.com:trangthuy2296/i-leave-react.git',
        path: '/root/apps/ileave-react/source',
        'pre-deploy-local': '',
        'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.prod.config.js --env production',
        'pre-setup': '',
      },
    },
  };