/**
 *
 **/

const fs = require('fs')
const replace = require('replace-in-file')
const chalk = require('chalk');

const log = console.log
const dir = 'wiki/'
const fileIgnoreList = ['.git', '.gitignore', '.DS_Store', 'Template.md', 'Home.md']

// Iterate all .md files in the wiki repo and format the markdown data into an
// Array of Objects to be imported into the main app.
let wiki_page_data_objects = []

function readContent (callback) {

	log(chalk.green('-----------'))
	log(chalk.bold.white('>>>') + ' Starting harvest...\n')

	fs.readdir(dir, {}, (err, files) => {

		log('There are ' + chalk.bold.blue(files.length + ' unfiltered files') + ' to process.')

		// Remove intentionally excluded entries, leaving only desired markdown files
		files = files.filter(function(item) {
		  return fileIgnoreList.indexOf(item) === -1;
		});

		log('There are ' + chalk.bold.cyan(files.length + ' filtered files') + ' to process.\n')

		// Parse markdown data from each file into an Object representation
		files.forEach((file) => {

			const f = dir + file
			log(chalk.bold.white(' >>') + ' Importing... ')

			fs.readFile(f, 'utf8', (err, data) => {

				if (err) {
					throw Error(err)
				}

				log(chalk.bold.yellow('  >') + ' Parsing ' + chalk.bold.cyan(f) + '...')

				wiki_page_data_objects.push(parseData(data))

				if (wiki_page_data_objects.length === files.length) {

					log(chalk.bold.yellow('  >') + ' Last data parsed.')
					log(chalk.bold.yellow('  >') + ' Completing...')
					callback()
				} else {
					log(chalk.bold.yellow('  >') + ' Data parsed.')
				}

			})
		})
	})
}

readContent((err, content) => {

	const src = './src/data/grid-data.js'

	log(chalk.bold.green('    ...completed reading and parsing file content.\n'))
	log(chalk.bold.white('>>') + ' Replacing contents of ' + chalk.bold.blue(src) + ' with ' + chalk.bold.cyan(wiki_page_data_objects.length + ' Object' + ((wiki_page_data_objects.length === 1) ? '' : 's')) + '...')

  // Perform fs write operation into importable data module for main app
	const options = {
	  files: src,
	  from: /const imported = (.*)/gm,
	  to: 'const imported = ' + JSON.stringify(wiki_page_data_objects),
	}
	replace(options)
	  .then(changedFiles => {
	  	if (changedFiles.length) {
		    log(chalk.bold.yellow('  >') + ' Modified file:', chalk.bold.green(changedFiles.join(', ')));
		  } else {
		    log(chalk.bold.yellow('  >') + ' No files modified.');
		  }
		  log('\n' + chalk.bold.white('>>>') + ' Harvest complete!')
		  log(chalk.green('-------------------'))
	  })
	  .catch(error => {
		  log(chalk.green('-------------------'))
	    console.error(chalk.bold.red('  > Error occurred: '), error);
		  log(chalk.bold.white('\n>>> Harvest incomplete!'))
		  log(chalk.green('-------------------'))
	  })
})

/**
 *
 **/
function parseData (data) {

	let result

	// String data is assembled from a cascading reduction of initial input data
	result = extractStringAndReduceData(data, /#(.*)/m)
	let title = result[0]
	result = extractStringAndReduceData(result[1], /##(.*)/m)
	let blurb = result[0]
	result = extractStringAndReduceData(result[1], /```[\r\n]+date:(.*)[\r\n]+```/)
	let date = result[0]

	// Tags assembled into an Array of Objects with each tag's data
	result = extractStringAndReduceData(result[1], /```[\r\n]+tags:(.*)[\r\n]+```/)
	let tagData = result[0]
	let tags = []
	tagData = tagData.split(',')
	tagData.forEach((item) => {
		tags.push({
			tag: item.toLowerCase().split(' ').join('-'),
			name: item
		})
	})

	// The reduced data from above is the remaining body data
	let body = result[1]

	// log('title: ' + title)
	// log('blurb: ' + blurb)
	// log('tags: ' + tags)
	// log('date: ' + date)
	// log('body: ' + body)

	return {
		title: title,
		blurb: blurb,
		body: body,
		tags: tags,
		date: date
	}
}

/**
 *
 **/
function extractStringAndReduceData (data, regexMatch) {

	let reducedData
	let matchedStr = data.match(regexMatch)

	if (matchedStr !== null) {

		// Remove the matched String from data, data will be returned in reduced
		// form for further processing and reduction
		reducedData = data.replace(matchedStr[0], '').trim()

		// Set the String as the RegExp capture result and trim whitespace
		matchedStr = matchedStr[1].trim()

	} else {
		throw Error('extractStringAndReduceData() did not find a match within supplied data using RegExp ' + regexMatch + '.')
	}
	return [matchedStr, reducedData]
}
