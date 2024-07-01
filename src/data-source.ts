import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "1234",
    database: "expressdb",
    entities: ["src/models/entities/*.ts"],
    synchronize: true
    
})

export default AppDataSource;

