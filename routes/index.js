const apiRoutes = require('./authRoutes');
const dataRoutes = require('./dataRoutes');
const paypalRoutes = require('./paypalroutes')

const constructorMethod = (app) => {
	
	app.use('/auth', apiRoutes); 

	app.use('/data',dataRoutes);
	
	app.use('/pal',paypalRoutes);
	
	app.use('*', (req, res) => {

		res.status(404).json({ Welcome: 'Hello World this is the API for Ecom store'});

	});
};

module.exports = constructorMethod;