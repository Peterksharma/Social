const { User } = require('../models');

const getAllUsers = (req, res) => {
    User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
};

const getUserById = (req, res) => {
    User.findOne({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err);
        })
};

const createUser = (req, res) => {
    User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
};

const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.error(err)
            res.status(400).json(err);
        })
    // Logic to update a user
};

const deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.error(err)
            res.status(400).json(err);
        })

};

const addFriend = (req, res) => {
    User.findByIdAndUpdate(
        req.params.userId,
        { $push: {friends: req.params.friendId}},
        {new: true, runValidators: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID' })
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err);
    })
}

const removeFriend = (req, res) => {
    User.findByIdAndDelete(
        req.params.userId,
        { $pull: {friends: req.params.friendId}},
        {new: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID' })
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err);
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};
