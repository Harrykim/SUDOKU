exports.up = async function(knex, Promise) {
  await knex.raw(`
    CREATE TABLE boards (
      id mediumint primary key not null auto_increment,
      size mediumint not null,
      difficulty varchar(55) not null default 'easy',
      createDate datetime not null default CURRENT_TIMESTAMP,
      isCompleted tinyint(1) not null default 0,
      completeDate datetime
    );
  `)
}

exports.down = async function(knex, Promise) {
  await knex.raw(`
    DROP TABLE boards;
  `)
}
