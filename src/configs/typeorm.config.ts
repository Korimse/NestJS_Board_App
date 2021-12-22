import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: '1234',
    database: 'test_db',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true
}