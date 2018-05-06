/**
 *
 **/

const fs = require('fs')
const Showdown = require('showdown')

const dir = 'wiki'
const fileIgnoreList = ['.git', 'template.md']
let wiki_page_data_objects = []

fs.readdir(dir, {}, (err, files) => {

	files.forEach((file) => {

		if (fileIgnoreList.indexOf(file) !== -1) return

		const f = dir + '/' + file

		fs.readFile(f, 'utf8', (err, data) => {
			wiki_page_data_objects.push(parseData(data))
		})
	})
})

/**
 *
 **/
function formatHTML (markdownString) {

  let converter = new Showdown.Converter({
    noHeaderId: true
  })

  // Set flavour of markdown to Github's because the intended workflow is
  // editing case studies via Github & importing the wiki data into this app
  converter.setFlavor('github')

  // TODO: Potential XSS attack vector using Showdown, but there's no user
  // input going on at least. Have a read of:
  // https://github.com/showdownjs/showdown/wiki/Markdown's-XSS-Vulnerability-(and-how-to-mitigate-it)
  return converter.makeHtml(markdownString)
}

function parseData (data) {

//	let htmlData = formatHTML(data)



	let title = getStringFromMarkdownData(data, new RegExp('#(.*)', 'm')) // multi-line
	let blurb = getStringFromMarkdownData(data, new RegExp('##(.*)', 'm')) // multi-line
	let tags = getStringFromMarkdownData(data, new RegExp('```[\s\S]tags:(.*?)[\s\S]```')) // single-line
	let date = getStringFromMarkdownData(data, new RegExp('```[\s\S]date:(.*?)[\s\S]```')) // single-line

	console.log('title: ' + title)
	console.log('blurb: ' + blurb)
	console.log('tags: ' + tags)
	console.log('date: ' + date)

	//console.log(htmlData)
	//return htmlData;
	return data

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
function getStringFromMarkdownData (data, regexMatch) {

	console.log('===')
	console.log(data)
	console.log('---')
	console.log(regexMatch)
	let matchedStr = data.match(regexMatch)

	if (matchedStr !== null) {

		console.log('matchedStr[1]: ' + matchedStr[1])

		//
		matchedStr = matchedStr[1]

		//
		// matchedStr = matchedStr.replace(regexPrefix, '')
		// matchedStr = matchedStr.trim()

		// //
		// matchedStr = matchedStr.replace(regexSuffix, '')
		// matchedStr = matchedStr.trim()

	} else {
		//throw Error('getStringFromMarkdownData() did not find a match for ' + str + ' from supplied data.')
		matchedStr = 'No match!'
	}
	return matchedStr
}

/*
function getTitleFromData (data) {
	if (str !== null) {
		str = str[0].replace('##', '')
		str = str.trim()
	} else {
		throw Error('getTitleFromData() did not find a match from supplied data.')
	}
	return str
}

let value
function getBlurbFromData (data) {
	return value
}

function getBodyFromData (data) {
	return value
}

function getTagsFromData (data) {
	return value
}

function getDateFromData (data) {
	return value
}
*/
/*
        {
          title: '1. Lorem ipsum dolor sit amet, consectetur',
          blurb: 'Quisque orci nisi, bibendum et ex eget...',
          body: `
Quisque orci nisi, bibendum et ex eget, sodales tincidunt leo. Vivamus vitae congue tellus.
          `,
          tags: [
            {tag: 'user-experience', name: 'User Experience'}
          ],
          date: 2018,
          selected: false
        },
*/
