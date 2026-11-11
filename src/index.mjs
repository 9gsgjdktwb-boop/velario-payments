import { readConfig } from './config.mjs';
import { Store } from './store.mjs';
import { createProviders } from './providers.mjs';
import { createApp } from './app.mjs';

const config=readConfig();
const store=new Store(config.databasePath);
const {server}=createApp({config,store,providers:createProviders(config)});
server.listen(config.port,config.host,()=>console.log(`Velario payments server listening on ${config.host}:${config.port}; mode=${config.mode}`));
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close(()=>{store.close();process.exit(0);}));
