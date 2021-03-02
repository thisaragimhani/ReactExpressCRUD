//controller will handle requests and response of model
const ReleaseModel = require('../models/release.model')

//get all release list
exports.getReleaseList = (req, res) => {
    //console.log('here all releases list');
    ReleaseModel.getAllReleases((err, releases) => {
        console.log("we are here");
        if (err)
            res.send(err);
        console.log('Releases', releases);
        res.send(releases);
    })
}


//get release by ID
exports.getReleaseByID = (req, res) => {
    //console.log('get emp by id'); 
    ReleaseModel.getReleaseByID(req.params.id, (err, releases) => {
        if (err)
            res.send(err);
        console.log('single Release', releases);
        res.json(releases[0]);

    })
}


//create new release
exports.createNewRelease = (req, res) => {
    //console.log("req data", req.body);
    const releaseReqData = new ReleaseModel(req.body);
    console.log('releaseReqData',releaseReqData);
    //check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        //return;
        ReleaseModel.createRelease(releaseReqData, (err, release) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'Release created successfully', data: release })

        })
    }
}


// update release
exports.updateRelease = (req, res)=>{
    const releaseReqData = new ReleaseModel(req.body);
    console.log('releaseReqData update', releaseReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        ReleaseModel.updateRelease(req.params.id, releaseReqData, (err, release)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Release updated Successfully'})
        })
    }
}

// delete release
exports.deleteRelease = (req, res)=>{
    ReleaseModel.deleteRelease(req.params.id, (err, release)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Release deleted successully!'});
    })
}