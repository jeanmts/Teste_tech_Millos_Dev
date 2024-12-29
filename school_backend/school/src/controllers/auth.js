const express = require('express');
const verifyAuthentication = require('../middleware/verifyAuthentication');

// router.get('/api/validate-jwt', verifyAuthentication, (req, res) => {
//   res.status(200).json({ message: 'Token válido!', user: req.user });
// });

const verifyAuth = async (req, res) => {
    return res.status(200).json({ message: 'Token válido!'})
}


module.exports = {verifyAuth};
