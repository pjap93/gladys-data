var config = require('./config.js');
var fs = require('fs');

describe('JSON', function() {

	var arrayOfUniqueId = {};

	config.types.forEach(function(type){
		
		config.supportedLanguages.forEach(function(language){

			var file = './' + type + '/' + language + '.json';
			
			it('Should validate JSON file : ' + file, function(){

				var content = fs.readFileSync(file, 'utf8');
				var elements = JSON.parse(content);

				elements.forEach(function(item){
					if(type == 'answers'){
						item.responses.forEach(function(response){
							if(arrayOfUniqueId[response.uuid]) {
								throw new Error('ERROR : UUID ALREADY EXIST : ' + response.uuid);
							} else {
								arrayOfUniqueId[response.uuid] = true;
							}
						});
					}

					if(type == 'sentences/v2'){
						item.sentences.forEach(function(sentence){
							if(arrayOfUniqueId[sentence.uuid]) {
								throw new Error('ERROR : UUID ALREADY EXIST : ' + sentence.uuid);
							} else {
								arrayOfUniqueId[sentence.uuid] = true;
							}
						});
					}
				});
			});

		});
	});
});