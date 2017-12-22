var Email = require('./emailSchema');

exports.postEmail = function (req, res) {
    console.log(req);
    var id = req.body._id || req.body.content._id;
    if (id) {
        Email.findByIdAndUpdate(
            id,
            req.body, {
                new: true,
                runValidators: true
            },
            function (err, email) {
                email.userId = req.user._id;
                email.save(function (err, b) {
                    if (err) {
                        res.status(400).send(err);
                        return;
                    }
                    res.status(201).json(b);
                });
            });
    } else {
        var email = new Email();
        email.content = req.body.content;
        email.userId = req.user._id;
        email.save(function (err, b) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(201).json(b);
        });
    }
};

exports.getEmails = function (req, res) {
    Email.find({
        userId: req.user._id
    })
        .exec(function (err, emails) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.json(emails);
        });
};

exports.getEmail = function (req, res) {
    Email.findById(req.params.emailId)
        .exec(function (err, email) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.json(email);
        });
};

exports.deleteEmail = function (req, res) {
    Email.findByIdAndRemove(req.params.emailId)
        .then(function (email) {
            res.json(email);
        }).catch(function (err) {
        console.log(err);
    });
};