import { postgraphile, PostGraphileOptions } from 'postgraphile'
import config from '../config';
import { createServer, ServerResponse } from 'http';

createServer(
    postgraphile(
        config.host, 
        config.schema, 
        config.options as PostGraphileOptions<any, ServerResponse>
    )
)
.listen(80);
