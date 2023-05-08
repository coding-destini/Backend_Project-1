const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailers');

//Now every worker has a process function => process fun() tells the worker that whenever a new task added into
// the queue you need to run the code inside this process function
queue.process('emails',function(job,done){//=> job is the job which will it do
console.log('emails worker is processing  a job ',job.data);
commentsMailer.newComment(job.data);
done();
}) 

//Above => this worked should be call from comments_controller=> where we are calling a function => commentsMailer.newComment(comment);
//so now we comment that code from there , and call this code => ( queue.create('emails',comment).save)......