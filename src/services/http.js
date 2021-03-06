import axios from "axios";
import {API_URL} from "../config";

const http = axios.create({baseURL: API_URL})

/**
 * @typedef Category
 * @type Object
 * @property {string} idCategory - "1"
 * @property {string} strCategory - "Beef"
 * @property {string} strCategoryDescription - "Beef is the culinary name for ..."
 * @property {string} strCategoryThumb - "https://www.themealdb.com/images/category/beef.png"
 */

/**
 * @typedef Meal
 * @type Object
 * @property {string} idMeal -
 * @property {string} strMeal - "Apam balik"
 * @property {string} strCategory - "Dessert"
 * @property {string} strMealThumb - "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg"
 * @property {string} strInstructions
 * @property {string} strArea
 * @property {string} strYoutube
 */


/**
 * Get all categories list
 * @return {Promise<Category[]>}
 */
export async function getAllCategories() {
	const endpoint = '/categories.php';

	try {
		const {status, data: {categories}} = await http.get(endpoint);

		if (status !== 200) {
			return [];
		}

		return categories;
	} catch (e) {
		console.log('Error:', e);
	}
}

/**
 * Get recipes filtered by category name
 * @param name
 * @return {Promise<Meal[]>}
 */
export async function getFilteredByCategory(name) {
	const endpoint = '/filter.php';

	try {
		const {status, data: {meals}} = await http.get(endpoint, {params: {c: name}});

		if (status !== 200) {
			return [];
		}

		return meals;
	} catch (e) {
		console.log('Error:', e);
	}
}

/**
 * Get recipes filtered by category name
 * @param id
 * @return {Promise<Meal>}
 */
export async function getMealById(id) {
	const endpoint = '/lookup.php';

	try {
		const {status, data: {meals}} = await http.get(endpoint, {params: {i: id}});

		if (status !== 200) {
			return null;
		}

		return meals[0];
	} catch (e) {
		console.log('Error:', e);
	}
}
