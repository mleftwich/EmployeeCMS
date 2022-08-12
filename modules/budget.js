const { connect } = require("../db/mysql");

async function getSals() {
    const db = await connect();
  const [salaries] = await db.query("SELECT salary FROM role");
  return salaries;
}


module.exports = { getSals }