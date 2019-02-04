exports.up = async function(knex, Promise) {
  await knex.raw(`
    CREATE TABLE cells (
      id mediumint primary key not null auto_increment,
      boardId mediumint not null,
      foreign key (boardId) references boards (id),
      xCoord mediumint not null,
      yCoord mediumint not null,
      sectionIndex mediumint not null,
      value mediumint,
      isDefault tinyint(1) not null default 0,

      unique key boardId_row_column (boardId, xCoord, yCoord)
    );
  `)

}

exports.down = async function(knex, Promise) {
  await knex.raw(`
    DROP TABLE cells;
  `)
}
