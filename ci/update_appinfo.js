const DateFormat = require('fast-date-format'),
  fs = require('fs-extra'),
  path = require('path'),
  pkgJson = require('../package.json');

const r = (...p) => path.resolve(__dirname, '../', ...p)

const infoPath = 'src/bascore/info.json';

const infoFile = r(infoPath);

const dateFormat = new DateFormat('YYMMDD_HHmm')

updateAppInfo(infoFile)


async function updateAppInfo(infoFilePath){
  fs.ensureFileSync(infoFilePath)

  const ver = pkgJson.version||'2.1.0';
  const name = pkgJson.name || 'bas-exchange'
  const author = pkgJson.author || "bas-team"
  const tagts = dateFormat.format(new Date())
  const buildTag = `${ver}_${tagts}`;


  let info = {
    name:"bas-portal"
  }
  // try{
  //    info = fs.readJsonSync(infoFilePath);
  // }catch(ex){
  //   console.log(ex)
  // }

  const infoJson = Object.assign({},info,{
    "name":name,
    "author":author,
    "version":ver,
    "buildTag": buildTag,
    "description":"BAS Chain Exchange"
  })

  fs.outputJsonSync(
    infoFilePath,
    infoJson,
    {
      spaces: 2,
      EOL: '\n'
    }
  )
}
