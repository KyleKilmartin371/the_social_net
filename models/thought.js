const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: [1, 'Please type a reaction'],
            maxlength: [280, 'Reaction is too long!']
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const ThoughtSchema = new Schema({
    thought: {
        type: String,
        trim: true,
        required: 'Please enter a thought',
        minlength: 1,
        maxlength: [280, 'Thought is too long!']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});


const Thought = model('Thought', ReactionSchema , ThoughtSchema);

module.exports = Thought;