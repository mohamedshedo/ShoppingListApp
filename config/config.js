let env=process.env.NODE_ENV || 'development';
console.log(env);

if(env=='development'){
    process.env.PORT=3000;
}
