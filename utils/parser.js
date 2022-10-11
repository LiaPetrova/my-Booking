function parseError (error) {

    const result = {
        messages: [],
        fields: {}
    };

    if(error.name == 'ValidationError') {
        //mongoose
        for(let [field, e] of Object.entries(error.errors)) {
            result.fields[field] = field;
            result.messages.push(e.message);
        }
    } else if (Array.isArray(error)) {
        // express-validator
        result.fields = Object.fromEntries(error.map(e => [e.param, e.param]));
        result.messages = error.map(e => e.msg);
    } else {
        result.messages = error.message.split('\n');
        
    }

    return result;
}

module.exports = {
    parseError
}; 