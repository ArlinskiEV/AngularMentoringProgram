const express = require('express');
const router = express.Router();
const url = require('url');
// emulate remove
const filterArr = {};
module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;
		console.log(sort);
		console.log(queryStr);
		if (courses.length < to) {
			to = courses.length;
		}
    courses = courses.filter( item => !filterArr[item.id])
      .slice(from, to);
		
		res.json(courses);
  });
  
  router.delete('/courses', (req, res, next) => {
    let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
      id = query.id;
    filterArr[id] = true;

		res.json(`item with id=${id} was delete`);
  });
	
	return router;
};
