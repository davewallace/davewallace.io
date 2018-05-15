/**
 *
 **/

const fs = require('fs')
const replace = require('replace-in-file')
const dir = 'wiki/'
const fileIgnoreList = ['.git', 'template.md']

// Iterate all .md files in the wiki repo and format the markdown data into an
// Array of Objects to be imported into the main app.
let wiki_page_data_objects = []

function readContent (callback) {

	fs.readdir(dir, {}, (err, files) => {

		let inc = 0

		files.forEach((file) => {

			if (fileIgnoreList.indexOf(file) !== -1) return

			const f = dir + file

			fs.readFile(f, 'utf8', (err, data) => {
				wiki_page_data_objects.push(parseData(data))

				inc++
				if (inc === files.length-1) callback()
			})
		})
	})
}

readContent((err, content) => {
  // Perform fs write operation into importable data module for main app
  console.log('wiki_page_data_objects: ' + wiki_page_data_objects)

	const options = {
	  files: 'data/grid-data.js',
	  from: 'const imported = []',
	  to: 'const imported = ' + wiki_page_data_objects,
	}
	replace(options)
	  .then(changedFiles => {
	    console.log('Modified files:', changedFiles.join(', '));
	  })
	  .catch(error => {
	    console.error('Error occurred:', error);
	  });
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
			tag: item
		})
	})

	// The reduced data from above is the remaining body data
	let body = result[1]

	// console.log('title: ' + title)
	// console.log('blurb: ' + blurb)
	// console.log('tags: ' + tags)
	// console.log('date: ' + date)
	// console.log('body: ' + body)

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
