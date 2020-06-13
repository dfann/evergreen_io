export const parseError = (err) => {
    if (err.isJoi) return err.details[0];
    return { message: err.message };
};
export const sessionizeUser = (user) => {
    return { userId: user.id, username: user.username };
};
