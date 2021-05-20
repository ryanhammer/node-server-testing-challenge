
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('students')
    .truncate()
    .then(function() {
      return knex('hobbits').insert([
        { name: 'Harry Potter', house: 'Gryffindor' },
        { name: 'Ron Weasley', house: 'Gryffindor' },
        { name: 'Hermione Granger', house: 'Gryffindor' },
        { name: 'Draco Malfoy', house: 'Slytherin' },
        { name: 'Susan Bones', house: 'Hufflepuff' },
        { name: 'Luna Lovegood', house: 'Ravenclaw' }
      ]);
    });
};
