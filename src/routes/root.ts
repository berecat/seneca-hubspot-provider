import router from 'koa-joi-router';

const root = router();

root.get('/', (context) => {
  context.body = 'HubSpot API Service';
});

export default root;
