const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
// app.get('*',function(req,res,next){
//   if(req.headers['x-forwarded-proto']!='https')
//   	res.redirect(`https://${req.header('host')}${req.url}`)
//   else
//     next() /* Continue to other routes if we're not redirecting */
// })

app.use('/.well-known', express.static('.well-known') , function(req, res){
    // Optional 404 handler
    res.status(404);
    res.json({error:{code:404}})
});
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);