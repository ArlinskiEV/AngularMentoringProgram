const express = require('express');
const router = express.Router();
const url = require('url');

// emulate: {[id]: {type: string, item: course}}
const edit = {};
const types = [];
  // types[0] = "ADD";
  types[1] = "DELETE";
  types[2] = "EDIT";
const ADD = [];

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
    
    courses = [...ADD, ...courses];

    courses = courses.map( item => {
      current = item;
      if (!edit[item.id]) {
        return current;
      } else {
        switch (edit[item.id].type) {
          case types[1]: {
            return null
            break;
          }
          case types[2]: {
            return {...item, ...edit[item.id].item};
            break;
          }
        }
      }
    })
    .filter(item => item);

    if (courses.length < to) {
			to = courses.length;
    }

    if (idToSearch) {
      courses = courses.filter( item => item.id === +idToSearch)
    } else {
      courses = courses.slice(from, to);
    }

    console.log(`emulate=${Object.keys(edit)}`);
    console.log(`time:${new Date()}`);

		res.json(courses);
  });

  router.post('/courses', (req, res, next) => {
    let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
      idToEdit = query.id;

    edit[idToEdit] = {type: types[2], item: req.body};

    res.json(`item with id=${idToEdit} was edit`);
  });

  router.put('/courses', (req, res, next) => {
    let obj = req.body;
    obj.id = [...ADD, ...server.db.getState().courses]
      .map(item => item.id)
      .sort()
      .pop()
      + 1;
    obj.isTopRated = false;
    obj.date = new Date().toJSON();

    if (obj.name && obj.description && obj.authors && obj.authors.length) {
      ADD.push(obj);
      res.json(`item with id=${obj.id} was edit`);
    } else {
      res.status(400).send("Wrong data");
    }
  });

  router.get('/courses/authors', (req, res, next) => {
    console.log(`Auth:${req.header('Authorization')}`);
    let courses = server.db.getState().courses,
      authors = courses
        .map((item) => item.authors) // [[author, author], [author], ...]
        // [author, author, ...]
        .reduce((prev, authorsArr) => [...prev, ...authorsArr], [])
        
        .reduce((prev, item) => prev.every((author) => author.id !== item.id)
            ? [...prev, item]
            : prev, []
          ,
          []
        )
    ;

    res.json(authors);
  });
  
  router.delete('/courses', (req, res, next) => {
    console.log(`Auth:${req.header('Authorization')}`)
    let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
      id = query.id;

    edit[id] = {type: types[1]};

		res.json(`item with id=${id} was delete`);
  });
	
	return router;
};
