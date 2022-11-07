/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userid: 'Alpha1', name: 'Hettie Marshall', email: 'lantunde@acbo.va', pwd: 'Password1'},
        {userid: 'Alpha2', name: 'Hester Owens', email: 'zo@girih.lv', pwd: 'Password2'},
        {userid: 'Alpha3', name: 'Henry Jackson', email: 'bekamohi@owo.mt', pwd: 'Password3'}
      ]);
    });
};