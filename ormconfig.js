var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli:{
        migrationsDir: 'migrations'
    },
    migrationsTableName: "custom_migration_table",

};

switch (process.env.NODE_ENV) {
    case 'dev':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
        });
        break;
    case 'productaion':
        null;
        break;
    default:
        throw new Error('unknown env');

}

module.exports = dbConfig;
