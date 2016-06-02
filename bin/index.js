#!/usr/bin/env node
/* Script to create a new jekyll post
 */
var prompt = require('cli-prompt')
var fs = require('fs')
var path = require('path')
var mkdirp  = require('mkdirp')
var opn = require('opn')
var argv = require('minimist')(process.argv.slice(2));

var jekyllpath = process.env.JEKYLLPATH

if (!jekyllpath) {

	console.error('JEKYLLPATH env var not set')
	process.exit(1)
}

var title = ''
var category = ''
var tags = []
var published = false
var folder = path.join(jekyllpath,'_posts')

prompt('Post Title:', function(val){
	title = val
	prompt('category:', function(val) {
		category = val
		prompt('tags (comma separated):', function (val) {
			tags = (val || '').split(',')
			prompt ('published? (y/n):', function (val) {
				published = val === 'y' ? true: false
				mkdirp(folder, ()=>{
					createPost(title, category, tags, published)
				})
			})
		})
	})
})




