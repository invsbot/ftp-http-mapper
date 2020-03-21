import SiteMapper from './SiteMapper';
import FtpClientTree from './FtpTreeCreator';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 8080;
const buildPath = path.join(
    __dirname,
    '..',
    '..',
    'site-parser-front',
    'build' );

app.use(bodyParser.json(
    {type: ['application/json', 'text/plain']},
));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(buildPath)));
// app.use(cors());
app.get( '/', async ( req, res ) => {
  res.sendFile(path.join(buildPath, 'index.html'));
} );

app.post('/mapper', async (req, res) => {
  const url = req.body.url as string;
  const deep = Number(req.body.deep);
  try {
    const pageMapper = new SiteMapper(url, deep);
    await pageMapper.parse();
    const urlArray = pageMapper.getPagesArray().slice(0, -1);
    const maxSizePage = pageMapper.getMaxSizePage();
    const minSizePage = pageMapper.getMinPageSize();
    res.json({urlArray, maxSizePage, minSizePage});
  }
  catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

app.post('/ftpMapper', async (req, res) => {
  const ip = req.body.ip as string;
  // const port = Number(req.body.port);
  const user = req.body.user as string;
  const password = req.body.password as string;
  try {
    const ftpClient = new FtpClientTree(ip, 21);
    await ftpClient.connect();
    await ftpClient.login(user, password);
    const response = await ftpClient.createFtpTree();
    res.json({ftpTree: response});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// start the express server
app.listen( port, () => {
  // tslint:disable-next-line:no-console
  console.log( `server started at http://localhost:${ port }` );
} );


