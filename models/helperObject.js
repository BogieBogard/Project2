
let helper = {
    variance = 5,


    //this will return an array with project attribute values
    projectQuery = function(projId, db){
        db.Project.findOne({
            where: {
                id: projId
            }
        }).then(result => {
            //this creates an array of the key values of the project
            //here we remove the first 5 elements of the array
            let projArr = result.dataValues.values.splice(0,5);
            //here we remove the last 6 elements of the array, leaving just the desired proficiency in skills
            projArr.splice(8,6);

            return projArr;
            
        });

    },

    //we pass the db object into recursive query
    //this method will compare the proj attribute array to the 
    recursiveQuery = function(projArr, db) {
        //array that will be filled with all the dev matches
        let devArr = [];
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
                },
            }
        }).then(result => {
            //if the reuslt of the query is null, we vall the function again, until we get a result
        if(!result) {
            this.variance += 5
            this.recursiveQuery(projArr, db);
        } else {
            //have to implement logic here to get the devprofiles into the dev array
            result.map(x => {
                console.log(x.dataValues);
                devArr.push(x.dataValues);
            });
            console.log(devArr);
  
            return devArr;
        }

        });
        
        
    },

    resetValues = function(){
        this.variance = 5;
    }
}









module.exports = helper