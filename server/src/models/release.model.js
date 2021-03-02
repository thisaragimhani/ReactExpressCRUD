//model is used for handling the database

var dbConn = require('../../config/db.config');

var Release = function(release) {
    this.release_name = release.release_name;
    this.release_status = release.release_status;
    this.release_version = release.release_version;
    this.release_client = release.release_client;
  //  this.status = release.status ? release.status : 1;
    //this.created_at = new Date();
    //this.updated_at = new Date(); 
}

//get all the releases
Release.getAllReleases = (result) => {
    dbConn.query('SELECT * FROM releases',(err, res)=>{
        if(err){
            console.log("Error while fetching releases",err);
            result(null,err);
        }else{
            console.log("Releases fetched successfully");
            result(null,res);
        }
    })
}

//get release by ID
Release.getReleaseByID = (id, result) => {
    dbConn.query('SELECT * FROM releases WHERE release_id=?', id,(err, res)=>{
        if(err){
            console.log("Error while fetching releases by ID",err);
            result(null,err);
        }else{
            console.log("Releases BY ID fetched successfully");
            result(null,res);
        }
    })
}

//create new release
Release.createRelease = (releaseReqData, result) =>{
dbConn.query('INSERT INTO releases SET ? ',releaseReqData,(err, res)=>{
    if(err){
        console.log('Error while inserting data');
        result(null, err)
    }else{
        console.log('Release created successfully');
        result(null, res)
    }
})
}

// update release
Release.updateRelease = (id, releaseReqData, result)=>{
    dbConn.query("UPDATE releases SET release_name=?,release_version=?,release_status=?,release_client=? WHERE release_id = ?", [releaseReqData.release_name,releaseReqData.release_version,releaseReqData.release_status,releaseReqData.release_status, id], (err, res)=>{
        if(err){
            console.log('Error while updating the release');
            result(null, err);
        }else{
            console.log("Release updated successfully");
            result(null, res);
        }
    });
}


// delete release
Release.deleteRelease = (id, result)=>{
    dbConn.query('DELETE FROM releases WHERE release_id=?', [id], (err, res)=>{
         if(err){
             console.log('Error while deleting the release');
             result(null, err);
         }else{
             result(null, res);
         }
     })
    // //dbConn.query("UPDATE releases SET is_deleted=? WHERE release_id = ?", [1, id], (err, res)=>{
    //      if(err){
    //          console.log('Error while deleting the release');
    //          result(null, err);
    //      }else{
    //          console.log("Release deleted successfully");
    //          result(null, res);
    //      }
    //  });
}

module.exports= Release;