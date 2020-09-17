var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var CourseController = require("../controllers/CourseController");
var CategoryController = require("../controllers/CategoryController");
var AdminAuth = require("../middleware/AdminAuth");
const { remove } = require("../controllers/UserController");

//User routes
router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user",AdminAuth,UserController.index);
router.get("/user/:id",AdminAuth,UserController.findUser);
router.put("/user",AdminAuth,UserController.edit);
router.delete("/user/:id",AdminAuth,UserController.remove);

// Login and chenge password routes
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);
router.post("/validate",AdminAuth,HomeController.validate);

// Course routes
router.post('/course',AdminAuth,CourseController.create);
router.get("/course",AdminAuth,CourseController.getCourses);
router.get("/course/:id",AdminAuth,CourseController.getCourseByID);
router.put("/course",AdminAuth,CourseController.edit);
router.delete("/course/:id",AdminAuth,CourseController.remove);

// Category routes
router.post('/category',AdminAuth,CategoryController.create);
router.get("/category",AdminAuth,CategoryController.getCategories);
router.get("/category/:id",AdminAuth,CategoryController.getCategoryByID);
router.put("/category",AdminAuth,CategoryController.edit);
router.delete("/category/:id",AdminAuth,CategoryController.remove);


module.exports = router;