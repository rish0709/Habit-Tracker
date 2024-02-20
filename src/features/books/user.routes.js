import express from "express";
const router = express.Router();
import usersController from "./user.controller.js";

const userController = new usersController();

// Create a New Book
router.get("/", (req, res) => {
  // console.log("hey");
  userController.homePage(req, res);
});

router.post("/allHabits", (req, res) => {
  // console.log("hiii");
  userController.addHabit(req, res);
})

router.get("/status/:id", (req, res) => {

  userController.habitDetails(req, res);
})

router.post("/changeStatus/:id", (req, res) => {
  // console.log("in change status route");
  userController.changeStatus(req, res);
})
// Get Book Details by ID
// router.get("/:bookId", (req, res) => {
//   booksController.getOne(req, res);
// });

// // Update Book Availability
// router.put("/:bookId", (req, res) => {
//   booksController.updateBookAvailability(req, res);
// });

// // Delete Book by ID
// router.delete("/:bookId", (req, res) => {
//   booksController.deleteBook(req, res);
// });

// // List Books by Genre
// router.get("/genre/:genre", (req, res) => {
//   booksController.listBooksByGenre(req, res);
// });

export default router;
