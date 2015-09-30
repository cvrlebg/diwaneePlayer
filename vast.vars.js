var ox_vars = {
    vars: null,
    ox: null,
    init: function() {
        if(typeof ox !== 'undefined') {
            vars = ox.oxVar;
        }
    },

    setVars: function() {
        var queryStr = '';
        if(typeof vars !== 'undefined') {
            for (i = 0; i < vars.length; i++) {
                queryStr += '&' + vars[i][0] + '=' + vars[i][1];
            }
        }
        return Base64.encode(queryStr).replace('/', ',');
    }
}