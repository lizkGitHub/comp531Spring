// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        return fetch(url)
        .then(r => r.json())
        // count the number of words in every article
        .then(r => {
            var map = {}
            var articles = r.articles
            for (var i in articles){
                var length = articles[i].text.split(" ").length

                map[articles[i]._id] = length      
            }
            return map;
        })
    }

    function countWordsSafe(url) {
        return countWords(url).catch(function(error){
            // return a empty map in the case of errors
            var map = {}
            return map
        })
    }

    function getLargest(url) {
        return countWords(url)
                .then(r => findLargest(r))
    }

    // find the key of the largest value in map
    function findLargest(map) {
        var maxId
        var maxValue = 0
        for(var i in map) {
            if (map[i] > maxValue) {
                maxValue = map[i]
                // console.log(typeof(i))
                maxId = i
            }
        }
        return maxId
    }

    exports.inclass = {
        author: "Zhaokang Li",
        countWords, countWordsSafe, getLargest
    }

})(this);