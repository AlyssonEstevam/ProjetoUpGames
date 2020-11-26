const mysql = require('mysql')

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : 'localhost',
      port     : '',
      user     : 'root',
      password : '',
      database : 'todo'
    })
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error)
        else
          res.json(results)
        connection.end()
    })
}

module.exports = execSQLQuery