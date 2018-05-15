module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 7,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true,
        "modules": true
      }
    },
    "plugins": [
      "react"
    ],
    'rules': {
      "react/jsx-uses-vars": "error",
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-underscore-dangle": [2, { "allow": [ '_id' ] }],
      "jsx-a11y/no-static-element-interactions": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/label-has-for": [ 2, {
        "components": [ "Label" ],
        "required": {
          "every": [ "id" ]
        },
        "allowChildren": false
      }]
    }  
};
