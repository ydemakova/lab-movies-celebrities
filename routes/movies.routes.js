const router = require('express').Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

/**
 * create === POST
 * read === GET
 * update === PUT / PATCH
 * delete === DELETE
 */

// View routes:

// Movies list (read)
router.get('/movies', (req, res, next) => {
	Movie.find()
		.populate('cast')
		.then((movies) => {
			console.log(movies)
			res.render('movies/list', { movies })
		})
		.catch((err) => next(err))
})

// Movies new form (read)
router.get('/movies/new', (req, res, next) => {
	Celebrity.find()
		.then((celebrities) => {
			console.log(celebrities)
			res.render('movies/new', { celebrities })
		})
		.catch((err) => next(err))
})

// Movies edit form (read)
router.get('/movies/edit/:id', (req, res, next) => {
	const id = req.params.id
	Promise.all([Movie.findById(id), Celebrity.find()])
		.then(([movie, celebrities]) => {
			console.log(celebrities)
			res.render('movies/edit', { movie, celebrities })
		})
		.catch((err) => next(err))
})

// Database routes:

// Movies create
router.post('/movies', (req, res, next) => {
	const movie = req.body
	Movie.create(movie)
		.then(() => res.redirect('/movies'))
		.catch((err) => next(err))
})

// Movies update
router.post('/movies/save/:id', (req, res, next) => {
	const id = req.params.id
	const movie = req.body
	Movie.findByIdAndUpdate(id, movie)
		.then(() => res.redirect('/movies'))
		.catch((err) => next(err))
})

// Movies delete
router.get('/movies/delete/:id', (req, res, next) => {
	const id = req.params.id
	Movie.findByIdAndDelete(id)
		.then(() => res.redirect('/movies'))
		.catch((err) => next(err))
})

module.exports = router
