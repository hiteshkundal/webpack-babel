import '../../envVariable';
import express from 'express';
import path from 'path';
import config from '../../config/webpack.dev';
import webpack from 'webpack';


const app = express();
const compiler = webpack(config);

if (process.env !== 'production') {
    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        config.devServer
    )
    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware)
}

const staticMiddleware = express.static(path.resolve(__dirname, '../../dist'));
app.use(staticMiddleware)

const port = 3000;
app.listen(port, () => console.log(`Server is listening at ${port}`))