
module.exports.setFlash=(req,res,next)=>{
res.locals.flash={
    'success':req.flash('success'),
    'warning':req.flash('warning')
}
//next is for jump to the next middleware if there is 
next();
}
