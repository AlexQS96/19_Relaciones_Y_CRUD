module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor_Movie';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        actor_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        },
        movie_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
        }
    };
    let config = {
        freezeTableName: true,
        tablename : 'actor_movie',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
    const Actor_Movie = sequelize.define(alias, cols, config); 
 
    return Actor_Movie
};