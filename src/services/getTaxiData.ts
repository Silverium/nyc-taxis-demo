let url = new URL(`https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json`)

"GET https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?q=SELECT%20*%20FROM%20your_pipe_name%20LIMIT%2010%20OFFSET%2010"

export const getTaxiData = async (page = 0, itemsPerPage = 100) => {
  console.log(`%c{page, itemsPerPage}`, 'background-color: lime;', { page, itemsPerPage });
  try {
    const result = await fetch(`${url}?q=SELECT ROW_NUMBER() OVER (ORDER BY tpep_pickup_datetime) AS id, * FROM _ LIMIT ${itemsPerPage} OFFSET ${itemsPerPage * page}`, {
      headers: {
        Authorization: 'Bearer p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c'
      },

    })
      .then(r => r.json())


    // console.log(result)
    // console.log("** Query columns **")
    // for (let column of result.meta) {
    //   console.log(`${column.name} -> ${column.type}`)

    // }
    return result;
  } catch (err) {
    console.error(err);
    return { data: [] };
  }
};

export default getTaxiData;