const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {addCategory, getCategory, deleteCategory, editCategory} = require("../controllers/category");

const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/add-category', addCategory)
    .get('/get-category', getCategory)
    .delete('/delete-category/:id', deleteCategory)
    .put('/edit-category/:id', editCategory);

module.exports = router;