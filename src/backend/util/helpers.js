import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export const parseError = (err) => {
    if (err.isJoi) return err.details[0];
    return { message: err.message };
};
export const sessionizeUser = (user) => {
    return { userId: user.id, username: user.username };
};

export const sanatize = (inputs) => {
    const sanatizedInputs = [];
    for (const input of inputs) {
        sanatizedInputs.push(DOMPurify.sanitize(input));
    }
    return sanatizedInputs;
};
