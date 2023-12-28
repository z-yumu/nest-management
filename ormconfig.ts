import { DataSourceOptions } from 'typeorm'

const ormConfig:DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1213456",
  database: "yum",
  synchronize: true,
  // retryDelay:5000, //重试连接数据库间隔
  // retryAttempts:5,//重试连接数据库的次数
  // autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组
}

export default ormConfig