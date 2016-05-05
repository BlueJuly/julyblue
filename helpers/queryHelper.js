module.exports = {

	buildQuery: function (requestQuery, schema) {
		var result = {};
		var resultTag={};
		for(key in requestQuery) {
			var path = schema.paths[key];
			// if path exists
			if(path) {
				if (path.instance == 'String') {
					if (Array.isArray(requestQuery[key])) {
						result[key] = {
							$in: requestQuery[key]
						};
					} else {
						result[key] = requestQuery[key];
					}
				} else if (path.instance == 'Number') {
					// console.log(requestQuery[key], requestQuery[key][0]);
					// if contains multiple values
					if (Array.isArray(requestQuery[key])) {
						result[key] = {};
						resultTag[key] = [];
						requestQuery[key].forEach(function(value) {
							console.log(key, value);
							if (value.indexOf('>=') !== -1) {
								console.log(Number(value.substring(2, value.length)));
								result[key]['$gte'] = Number(value.substring(2, value.length));
								resultTag['eventCostMin'] = Number(value.substring(2, value.length))
							} else if (value.indexOf('>') !== -1) {
								result[key]['$gt'] = Number(value.substring(1, value.length));
								resultTag['eventCostMin']=Number(value.substring(1, value.length));
							} else if (value.indexOf('<=') !== -1) {
								result[key]['$lte'] = Number(value.substring(2, value.length));
								resultTag['eventCostMax']=Number(value.substring(2, value.length));
							} else if (value.indexOf('<') !== -1) {
								result[key]['$lt'] = Number(value.substring(1, value.length));
								resultTag['eventCostMax']=Number(value.substring(1, value.length));
							}
						}); 
					} else {
						var value = requestQuery[key];
						result[key] = {};
						if (value.indexOf('>=') !== -1) {
							result[key]['$gte'] = Number(value.substring(2, value.length));
							resultTag[key] = Number(value.substring(2, value.length))
						} else if (value.indexOf('>') !== -1) {
							result[key]['$gt'] = Number(value.substring(1, value.length));
							resultTag[key] = Number(value.substring(1, value.length));
						} else if (value.indexOf('<=') !== -1) {
							result[key]['$lte'] = Number(value.substring(2, value.length));
							resultTag[key] = Number(value.substring(2, value.length))
						} else if (value.indexOf('<') !== -1) {
							result[key]['$lt'] = Number(value.substring(1, value.length));
							resultTag[key] = Number(value.substring(1, value.length));
						} else {
							result[key] = Number(value);
							resultTag[key] = Number(value);
						}
					}
				} 
			}
		}
		return [result, resultTag];
	}

};