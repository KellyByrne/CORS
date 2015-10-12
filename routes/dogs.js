var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/dogs');
var dogs = db.get('dogs');
/* GET users listing. */
router.get('/', function(req, res, next) {
 dogs.find({}, function(err, dogs) {
 	res.render('dogs/index', {allDogs: dogs})
 });
});

router.get('/new', function(req, res, next) {
	res.render('dogs/new')
});

router.post('/', function(req, res, next) {
	dogs.insert({
		name: req.body.name,
		owner: req.body.owner
	}, function(err, dog){
		res.redirect('/dogs')
	})
})

router.get('/:id', function(req, res, next){
	dogs.findOne({_id: req.params.id}, function(err, dog) {
		res.render('dogs/show', {
			id: dog._id,
			theDog: dog,
			name: dog.name,
			owner: dog.owner})
	})
})

router.get('/:id/edit', function(req, res, next){
	dogs.findOne({_id: req.params.id}, function(err, dog) {
		res.render('dogs/edit', {
			name: req.body.name,
			owner: req.body.owner})
	})
})

router.post('/:id/edit', function(req, res, next){
	dogs.updateById(req.params.id, {
			name: req.body.name,
			owner: req.body.owner}, function(err, dog){
				res.redirect('/dogs/' + req.params.id)
	})
})




















module.exports = router;
