
var fs = require('fs'),
    xml2js = require('xml2js');

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + '/' + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}

function processFile(filename, content) {
    var parser = new xml2js.Parser();
    parser.parseString(content, function (err, result) {
        console.log('Archivo: ' + filename)
        console.log('- - - - - - - -')
        console.dir(result['cfdi:Comprobante']['cfdi:Impuestos'][0]['$']);
        console.log('- - - - - - - -')
        console.dir(result['cfdi:Comprobante']['cfdi:Impuestos'][0]['cfdi:Traslados']);
        console.log('- - - - - - - -')
        console.dir(result['cfdi:Comprobante']['cfdi:Impuestos'][0]['cfdi:Traslados']['cfdi:Traslado']);
        console.log('Done');
    });

}

readFiles(__dirname + '/files/facturas/emited', processFile, function (error) {
    console.log(error);
});


// var parser = new xml2js.Parser();
// fs.readFile(__dirname + 'd/foo.xml', function(err, data) {
//     parser.parseString(data, function (err, result) {
//         console.dir(result);
//         console.log('Done');
//     });
// });