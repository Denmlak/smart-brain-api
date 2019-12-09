const Clarifai = require ('clarifai');
const app = new Clarifai.App({
 apiKey: '56b8733541924253973297fe974a9452'
});

const handleApiCall= (req,res) =>{
	app.models
  	.predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input)
    .then(data=> {
    	res.json(data);
    })
    .catch(err=>res.status(400).json('unable to work with API'))
}


const imagePut=(req, res,db) =>{
	const {id}=req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(404).json('entries not found'));
};

module.exports={imagePut, handleApiCall};