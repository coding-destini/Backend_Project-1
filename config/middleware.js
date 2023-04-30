
module.exports.setFlash=(req,res,next)=>{
res.locals.flash={
    'success':req.flash('success'),
    'error':req.flash('error')
}
//next is for jump to the next middleware if there is 
next();
}
