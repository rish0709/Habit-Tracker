import userRepository from "./user.repository.js";


export default class BookController {
  constructor() {
    this.userRepository = new userRepository();
  }

  createBook = async (req, res) => {
    const { title, author, genre, copies, availableCopies, reviews } = req.body;
    try {
      const bookData = {
        title,
        author,
        genre,
        copies,
        availableCopies,
        reviews,
      };

      const savedBook = await this.bookRepository.createBook(bookData);
      res.status(201).json(savedBook);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create a new book" });
    }
  };

  addReviewToBook = async (req, res) => {

    const { bookId } = req.params;
    const { text, rating } = req.body;

    try {
      const book = await this.bookRepository.getOne(bookId);
      if (!book) {
        res.status(404).send("book  not found.");
      } else {
        const review = await this.bookRepository.addReviewToBook(bookId, text, rating);
        res.status(200).json(review);
      }


    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Falied to add review" });
    }


  }

  getOne = async (req, res) => {
    const { bookId } = req.params;
    console.log(bookId);

    try {
      const book = await this.bookRepository.getOne(bookId);
      if (!book) {
        res.status(404).send("book  not found.");
      } else {
        res.status(200).send(book);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to find book" });
    }
  };

  listBooksByGenre = async (req, res) => {
    const { genre } = req.params;

    try {
      const book = await this.bookRepository.listBooksByGenre(genre);
      if (!book) {
        res.status(404).send("book not found!!");
      } else {
        res.status(200).send(book);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Can't filter by Genre" });
    }
  };

  updateBookAvailability = async (req, res) => {
    const { bookId } = req.params;
    const { quantity } = req.body;
    // console.log(bookId + " " + quantity);
    try {
      const updatedBook = await this.bookRepository.updateBookAvailability(
        bookId,
        quantity
      );
      if (!updatedBook) {
        res.status(404).json("book not found!!");
      } else {
        res.status(200).json(updatedBook);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Could not update quantity" });
    }
  };

  deleteBook = async (req, res) => {
    const { bookId } = req.params;

    try {
      const deletedBook = await this.bookRepository.deleteBookById(bookId);
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete book" });
    }
  };

  homePage = async(req, res) => {
    res.render("home");
  }

  addHabit = async(req, res) => {
    // const {habit} = req.body;
    // console.log(req.body);
    try {
      const habit = await this.userRepository.addHabit(req.body.habit);
      if (!habit) {
        return res.status(404).json({ message: "habit not added" });
      }
      res.render("allHabits", { habitArray:habit });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add a habit" });
    }
  };
  habitDetails = async(req, res) => {
    // const {habit} = req.body;
    // console.log(req.body);
    // const habitArray = await this.userRepository.getHabitArray();
    const habitId = req.params.id;
    const habit =  await this.userRepository.getSelectedHabitData(habitId);
   res.render("habitDetails", {specificHabit: habit});
  };

  changeStatus = async(req, res) => {
    const habitId = req.params.id;
    console.log(req.body);
    console.log("in change status controller");
    
    
    const habit = await this.userRepository.changeStatus(habitId, req.body.Button);
    console.log("habit", habit);
    res.render("habitDetails", {specificHabit: habit, buttonValue: req.body.Button});
    
    
  }
    
    
  }

