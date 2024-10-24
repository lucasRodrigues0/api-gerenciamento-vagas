import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "db-api-vagas",
    entities: ["src/entity/*.ts"],
    synchronize: false,
    logging: true
});

export const connect = async () => {
    try {
        await AppDataSource.initialize();
        console.log('banco conectado!');
    } catch (error) {
        console.error('algo deu errado');
    }
}
