var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Project Model
 * ==========
 */

var Project = new keystone.List('Project', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

var MediaStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads'),
    publicPath: '/public/uploads',
  },
});

Project.add({
	title: { type: String, required: true },
	enabled: { type: Boolean},
	order: { type: Types.Number},
	image: { type: Types.File, storage: MediaStorage},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
	},
});

Project.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Project.defaultColumns = 'title';
Project.register();
