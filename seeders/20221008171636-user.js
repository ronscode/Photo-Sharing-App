"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					username: "ann",
					password: "$2b$10$t2nAg7goa8ci3kvLb8tFiO20myOl4Da7jXc8ZwyK1q89MElM6bx6G",
					firstName: "Annie",
					lastName: "Easley",
					email: "ajeasley@nasa.gov",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},
	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
