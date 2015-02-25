var inquirer = require('inquirer'),
  Flickr = require('flickrapi'),
  flickrOpts = require('./flickrOpts.json');

console.log(flickrOpts.api_key);

inquirer.prompt([{
  type: 'input',
  name: 'tags',
  message: 'choose some tags (comma seperated)',
  default: 'chicken'
}, {
  type: 'input',
  name: 'count',
  message: 'how many (<500)'
}], function(answers) {
  var searchOpts = {
    text: answers.tags,
    // tags: answers.tags,
    tag_mode: 'all',
    // licence    : '',
    sort: 'relevance', // 'interestingness-desc, interestingness-asc,'
    privacy_filter: 1, // public
    content_type: 1, // Photos only
    media: 'photos', // 'videos' / 'all'(default)
    page: 1,
    per_page: answers.count
  };
  Flickr.tokenOnly(flickrOpts, function(err, flickr) {
    flickr.photos.search(searchOpts, function(err, res) {
      res.photos.photo.forEach(function(photo) {
        console.log('\'' + answers.tags + '\'' + '\t' + makeUrl(photo));
      });
    });
  });
});



var makeUrl = function(photo) {
  var url =
    "https://farm" +
    photo.farm +
    ".staticflickr.com/" +
    photo.server +
    "/" +
    photo.id +
    "_" +
    photo.secret +
    ".jpg";
  return url;
};
