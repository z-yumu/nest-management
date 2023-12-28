import { DataSourceOptions } from 'typeorm'

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1213456',
  database: 'yum',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'], // 迁移
  subscribers: ['subscriber/*{.ts,.js}'], // 订阅者
}

export default ormConfig
