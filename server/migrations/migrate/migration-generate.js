var fs = require('fs');
var moment = require('moment');


//m180828_184505_run_back_up_db.php

var Site = {
    createFileMigration: function (arg) { debugger;
        var name_file = arg[2] || '';
        var file_name = 'm' + moment().format('YYMMDD_HHmms')+'_'+ name_file+'.js';

        fs.createReadStream('./model/migration-template.js').pipe(fs.createWriteStream('./../'+file_name));
    }
}


Site.createFileMigration(process.argv);
