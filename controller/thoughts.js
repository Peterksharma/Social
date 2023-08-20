const { Thoughts, User } = require('../models');

const getAllThoughts = (req, res) => {
    Thoughts.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

const getThoughtById = (req, res) => {
    Thoughts.findOne({ _id: req.params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

const createThought = (req, res) => {
    Thoughts.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
};

const updateThought = (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
};

const deleteThought = (req, res) => {
    Thoughts.findOneAndDelete({ _id: req.params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
};

const addReaction = (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
    )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
};

const removeReaction = (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
};

module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};
