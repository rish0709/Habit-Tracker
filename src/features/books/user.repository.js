import mongoose from 'mongoose';
import { userSchema } from './user.schema.js'
import { reviewSchema } from './review.schema.js';

// creating model from schema.
const habitModel = mongoose.model('Habit', userSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);


export default class userRepository {
    
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    async addReviewToBook(bookId, text, rating) {
        const reviewData = {
            text,
            rating,
            book: new mongoose.Types.ObjectId(bookId)
        }
        const review = new reviewModel(reviewData);
        const savedReview = await review.save();

        const book = await booksModel.findById(bookId);

        book.reviews.push(savedReview._id);

        await book.save();

        return savedReview;

    }

    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }

    async updateBookAvailability(bookId, quantity) {

        console.log(bookId);
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;

        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    async addHabit(habit){
        
        const addHabit = new habitModel({habit:habit});
        const habit1 = await addHabit.save();

        

        const allHabits = await habitModel.find();
        // console.log(allHabits);
        return allHabits;
        
    }

    async changeStatus(habitId, habit){
        console.log("in change status repo");
        const dayNum = habit.split("/")[1];
        console.log("day number", dayNum);
        if (dayNum < 0){
            var dayNumber = parseInt(dayNum) + 7;
        }
        const currentStatus = habit.split("/")[0];
        
        const Habit = await habitModel.findById(habitId);
        Habit.status.set(dayNumber, currentStatus);
        
        
        const flag = await Habit.save();
        console.log("required data", flag);
        return flag;


    }

    async getHabitArray(){
        const allHabits = await habitModel.find();
        // console.log(allHabits);
        return allHabits;
    }

    async getSelectedHabitData(habitId){

        const flag = await habitModel.findById(habitId);
        // console.log(flag);
        return flag;
    }
}