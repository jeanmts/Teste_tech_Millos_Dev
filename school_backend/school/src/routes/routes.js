const verifyAuthentication = require('../middleware/verifyAuthentication');
const  express = require("express");
const routes = express();
const admControllers = require("../controllers/administratorController");
const studentControllers = require("../controllers/studentController");
const authController = require("../controllers/auth") 


routes.post('/register/admin', admControllers.registerAdmin);
routes.post('/api/login', admControllers.loginAdmin);

routes.post('/api/treinamento',  verifyAuthentication, admControllers.addTraining);
routes.get('/api/treinamento',  verifyAuthentication, admControllers.getTrainings);

routes.post('/api/turma',  verifyAuthentication, admControllers.addClasses);
routes.get('/api/turma',  verifyAuthentication, admControllers.getClasses);

routes.post('/admin/Recursos',  verifyAuthentication, admControllers.addResources);
routes.get('/admin/Recursos',  verifyAuthentication, admControllers.getResources);

routes.post('/api/estudantes',  verifyAuthentication, admControllers.addStudent);

routes.post('/api/matriculas',  verifyAuthentication, admControllers.addRegistration);

routes.get('/api/estudantes', studentControllers.listTrainingAndClasses);

routes.get('/api/validate-jwt', authController.verifyAuth);


module.exports = routes;