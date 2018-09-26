const db = require("./models");

let helper = {
  variance: 5,

  //this will return an array with project attribute values
  projectQuery: function(projId,cb) {
    db.Project.findOne({
      where: {
        id: projId
      }
    }).then(result => {
      console.log(result.dataValues);
      //this creates an array of the key values of the project
      //here we remove the first 5 elements of the array
      let projArr = Object.values(result.dataValues);
      //here we remove the last 6 elements of the array, leaving just the desired proficiency in skills
      projArr.splice(0, 5);
      console.log(projArr);
      projArr.splice(8, 6);
      console.log(projArr);
      
       helper.recursiveQuery(projArr, () => {
           console.log("we make it back to the top");
           return cb(this.arryHolder);
           
       });
    });
  },

  //we pass the db object into recursive query
  //this method will compare the proj attribute array to the
  recursiveQuery: function(projArr,cb) {
    //array that will be filled with all the dev matches
    let devArr = [];
    console.log("made it here");
    db.Developer.findAll({
      where: {
        html: {
          $gt: projArr[0] - this.variance
        },
        css: {
          $gt: projArr[1] - this.variance
        },
        javascript: {
          $gt: projArr[2] - this.variance
        },
        java: {
          $gt: projArr[3] - this.variance
        },
        nodeJS: {
          $gt: projArr[4] - this.variance
        },
        angular: {
          $gt: projArr[5] - this.variance
        },
        react: {
          $gt: projArr[6] - this.variance
        },
        python: {
          $gt: projArr[7] - this.variance
        }
      }
    })
      .then(result => {
        //if the reuslt of the query is null, we vall the function again, until we get a result
        console.log("this is the result of the query" + result);
        if (result.length == 0) {
          console.log("we took the path where there is no data in the response");
          this.variance += 5;
          helper.recursiveQuery(projArr, () => {
            return cb();
          });
        } else {
          //have to implement logic here to get the devprofiles into the dev array
          result.map(x => {
            console.log(x.dataValues);
            devArr.push(x.dataValues);
          });
          console.log(devArr);
          this.resetValues();
          this.arryHolder = devArr
          return cb();
          
        }
      })
      .catch(err => {
        throw err;
      });
  },

  resetValues: function() {
    console.log("made it to reset values");
    this.variance = 5;
    return;
  },

  arryHolder: [],
};

module.exports = helper;
