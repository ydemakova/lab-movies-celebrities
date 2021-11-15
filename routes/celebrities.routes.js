const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

/**
 * create === POST
 * read === GET
 * update === PUT / PATCH
 * delete === DELETE
 */

// View routes:

// Celebrities list (read)
router.get('/celebrities', (req, res, next) => {
	Celebrity.find()
		.then((celebrities) => res.render('celebrities/list', { celebrities }))
		.catch((err) => next(err))
})

// Celebrities new form (read)
router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new')
})

// Celebrities edit form (read)
router.get('/celebrities/edit/:id', (req, res, next) => {
	const id = req.params.id
	Celebrity.findById(id)
		.then((celebrity) => res.render('celebrities/edit', { celebrity }))
		.catch((err) => next(err))
})

// Database routes:

// Celebrities create
router.post('/celebrities', (req, res, next) => {
	const celebrity = req.body
	Celebrity.create(celebrity)
		.then(() => res.redirect('/celebrities'))
		.catch((err) => next(err))
})

// Celebrities update
router.post('/celebrities/save/:id', (req, res, next) => {
	const id = req.params.id
	const celebrity = req.body
	Celebrity.findByIdAndUpdate(id, celebrity)
		.then(() => res.redirect('/celebrities'))
		.catch((err) => next(err))
})

// Celebrities delete
router.get('/celebrities/delete/:id', (req, res, next) => {
	const id = req.params.id
	Celebrity.findByIdAndDelete(id)
		.then(() => res.redirect('/celebrities'))
		.catch((err) => next(err))
})

module.exports = router
