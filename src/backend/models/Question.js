import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const QuestionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            validate: {
                validator: (title) => Question.doesNotExist({ title }),
                message: 'Question with that title already exists',
            },
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        url: {
            type: String,
        },
        isMarkdownDescription: {
            type: Boolean,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isMarkdownSolution: {
            type: Boolean,
            required: true,
        },
        solution: {
            type: String,
        },
        isMarkdownNotes: {
            type: Boolean,
            required: true,
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

/*
Because of lexical scoping, we cannot use arrow functions for these three methods.
*/

QuestionSchema.statics.doesNotExist = async function (field) {
    return (await this.where(field).countDocuments()) === 0;
};

const Question = mongoose.model('Question', QuestionSchema);
export default Question;
