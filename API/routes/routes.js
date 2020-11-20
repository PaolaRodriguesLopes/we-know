var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var CourseController = require("../controllers/CourseController");
var CategoryController = require("../controllers/CategoryController");
var SubjectController = require("../controllers/SubjectController");
var ArticleController = require("../controllers/ArticleController");
var AdminAuth = require("../middleware/AdminAuth");
var MediumAuth = require("../middleware/MediumAuth");
var LoginAuth = require("../middleware/LoginAuth");
const { remove } = require("../controllers/UserController");

//User routes
router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user/email', UserController.findUserByEmail);
router.get("/user", LoginAuth, UserController.index);
router.get("/user/:id", LoginAuth, UserController.findUser);
router.put("/user", LoginAuth, UserController.edit);
router.delete("/user/:id", AdminAuth, UserController.remove);

// Login and chenge password routes
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);
router.post("/validate",AdminAuth,HomeController.validate);
router.post("/validateLogin",LoginAuth,HomeController.validate);

// Course routes
router.post('/course',AdminAuth,CourseController.create);
router.get("/course",CourseController.getCourses);
router.get("/course/:id",AdminAuth,CourseController.getCourseByID);
router.put("/course",AdminAuth,CourseController.edit);
router.delete("/course/:id",AdminAuth,CourseController.remove);

// Category routes
router.post('/category', AdminAuth, CategoryController.create);
router.get("/category", LoginAuth, CategoryController.getCategories);
router.get("/category/:id", AdminAuth, CategoryController.getCategoryByID);
router.put("/category", AdminAuth, CategoryController.edit);
router.delete("/category/:id", AdminAuth, CategoryController.remove);

// Subject routes
router.post('/subject', AdminAuth, SubjectController.create);
router.get("/subject", SubjectController.getSubjects);
router.get("/subject/:id", AdminAuth, SubjectController.getSubjectByID);
router.put("/subject", AdminAuth, SubjectController.edit);
router.delete("/subject/:id", AdminAuth, SubjectController.remove);

// Article routes
router.post('/article', LoginAuth, ArticleController.create);
router.get("/article", ArticleController.getArticles);
router.get("/article/custom", ArticleController.findByValueAndCriteria);
router.get("/article/author-status", ArticleController.findByAuthorWhereStatusIs);
router.get("/article/:id", ArticleController.getArticleByID);
router.get("/article/author/:id", ArticleController.findByAuthor);
router.put("/article", LoginAuth, ArticleController.edit);
router.delete("/article/:id", LoginAuth, ArticleController.remove);
router.put("/article/status", MediumAuth, ArticleController.editStatus);
router.put("/article/comments", MediumAuth, ArticleController.editComments);
router.put("/article/approved_by", MediumAuth, ArticleController.editApprovedBy);

module.exports = router;