import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["src/entity/*.ts"],
    synchronize: true,
    logging: false
});

export const connect = async () => {
    try {
        await AppDataSource.initialize();
        console.log('database connected successfully!');
    } catch (error) {
        console.error('something went wrong');
    }
}
