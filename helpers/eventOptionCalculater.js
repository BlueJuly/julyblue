module.exports = {

	optionCalculate: function (doc) {
		     var t1= doc.eventTime;
		     var t2= doc.eventAddress;
		     var t3 = [];
		      for (var i = 0; i < t1.length; i++) {
		          for (var j = 0; j < t2.length; j++) {
		              var tempOption = {
		                  option1: t1[i].option,
		                  option2: t2[j].option,
		                  uid: []
		              }
		              for (var x = 0; x < t1[i].userId.length; x++) {
		                  for (var y = 0; y < t2[j].userId.length; y++) {
		                   console.log(t1[i].userId[x]+"******"+t2[j].userId[y]);
		                      if (t1[i].userId[x].equals(t2[j].userId[y]) ){
		                          tempOption.uid.push(t1[i].userId[x]);
		                      }
		                  }
		              }

		              t3.push(tempOption);
		          }
		      }

		    t3.sort(function(a, b) {
		     return a.uid.length < b.uid.length
		    })

		    if (t3.length!=0) {
		      return t3[0];
		    }
	}

}