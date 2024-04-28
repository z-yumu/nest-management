import * as fs from 'fs'
import * as path from 'path'


const isProd = process.env.NODE_ENV = 'production'



function parseEnv(){
    const devEnv = path .resolve('.env.dev')
    const prodEnv = path.resolve('.env.prod')

    if(!fs.existsSync(devEnv) && !fs.existsSync(prodEnv)) throw new Error('env file not found')
        // existsSync是判断文件是否存在
        const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : devEnv
        return {path: filePath}
}


export default parseEnv()