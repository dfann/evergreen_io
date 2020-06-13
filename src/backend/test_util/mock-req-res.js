export const mockResponse = () => {
    const res = {};
    // replace the following () => res
    // with your function stub/mock of choice
    // making sure they still return `res`
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

export const mockRequest = ({ body = null, session = null }) => {
    return {
        body,
        session,
    };
};
