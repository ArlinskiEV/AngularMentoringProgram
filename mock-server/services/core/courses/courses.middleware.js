const express = require('express');
const router = express.Router();
const url = require('url');
// emulate remove
const filterArr = {};
module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
    console.log(`Auth:${req.header('Authorization')}`)
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
      queryStr = query.query,
      idToSearch = query.id,
			courses = server.db.getState().courses;
		console.log(sort);
		console.log(queryStr);
		if (courses.length < to) {
			to = courses.length;
		}
    courses = courses.filter( item => !filterArr[item.id]);
    if (idToSearch) {
      courses = courses.filter( item => item.id === +idToSearch)
    } else {
      courses = courses.slice(from, to);
    }
    console.log(`filter=${Object.keys(filterArr)}`);
    console.log(`time:${new Date()}`);

		res.json(courses);
  });
  
  router.delete('/courses', (req, res, next) => {
    console.log(`Auth:${req.header('Authorization')}`)
    let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
      id = query.id;
    filterArr[id] = true;

		res.json(`item with id=${id} was delete`);
  });
	
	return router;
};
