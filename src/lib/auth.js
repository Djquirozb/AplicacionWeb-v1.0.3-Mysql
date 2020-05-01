module.exports = {
    EstaLogeado(req, res, next){
        if (req.isAuthenticated()){
            return next();            
        }
        return res.redirect('/signin')        
    },

    NoEstaLogeado(req, res, next){
        if (!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};

