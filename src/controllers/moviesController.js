const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;
const Actor_Movies = db.Actor_Movie;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
            .catch(error => {
                console.log("Tenemos un ERROR: "+error);
            });
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            })
            .catch(error => {
                console.log("Tenemos un ERROR: "+error);
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            })
            .catch(error => {
                console.log("Tenemos un ERROR: "+error);
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            })
            .catch(error => {
                console.log("Tenemos un ERROR: "+error);
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll()
        .then(allGenres => {
            res.render('moviesAdd', {
                allGenres
            });
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });
    },
    create: function (req,res) {
        Movies.create({
            title : req.body.title,
            rating : req.body.rating,
            awards : req.body.awards,
            release_date : req.body.release_date,
            length : req.body.length,
            genre_id : req.body.genre_id
        })
        .then(() => {
            res.redirect('/movies');
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });
    },
    edit: function(req,res) {
        let allGenres = [];

        Genres.findAll()
        .then(genre => {
          allGenres = genre;
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });

        Movies.findByPk(req.params.id)
        .then(Movie => {
            res.render('moviesEdit', {
                Movie,
                allGenres
            });
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });
    },
    update: function (req,res) {
        Movies.update({
            title : req.body.title,
            rating : req.body.rating,
            awards : req.body.awards,
            release_date : req.body.release_date,
            length : req.body.length,
            genre_id : req.body.genre_id
        }
        ,
        {
            where : {
                id : req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies');
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });
    },
    delete: function (req,res) {

        Movies.findByPk(req.params.id)
        .then(Movie => {
            res.render('moviesDelete', {Movie});
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });
    },
    destroy: function (req,res) {
        Movies.destroy({
            where : {
                id : req.params.id
            }
        })
        Actors.destroy({
            where: {
                favorite_movie_id : req.params.id,
            }
        })
        Actor_Movies.destroy({
            where : {
                movie_id : req.params.id,
            }
        })
        .then(() => {
            res.redirect('/movies');
        })
        .catch(error => {
            console.log("Tenemos un ERROR: "+error);
        });
    }
}

module.exports = moviesController;