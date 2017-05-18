var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;


	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		projects: [],
	};
	view.on('init', function (next) {

		var q = keystone.list('Project').model.find().where('enabled','true').sort('order');
		
		q.exec(function (err, result) {
			locals.data.projects = result;
			next(err);
		});

	});

	// Render the view
	view.render('index');
};
