var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');

var apiKey = 'ts=1&hash=21bd2e1b96821f4b508e0dd04ba254bd&apikey=809f574f31a7e23a17adc1f6a3631a58';
var url = 'http://gateway.marvel.com/v1/public/characters?' + apiKey;

$.ajax(url).then(start);

function start(ajaxResult){
  console.log('My network request is now done!');
  console.log(ajaxResult.data.results);
  var characters = ajaxResult['data']['results'];
  displayCharacter(characters);
}

function displayCharacter(characterList){
  /* Render Template */
  _.each(characterList, function(character){
    var source = $('#character-template').html();
    var template = handlebars.compile(source);
    var $characterHtml = $(template(character));

    $characterHtml.find('.js-display-comics').on('click', function(){
      fetchComics(character);
    });

    $('.characters').append($characterHtml);
  });

}

function fetchComics(character){
  //console.log(character);
  $.ajax(character.resourceURI + '?' + apiKey).then(displayComics);
}

function displayComics(data){
    console.log(data);
}
