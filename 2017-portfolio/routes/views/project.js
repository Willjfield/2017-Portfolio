var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		project: req.params.project,
	};
	locals.data = {
		projects: [],
	};

	// Load the projects
	view.on('init', function (next) {

		var q = keystone.list('Project').model.find('enabled','true');
		console.log(q)
		q.exec(function (err, result) {
			locals.data.projects = result;
			next(err);
		});

	});

	// Render the view
	view.render('index');
};
